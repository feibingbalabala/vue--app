<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-fontent">
        <div class="image-header">
          <img :src='food.image' alt="">
          <div class="back" @click="hide">
            <i class="icon-left"><</i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>  	
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartconcontrol-wrapper">
            <cartconcontrol :food="food"></cartconcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect @content-toggle="contentToggle" @ratingtype-select="ratingtypeSlect" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in food.ratings" class="rating-item" :key="index">
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="avatar" :src="rating.avatar" alt="" width="12" height="12">
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartconcontrol from '../cartconcontrol/cartconcontrol'
  import Vue from 'vue'
  import split from '../split/split'
  import ratingSelect from '../ratingselect/ratingselect'
  // 这里使用{}是因为formatDate是一export进来的，不是export defalt，可以称为模块话的开发方法
  import {formatDate} from '../../common/js/date'
  // const POSITIIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      ratingtypeSlect (type) {
        this.selectType = type
        // DOM如果有更新需要做异步回调$nextTick
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      contentToggle (onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartconcontrol,
      split,
      ratingSelect
    }
  }
</script>
<style>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }
  .food.move-enter, .food.move-leave-to {
    transform: translate3d(100%,0,0);
  }
  .food .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .food .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .food .back {
    position: absolute;
    top: 10px;
    left: 0;
  }
  .food .back .icon-left {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
    font-style: normal;
  }
  .food .content {
    position: relative;
    padding: 18px;
  }
  .food .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rga(7,17,27);
  }
  .food .content .detail {
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0;
    height: 10px;
  }
  .food .content .detail .sell-count {
    font-size: 10px;
    color: rgb(147, 153, 19);
    margin-right: 12px;
  }
  .food .content .detail .rating {
    font-size: 10px;
    color: rgb(147, 153, 19);
  }
  .food .content .price {
    font-weight: 700;
    line-height: 24px;
    font-size: 0;
  }
  .food .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .food .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food .cartconcontrol-wrapper {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .food .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    color: #fff;
    border-radius: 12px;
    background-color: rgb(0, 160, 220);
    transition: all 0.5s;
    opacity: 1;
  }
  .food .fade-enter {
    opacity: 0;
  }
  .food .fade-leave-to {
    opacity: 0;
  }
  .food .info {
    padding: 18px;
  }
  .food .info .title {
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .food .info .text {
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }
  .food .rating {
    padding-top: 18px;
  }
  .food .rating .title {
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .food .rating .rating-wrapper {
    padding: 0 18px;
  }
  .food .rating .rating-wrapper .rating-item {
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .food .rating .rating-wrapper .rating-item .user {
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
  }
  .food .rating .rating-wrapper .rating-item .user .name {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .food .rating .rating-wrapper .rating-item .user .avatar {
    border-radius: 50%;
  }
  .food .rating .rating-wrapper .rating-item .time {
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .food .rating .rating-wrapper .rating-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .food .rating .rating-wrapper .rating-item .text .icon-thumb_up {
    display: inline-block;
    line-height: 24px;
    margin-right: 4px;
    width: 12px;
    height: 12px;
    background-color: rgb(0,160,220);
  }
  .food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
    display: inline-block;
    line-height: 12px;
    margin-right: 4px;
    width: 12px;
    height: 12px;
    background-color: rgb(147,153,159);
  }
  .food .rating .rating-wrapper .no-rating {
    padding: 16px;
    font-size: 12px;
    color: rgb(147,153,159);
  }
</style>
