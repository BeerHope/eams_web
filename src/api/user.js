import request from '@/utils/request'

/* 获取用户列表 */
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

/* 新增用户 */
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'put',
    data
  })
}

/* 用户详情 */
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
  return request({
    url: '/user/system/detail/'+data.id,
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
