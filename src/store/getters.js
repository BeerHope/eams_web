const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  username:state=>state.user.username,
  setting: state => state.user.setting,
  tokenExpired: state => state.user.tokenExpired,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissionButtons: state => state.permission.permissionButtons,
  errorLogs: state => state.errorLog.logs,
  logistics:state=>state.logistics.list,

}
export default getters
