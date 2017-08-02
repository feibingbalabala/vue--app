<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      content
    </div>
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
  #app .tab {
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
