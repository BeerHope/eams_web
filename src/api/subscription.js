import request from '@/utils/request'

/* 查询邮件订阅 */
export function getSubscriptionList() {
  return request({
    url: '/api/subscription/op/get',
    method: 'get'
  })
}

/* 保存更新邮件订阅 */
export function updateSubscription(data) {
  return request({
    url: '/api/subscription/op/save',
    method: 'put',
    data
  })
}
