import request from '@/utils/request'

/* 标识管理列表 */
export function getProcessList(data) {
  return request({
    url: '/process/list',
    method: 'post',
    data
  })
}

/* 新增标识 */
export function addProcess(data) {
  return request({
    url: '/process/add',
    method: 'post',
    data
  })
}

/* 删除标识 */
export function deleteProcess(data) {
  return request({
    url: '/process/del',
    method: 'post',
    data
  })
}