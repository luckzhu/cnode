// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import '@/assets/js/common.js' //移动端适配common
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Util from '@/helpers/util.js'

Vue.use(Meta)
Vue.use(ElementUI)
Vue.use(Util)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
