<template>
  <div class="cartcontrol">
      <transition name="move">  
        <div class="cart-decrease" @click="decreaseCart($event)" v-show="food.count>0">
            <span class="inner">-</span>
        </div>
      </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart($event)">+</div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
//   created () {
//     console.log(this.food)
//   },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
<style>
.cartcontrol {
    font-size: 0;
}
.cartcontrol .cart-decrease {
    display: inline-block;
    padding: 3px;
    transition: all 0.4s linear;
}
/* .cartcontrol .cart-decrease.move-transition {
    opacity: 1;
    transform: translate3d(0,0,0);
} */
.cartcontrol .cart-decrease .inner {
    display: inline-block;
    font-size: 15px;
    line-height: 18px;
    height: 18px;
    width: 18px;
    color: #fff;
    background-color: rgb(0, 160, 220);
    border-radius: 50%;
    /* width: 12px; */
    text-align: center;
    transition: all 0.4s linear;
    transform: rotate(0);
}
.cart-decrease.move-enter {
    opacity: 0;
    transform: translate3d(24px, 0,0);
}
.cart-decrease.move-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0,0);
}
body .cartcontrol .cart-decrease.move-enter .inner {
    transform: rotate(180);
}
body .cartcontrol .cart-decrease.move-leave-to .inner {
    transform: rotate(180);
}
.cartcontrol .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 24px;
    padding-top: 6px;
    line-height: 12px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.cartcontrol .cart-add {
    display: inline-block;
    width: 12px;
    text-align: center;
    padding: 3px;
    font-size: 15px;
    line-height: 12px;
    height: 12px;
    color: #fff;
    background-color: rgb(0, 160, 220);
    border-radius: 50%;
}
</style>

