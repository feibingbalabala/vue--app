<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- 因为数据是异步过来的，所以需要先判断是否有数据，否则一开始进来的是一个空对象，[0]下标就会显示未定义 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDeta">
        <span class="count">{{seller.supports.length}}个</span>
        <i>></i>
      </div>
    </div>
    <div class="bulletin-wrap" @click="showDeta">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i>></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!-- 弹窗 -->
    <!-- 添加过渡动画需要用过渡组建 -->
    <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrap clearfix">
        <div class="detail-main">
          <h1 class="de-name">{{seller.name}}</h1>
          <div class="star-wrap">
            <star :size='48' :score="seller.score"></star>
          </div>
          <div class="de-tit">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <!-- 若是遇到数组下标需要提前定义index -->
            <li class="supports-item" v-for="(item,index) in seller.supports" :key="item.index">
              <span class="de-icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="de-tit">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="de-bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click='closeDeta'>x</i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data: function () {
      return {
        detailShow: false
      }
    },
    methods: {
      // vue的依赖跟中，就可以访问到data里面的数据，然后通知指令去更新数据
      showDeta () {
        this.detailShow = true
      },
      closeDeta () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      star
    }
  }
</script>
<style>
  html, body {
    font-family: "微软雅黑";
  }
  .header {
    overflow: hidden;
    position: relative;
    color: #fff;
    background-color: rgba(7,17,27,0.5);
  }
  .header .content-wrap {
    position: relative;
    padding: 24px 12px 18px 24px;
  }
  .header .avatar {
    display: inline-block;
    vertical-align: top;
  }
  .header .avatar img {
    border-radius: 2px;
  }
  .header .content-wrap .content {
    display: inline-block;
    margin-left: 16px;
    font-size: 14px; 
  }
  .header .content-wrap .title {
    margin: 2px 0 8px 0;
  }
  .header .brand {
    display: inline-block;
    widtH: 30px;
    height: 18px;
    background-image: url(../../common/images/brand@2x.png);
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .header .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .header .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .header .support {
    font-size: 0;
  }
  .header .support .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .header .icon.decrease {
    background-image: url(../../common/images/decrease_1@2x.png);
  }
  .header .icon.discount {
    background-image: url(../../common/images/discount_1@2x.png);
  }
  .header .icon.guarantee {
    background-image: url(../../common/images/guarantee_1@2x.png);
  }
  .header .icon.invoice {
    background-image: url(../../common/images/invoice_1@2x.png);
  }
  .header .icon.special {
    background-image: url(../../common/images/special_1@2x.png);
  }
  .header .support .text {
    line-height: 12px;
    font-size: 12px;
  }
  .header .support-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;
  }
  .header .support-count i, .bulletin-wrap i {
    font-style: normal;
  }
  .header .count {
    font-size: 10px;
  }
  .header .bulletin-wrap {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
    /* font-size: 0; */
  }
  .header .bulletin-title {
    display: inline-block;
    width: 22px;
    height: 12px;
    margin-top: 8px;
    background-image: url(../../common/images/bulletin@2x.png);
    background-size: 22px 12px;
    vertical-align: top;
    background-repeat: no-repeat;
  }
  .header .bulletin-text {
    margin: 0 4px;
    font-size: 10px;
    vertical-align: top;
  }
  .header .bulletin-wrap i{
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 12px;
    line-height: 12px;
    font-style: normal;
  }
  .header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .header .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: all 0.5s;
    background: rgba(7,17,27, 0.8);
    -webkit-backdrop-filter: blur(10px);
  }
  /* 过渡动画和1.0的不同，v-enter-active */
  .fade-enter-active, {
    opacity: 1;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .clearfix {
    display: inline-block;
  }
  .clearfix:after {
   display: block;
   content: "";
   height: 0;
   line-height: 0;
   clear: both;
   visibility: hidden; 
  }
  .detail-wrap {
    width: 100%;
    min-height: 100%;
  }
  .detail-main {
    margin-top: 24px;
    padding-bottom: 64px;
  }
  .detail-close {
    /* position: relative; */
    width: 32px;
    height: 32px;
    margin: -64px auto 0;
    clear: both;
    font-size: 32px;
    line-height: 32px;
    font-style: normal;
  }
  .detail-close i {
    font-style: normal;
  }
  .de-name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    width: 100%; 
  }
  .star-wrap {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .de-tit {
    display: flex;
    width: 80%;
    margin: 28px auto 24px;
  }
  .de-tit .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .de-tit .text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .supports {
    width: 80%;
    margin: 0 auto;
  }
  .supports-item {
    padding: 0 12px;
    margin: 0 0 12px;
    font-size: 0;
  }
  .supports-item:last-child {
    margin: 0;
  }
  .de-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .de-icon.decrease {
    background-image: url(../../common/images/decrease_2@2x.png);
  }
  .de-icon.discount {
    background-image: url(../../common/images/discount_2@2x.png);
  }
  .de-icon.guarantee {
    background-image: url(../../common/images/guarantee_2@2x.png);
  }
  .de-icon.invoice {
    background-image: url(../../common/images/invoice_2@2x.png);
  }
  .de-icon.special {
    background-image: url(../../common/images/special_2@2x.png);
  }
  .supports .text {
    line-height: 16px;
    font-size: 12px;
  }
  .de-bulletin  {
    width: 80%;
    margin: 0 auto;
  }
  .de-bulletin .content {
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
  }
</style>
  