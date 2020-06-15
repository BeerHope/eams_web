import request from '@/utils/request'

/* 生产看板详情 */
export function getProductionBoard() {
  return request({
    url: '/display/index',
    method: 'get'
  })
}
