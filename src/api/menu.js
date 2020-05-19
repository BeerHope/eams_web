

import request from '@/utils/request'

/* 获取菜单列表 */
export function getMenuList() {
  return request({
    url: '/menu',
    method: 'get',
  })
}

//新增菜单
export function addMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

//获取菜单详情
export function getMenuDetails(menuId) {
  return request({
    url: `/menu/${menuId}`,
    method: 'get',
  })
}

//更新菜单
export function updateMenu(menuId, data) {
  return request({
    url: `/menu/${menuId}`,
    method: 'put',
    data
  })
}
