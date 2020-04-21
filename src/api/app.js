// 应用程序信息管理（后期修改接口内容）
import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/customer/list',
    method: 'post',
    data
  })
}
//新增模式
export function addModels(data) {
  return request({
    url: '/customer/add',
    method: 'post',
    data
  })
}