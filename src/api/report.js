import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url: '/message/list',
    method: 'post',
    data
  })
}

export function Detail(data) {
  return request({
    url: '/message/detail',
    method: 'post',
    data
  })
}
