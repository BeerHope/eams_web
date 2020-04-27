import request from '@/utils/request'

/* 列表 */
export function getDeviceList(params) {
  return request({
    url: '/device/info/list',
    method: 'get',
    params
  })
}