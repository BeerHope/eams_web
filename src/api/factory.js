import request from '@/utils/request'

/* 获取工厂列表 */
export function getFactoryList(params) {
  return request({
    url: '/factory/list',
    method: 'get',
    params
  })
}

/* 新增工厂 */
export function addFactory(data) {
  return request({
    url: '/factory/add',
    method: 'put',
    data
  })
}

/* 获取所有工厂 */
export function getAllFactory() {
  return request({
    url: '/factory/getAll',
    method: 'get'
  })
}

/* 校验工厂名称是否存在（弃用：新增接口已增加提示） */
export function checkFactoryName(params) {
  return request({
    url: '/factory/checkFactoryName',
    method: 'get',
    params
  })
}