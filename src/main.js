// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

// let App = Vue.extend()
let routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
let router = new VueRouter({
  // 全局修改 vue-router判断当前是哪个页面，并添加类名，查看f12
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})
new Vue({
  template: '<App/>',
  components: { App },
  router
}).$mount('#app')
// 这个就是组页面挂载的id
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
