import request from '@/utils/request'

/* 获取资料列表 */
export function getResourceList(params) {
  return request({
    url: '/resource/list',
    method: 'get',
    params
  })
}

/* 下载资料 */
export function downloadResource(resourceId) {
  return request({
    url: `/resource/downloadResource/${resourceId}`,
    method: 'get',
    responseType: 'blob'
  })
}
