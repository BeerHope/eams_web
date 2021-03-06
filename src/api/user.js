import request from '@/utils/request'

/* 获取外协厂用户列表 */
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

/* 新增外协厂用户 */
export function addFactoryUser(data) {
  return request({
    url: '/user/add',
    method: 'put',
    data
  })
}
/* 编辑外协厂用户 */
export function updateFactoryUser(data) {
  return request({
    url: '/user/factory/update',
    method: 'post',
    data
  })
}
/* 获取外协厂用户详情 */
export function getUserDetails(userId) {
  return request({
    url: `/user/detail/${userId}`,
    method: 'get',
  })
}

/* 获取当前用户信息 */
export function getUserInfo() {
  return request({
    url: '/user/getCurrentUser',
    method: 'get'
  })
}

/* 登录 */
export function doLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/* 冻结/启用账号接口 */
export function updateState(data) {
  return request({
    url: '/user/updateState',
    method: 'post',
    data
  })
}

/* 重置密码 */
export function resetPassword(data) {
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data
  })
}

/* 修改密码 */
export function updatePassword(data) {
  return request({
    url: '/user/modify',
    method: 'post',
    data
  })
}
//获取系统用户
export function sysUserlist(data) {
  return request({
    url: '/user/system/list',
    method: 'GET',
     params:data
  })
}



//新增系统用户
export function addSysUser(data) {
  return request({
    url: '/user/system/add',
    method: 'PUT',
     data
  })
}

//系统用户启用 冻结
export function SysfreezeUser(data) {
  return request({
    url: '/user/system/updateState',
    method: 'POST',
    data
  })
}

//系统用户详情
export function SysUserDetails(data) {
  // console.log(data)
  return request({
    url: '/user/system/detail/'+data,
    method: 'GET'
  })
}
//重置密码 系统用户
export function SysResetPwd(data) {
  return request({
    url: '/user/system/resetPwd',
    method: 'POST',
    data
  })
}

//获取系统角色列表
export function select4System() {
  return request({
    url: '/role/select4System',
    method: 'GET'
  })
}


//修改用户
export function updateSysUser(data) {
  return request({
    url: '/user/system/update',
    method: 'POST',
    data
  })
}
