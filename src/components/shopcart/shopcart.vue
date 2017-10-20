<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon_shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartconcontrol :food="food"></cartconcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="backshow">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartconcontrol from '../cartconcontrol/cartconcontrol'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              // price: 10,
              // count: 1
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        fold: true
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `还差￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount > 0) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}`)
      }
    },
    components: {
      cartconcontrol
    }
  }
</script>
<style>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
  .shopcart .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
  }
  .shopcart .content .content-left {
    flex: 1;
  }
  .shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background-color: #141d27;
  }
  .shopcart .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  }
  .shopcart .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b343c;
    text-align: center;
    /* line-height: 44px; */
  }
  .shopcart .content .content-left .logo-wrapper .logo.highlight {
    background-color: rgb(0, 160, 220)
  }
  body .shopcart .content .content-left .logo-wrapper .highlight .icon_shopping_cart {
    background-color: #fff;
  }
  .shopcart .content .content-left .logo-wrapper .logo .icon_shopping_cart {
    display: inline-block;
    width: 50%;
    height: 50%;
    font-size: 24px;
    margin-top: 10px;
    color: #80858a;
    background-color: #80858a;
    border-radius: 50%;
  }
  .shopcart .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0;
    box-sizing: border-box;
    padding: 0 12px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: bold;
    color: rgba(255,255,255,0.4);
  }
  .shopcart .content .content-left .price.highlight {
    color: #fff;
  }
  .shopcart .content .content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    color: rgba(255,255,255,0.4);
    font-size: 10px; 
  }
  .shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
  }
  .shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
  }
  .shopcart .content .content-right .pay.not-enough {
    background-color: #2b333b;
  }
  .shopcart .content .content-right .pay.enough {
    background-color: #00b43c;
    color: #fff;
  }
  .shopcart .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transition: all 0.5s;
    transform: translate3d(0, -100% ,0);
  }
  /* .shopcart .shopcart-list.fold-transition {
  } */
  .shopcart .fold-enter,.shopcart .fold-leave-to {
    transform: translate3d(0, 0, 0);
  }
  .shopcart .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .shopcart .shopcart-list .list-header .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopcart .shopcart-list .list-header .empty {
    float: right;
    font-size: 12px;
    color: rgb(0,100,220);
  }
  .shopcart .shopcart-list .list-content {
    overflow: hidden;
    padding: 0 18px;
    max-height: 217px;
    background-color: #fff;
  }
  .shopcart .shopcart-list .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .shopcart .shopcart-list .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .shopcart .shopcart-list .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700px;
    color: rgb(240,20,20);
  }
  .shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
  .shopcart .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: rgba(7, 17, 27,0.6);
    -webkit-backdrop-filter: blur(10);
    opacity: 1;
    transition: all 0.5s;
  }
  .shopcart .backshow-enter,.shopcart .fbackshowold-leave-to {
    opacity: 0;
  }
</style>

