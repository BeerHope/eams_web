import request from '@/utils/request'

/* 获取授权工具列表(白名单列表) */
export function getToolAuthList(params) {
  return request({
    url: '/toolAuth/list',
    method: 'get',
    params
  })
}

/* 添加工具授权 */
export function addToolAuth(data) {
  return request({
    url: '/toolAuth',
    method: 'post',
    data
  })
}

/* 修改工具授权 */
export function updateToolAuth(id, data) {
  return request({
    url: `/toolAuth/${id}`,
    method: 'put',
    data
  })
}

/* 删除工具授权 */
export function deleteToolAuth(id) {
  return request({
    url: `/toolAuth/${id}`,
    method:'delete'
  })
}