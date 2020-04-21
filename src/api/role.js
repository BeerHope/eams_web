import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}
//删除角色
export function deleteRole(data) {
  return request({
    url: '/role/delRole',
    // url: '/staff/queryStaff',
    method: 'post',
    data

  })
}


//获取菜单列表
export function getMenus(data) {
  return request({
    url: '/menu/action',
    method: 'get',
    data

  })
}
//新增角色
export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data

  })
}
//获取角色详情

export function getRoleDetail(data) {
  return request({
    url: '/role/selectDetail',
    method: 'post',
    data

  })
}
//修改角色
export function updateRole(data) {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data

  })
}



