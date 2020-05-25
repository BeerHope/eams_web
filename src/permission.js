import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { redirectToLogin } from '@/api/login'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login','/redirect']// no redirect whitelist
router.beforeEach((to, from, next) => {
  // if (!_.isEqual(to, from)) {
  //   store.commit('SET_TOKEN_EXPIRED', false)
  // }
  NProgress.start();
  // debugger
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      /* 判断vuex中是否存储菜单 */
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => {
          store.dispatch('GenerateRoutes', res.data.data).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            setTimeout(function () {
              next({ path: '/' });
            },3000)
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入  包括註冊的单独处理
      next();
    }else if(to.path.indexOf("/register/")==0){
      next();
    } else {
      //next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页;
      redirectToLogin(process.env.CALL_BACK+`/login`);
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
