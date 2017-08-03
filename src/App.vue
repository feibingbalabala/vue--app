<template>
  <!-- 这个id并没有什么意义,没有也没关系 -->
  <div id="wrap">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  export default {
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
 }
</style>
