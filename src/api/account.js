import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
//获取所有用户
export function GetUserAll(data) {
  return request({
    url: '/customer/getAll',
    method: 'post',
    data
  })
}
//新增用户
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
//激活1  冻结2
export function updateState(data) {
  return request({
    url: '/user/updateState',
    method: 'post',
    data
  })
}

//获取用户详情信息
export function Details(data) {
  return request({
    url: '/user/detail',
    method: 'post',
    data
  })
}

//重置密码
export function updatePass(data) {
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data
  })
}

//首页获取数据

export function statistics(data) {
  return request({
    url: '/index/reports',
    method: 'post',
    data
  })
}
//首页柱形图统计 statistics

export function LineStatistics(data) {
  return request({
    url: '/index/statistics',
    method: 'post',
    data
  })
}

//首页 轮播    /index/message/
export function carousel(data) {
  return request({
    url: '/index/message/carousel',
    method: 'post',
    data
  })
}
