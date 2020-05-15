import store from '@/store'

/* 注册vue的全局方法 */
export default {
  install (Vue, options) {
    /* 校验按钮权限 */
    Vue.prototype.$checkBtnPermission = function (btnClassName) {
      const permissionButtons = store.getters.permissionButtons
      console.log(permissionButtons[btnClassName])
      return permissionButtons[btnClassName] !== undefined
    }
  }
}