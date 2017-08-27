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
    </div>
    <div class="bulletin-wrap"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
</script>
<style>
  html, body {
    font-family: "微软雅黑";
  }
  .header {
    color: #fff;
    background-color: #000;
  }
  .content-wrap {
    padding: 24px 12px 18px 24px;
  }
  .avatar {
    display: inline-block;
    vertical-align: top;
  }
  .avatar img {
    border-radius: 2px;
  }
  .content {
    display: inline-block;
    margin-left: 16px;
    font-size: 14px; 
  }
  .title {
    margin: 2px 0 8px 0;
  }
  .brand {
    display: inline-block;
    widtH: 30px;
    height: 18px;
    background-image: url(../../common/images/brand@2x.png);
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .support {
    font-size: 0;
  }
  .support .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .icon.decrease {
    background-image: url(../../common/images/decrease_1@2x.png);
  }
  .icon.discount {
    background-image: url(../../common/images/discount_1@2x.png);
  }
  .icon.guarantee {
    background-image: url(../../common/images/guarantee_1@2x.png);
  }
  .icon.invoice {
    background-image: url(../../common/images/invoice_1@2x.png);
  }
  .icon.special {
    background-image: url(../../common/images/special_1@2x.png);
  }
  .support .text {
    line-height: 12px;
    font-size: 12px;
  }
</style>
