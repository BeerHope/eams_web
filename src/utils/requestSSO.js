import axios from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from "vue";

let loadingInstance;

// create an axios instance
const service = axios.create({
  baseURL: "/", // api 的 base_url
  timeout: 10 * 1000 // request timeout
})

if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info, a) {
    Vue.nextTick(() => {
      store.dispatch('addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}

// request interceptor
service.interceptors.request.use(
  config => { // Do something before request is sent
    if (store.getters.token) {
      config.headers['token'] = getToken(); // 让每个请求携带token-- ["token"]为自定义key
      config.headers['X-Tag'] = 'msr';
    }

    /*console.log('请求体：', config)*/
    // loadingInstance = Loading.service({ fullscreen: true });
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
)

// response interceptor
service.interceptors.response.use(
  /* response => response,*/
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;



   return response;

  },
  error => {
    // loadingInstance.close();
    console.log('err' + error); // for debug
    Message({
      message: error.message?error.message:"系统异常，工程师在紧急修复中.....",
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service
