import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from "vue";
import qs from 'qs'
// create an axios instance
// axios.defaults.headers.post['Content-Type']='application/json'
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 120 * 1000 // request timeout
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
      config.headers['X-Tag'] = 'speaker';
    }
    if(config.url.indexOf("dologin")>=1){
      config.data=qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  error => {
    console.log(error);
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
    // 针对导出操作的情况，返回的response.data下没有code字段
    const isBlob = response.config.responseType === 'blob'
    if(response.status === 200 && isBlob) {
      return response
    }
    if(res.code == 401){
      MessageBox.confirm('当前登录超时，您可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    if ( res.code != 200 && res.code!=0 && res.code!= 401) {
      Message({
        message: res.msg?res.msg:"系统异常，请联系管理员",
        type: 'error',
        duration: 2* 1000
      });
      throw SyntaxError();
    } else {
      return response;
    }
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
