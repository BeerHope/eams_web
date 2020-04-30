import request from '@/utils/request'

export function getUnbindDeviceList(params) {
  return request({
    url: '/log/unbind/list',
    method: 'get',
    params
  })
}