// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import router from './router'
import axios from 'axios'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
Vue.use(VueCodeMirror)

import '@/styles/index.scss' // global css
// require ('../mock')
// import Mock from './mock'
// import store from './components/vuex/vuex'
import store from './store'
import {
  Editable,
  EditableColumn
} from 'vue-element-extends'
import 'vue-element-extends/lib/index.css'
import '@/icons' // icon
import '@/permission' // permission control
Vue.config.productionTip = false

Vue.prototype.$axios=axios;//设置全局引用
Vue.use(ElementUI);
Vue.use(Editable);
Vue.use(EditableColumn);
//配置请求的设置
axios.defaults.headers.post['Content-type']="application/json";
// axios.defaults.baseURL = 'http://mockjs.com/api';
axios.defaults.baseURL = 'http://localhost:8088/api';

// axios.defaults.headers.common['token']="f4c902c9ae5a2a9d8f84868ad064e706";//配置参数，请求验证，根据请求方接口需要的

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
