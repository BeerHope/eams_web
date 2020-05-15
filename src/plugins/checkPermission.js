import store from '@/store'

/* 注册vue的全局方法 */
export default {
  install (Vue, options) {
    /* 校验按钮权限 */
    Vue.prototype.$checkBtnPermission = function (btnMark) {
      const permissionButtons = store.getters.permissionButtons
      return _.findIndex(permissionButtons, {className: btnMark}) >= 0
    }
  }
}