<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
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
            <span class="sell-count">月售{food.sellCount}份</span>
            <span class="rating">好评率{{food.rating}}</span>  	
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      food: Object
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      }
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
</style>
