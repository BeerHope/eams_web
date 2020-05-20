import request from '@/utils/request'

/* 列表 */
export function getDeviceList(params) {
  return request({
    url: '/device/info/list',
    method: 'get',
    params
  })
}

/* 设备解绑 */
export function unbindDevice(data) {
  return request({
    url: '/device/unbind',
    method: 'post',
    data
  })
}

/* 一键解绑某个生产订单号的设备 */
export function batchUnbindDevice(data) {
  return request({
    url: '/device/batchUnbind',
    method: 'post',
    data
  })
}