

import request from '@/utils/request'

/* 获取角色列表 */
export function getRoleList(params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

//新增角色
export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

//获取角色详情
export function getRoleDetails(roleId) {
  return request({
    url: `/role/${roleId}`,
    method: 'get',
  })
}

//修改角色
export function updateRole(roleId, data) {
  return request({
    url: `/role/${roleId}`,
    method: 'put',
    data
  })
}


// 获取角色下的菜单树
export function getMenus() {
  return request({
    url: '/role/tree',
    method: 'get',
  })
}

/* 获取外协厂角色列表 */
export function getFactoryRoles() {
  return request({
    url: '/role/select4Factory',
    method: 'get'
  })
}
