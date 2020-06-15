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

/* 注册密钥 */
export function register21Key(orderId) {
  return request({
    url: `/order/registration21key/${orderId}`,
    method: 'get',
  })
}

/* 上传ini文件 */
export function uploadIniFile(data, params) {
  return request({
    url: '/order/program',
    method: 'post',
    headers: {
      "Content-Type": 'multipart/form-data'
    },
    params,
    data
  })
}

/* 废弃订单 */
export function abandonOrder(data) {
  return request({
    url: '/order/abandon',
    method: 'post',
    data
  })
}

/* 导出订单 */
export function exportOrder(id) {
  return request({
    url: `/order/export/${id}`,
    method: 'get',
    responseType: 'blob'
  })
}

/* 审核订单 */
export function checkOrder(data) {
  return request({
    url: '/order/check',
    method: 'post',
    data
  })
}

/* 上传资料 */
export function uploadResource(orderId, data) {
  return request({
    url: `/order/uploadResource/${orderId}`,
    method: 'post',
    headers: {
      "Content-Type": 'multipart/form-data'
    },
    data
  })
}
