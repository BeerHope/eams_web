import request from '@/utils/request'

/* 列表 */
export function getOrderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data
  })
}

/* 导入订单 */
export function importOrder(data) {
  return request({
    url: '/order/import',
    method: 'post',
    headers: {
      "Content-Type": 'multipart/form-data'
    },
    data
  })
}

/* 获取工单详情 */
export function getOrderDetails(orderId) {
  return request({
    url: `/order/get/${orderId}`,
    method: 'get'
  })
}

/* 更新工单 */
export function updateOrder(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}