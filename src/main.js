import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/styles/common.scss' // common css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import scroll from 'vue-seamless-scroll'
import * as filters from './filters' // global filters
import JsonViewer from 'vue-json-viewer'
import _ from 'lodash'
import moment from 'moment'  //时间处理格式转换
import checkPermission from '@/plugins/checkPermission'
import localForage from 'localforage'

Vue.use(JsonViewer)
Vue.use(scroll)
Vue.use(scroll,{componentName: 'scroll-seamless'})
Vue.use(Element)
Vue.use(checkPermission)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

//area picker
import VueAreaLinkage from 'vue-area-linkage';
import 'vue-area-linkage/dist/index.css';
Vue.use(VueAreaLinkage);

_.assign(window, {
  _,
  moment,
  localForage
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})