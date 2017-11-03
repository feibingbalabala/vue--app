<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size='36' :score='seller.score'></star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
            <!-- 若是遇到数组下标需要提前定义index -->
          <li class="supports-item" v-for="(item,index) in seller.supports" :key="item.index">
            <span class="de-icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家文案</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img width="120" height="90" :src="pic" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div> 
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import {saveToLocal, loadFromLocal} from '../../common/js/store'
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created () {
      // created在生命周期中是不能确定DOM组件已经渲染完毕了。
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    watch: {
      // 初始化的地执行,比如url强制刷新，那时会获取数据，所以seller这个参数会改变
      seller () {
        this.$nextTick(() => {
          this._initScroll()
          this._initPicScroll()
        })
      }
    },
    mounted () {
      // 页面路由跳转的执行的函数，dom渲染开始
      this.$nextTick(() => {
        this._initScroll()
        this._initPicScroll()
      })
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      },
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPicScroll () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          // if (this.picScroll) {
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
          // } else {
            // this.picScroll.refresh()
          // }
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>
<style>
  .seller {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .seller .overview {
    padding: 18px;
    position: relative;
  }
  .seller .overview .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7,17,27);
    font-size: 14px;
  }
  .seller .overview .desc {
    padding-bottom: 18px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .seller .overview .desc .star {
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
  }
  .seller .overview .desc .text {
    display: inline-block;
    margin-right: 12px;
    line-height: 18px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(77,85,93);
  }
  .seller .overview .remark {
    display: flex;
    padding-top: 18px;
  }
  .seller .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
  }
  .seller .overview .remark .block:last-child {
    border: 0;
  }
  .seller .overview .remark .block h2 {
    margin-bottom: 10px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .seller .overview .remark .block .content {
    line-height: 24px;
    font-size: 10px;
    color: rgb(7,17,27);
  }
  .seller .overview .remark .block .content .stress {
    font-size: 24px;
  }
  .seller .overview .favorite {
    position: absolute;
    right: 17px;
    top: 18px;
    width: 50px;
    text-align: center;
  }
  .seller .overview .favorite .icon-favorite {
    display: block;
    background-color: #d4d6d9;
    width: 24px;
    height: 24px;
    border-radius: 10px;
    margin: 0 auto;
  }
  .seller .overview .favorite .icon-favorite.active {
    background-color: rgb(240, 20, 20);
  }
  .seller .overview .favorite .text {
    line-height: 10px;
    font-size: 10px;
    color: rgb(77，85，93);
  }
  .seller .bulletin {
    padding: 18px 18px 0 18px;
  }
  .seller .bulletin .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7,17,27);
    font-size: 14px;
  }
  .seller .bulletin .content-wrapper {
    padding: 0 12px 16px 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .bulletin .content-wrapper .content {
    line-height: 24px;
    font-size: 12px;
    color: rgb(240,20,20);
  }
  .seller .bulletin .content-wrapper .supports {

  }
  .seller .bulletin .supports .supports-item {
    padding: 16px 12px;
    font-size: 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .bulletin .supports .supports-item:last-child {
    border: 0;
  }
  .seller .bulletin .supports .supports-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .seller .de-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .seller .de-icon.decrease {
    background-image: url(../../common/images/decrease_3@2x.png);
  }
  .seller .de-icon.discount {
    background-image: url(../../common/images/discount_3@2x.png);
  }
  .seller .de-icon.guarantee {
    background-image: url(../../common/images/guarantee_3@2x.png);
  }
  .seller .de-icon.invoice {
    background-image: url(../../common/images/invoice_3@2x.png);
  }
  .seller .de-icon.special {
    background-image: url(../../common/images/special_3@2x.png);
  }
  .seller .pics {
    padding: 18px;
  }
  .seller .pics .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7,17,27);
    font-size: 14px;
  }
  .seller .pics .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .seller .pics .pic-wrapper .pic-list {
    font-size: 0
  }
  .seller .pics .pic-wrapper .pic-list .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }
  .seller .info {
    padding: 18px 18px 0 18px;
    color: rgb(7,17,27);
  }
  .seller .info .title {
    padding-bottom: 8px;
    line-height: 14px;
    font-size: 14px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .info .info-item {
    padding: 16px 12px;
    line-height: 16px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 12px;
  }
  .seller .info .info-item:last-child {
    border: 0;
  }
</style>
