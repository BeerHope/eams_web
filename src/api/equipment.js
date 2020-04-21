import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/device/list',
    method: 'post',
    data
  })
}

export function Details(data) {
  return request({
    url: '/device/detail',
    method: 'post',
    data
  })
}

//测试播报接口
export function Broadcast(data) {
  return request({
    url: '/device/broadcast/test',
    method: 'post',
    data
  })
}

//刷新获取终端的信息接口

export function flushInfo(data) {
  return request({
    url: '/device/flushInfo',
    method: 'post',
    data
  })
}

//获取终端的信息
export function getInfo(data) {
  return request({
    url: '/device/getInfo',
    method: 'post',
    data
  })
}
