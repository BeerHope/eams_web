import request from '@/utils/request'

export function getLogList(params) {
  return request({
    url: '/log/info/list',
    method: 'get',
    params
  })
}


export function getLogDetails(logId) {
  return request({
    url: `/log/info/detail/${logId}`,
    method: 'get',
  })
}