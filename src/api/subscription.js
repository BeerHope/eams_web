import request from '@/utils/request'

/* 查询邮件订阅 */
export function getSubscriptionList() {
  return request({
    url: '/subscription',
    method: 'get'
  })
}

/* 保存更新邮件订阅 */
export function updateSubscription(data) {
  return request({
    url: '/subscription/save',
    method: 'put',
    data
  })
}
