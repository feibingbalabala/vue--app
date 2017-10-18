<template>
  <!-- 这个id并没有什么意义,没有也没关系 -->
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <!-- vue-router判断当前是哪个页面，并添加类名，这个是局部修改，具体可查看f12 -->
        <router-link to="/goods" active-class="active2">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        // .json显示的是 Promise 对象所以用.body方法，可以在github官网上查看方法
        if (response.errno === ERR_OK) {
          this.seller = response.data
          // vue 会自动给对象生成get和set方法用于对象的监听
          // console.log(this.seller)
        }
      })
    },
    components: {
      // 这里要注意不要用header,这个是html的关键字，所以使用v作为组件的开头
      'v-header': header
    }
  }
</script>

<style>
/* 使用flex不用担心兼容性的写法，因为在vue-lodaer下的postcss会补全兼容性写法 */
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
 }
 .tab .tab-item {
   flex: 1;
   border-bottom: 1px solid rgba(0, 0, 0, 0.5);
   border-top: 1px solid rgba(0, 0, 0, 0.5);
 }
 .tab-item .sel {
   color: red;
 }
 .active {
   color: red;
 }
  .active2 {
    color: green;
  }
</style>
