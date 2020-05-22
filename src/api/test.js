import request from '@/utils/request'

export function getTestList(params) {
  return request({
    url: '/test/list',
    method: 'get',
    params
  })
}