// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// 全局引入cube-ui
import Cube from 'cube-ui'

Vue.use(Cube)

// 引入rem适配
import './common/js/rem'

// 引入样式
import './common/scss/index.scss'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
