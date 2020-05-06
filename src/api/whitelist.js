import request from '@/utils/request'

/* 获取授权工具列表(白名单列表) */
export function getWhitelistList(data) {
  return request({
    url: '/whitelist/list',
    method: 'post',
    data
  })
}

/* 添加工具授权 */
export function addWhitelist(data) {
  return request({
    url: '/whitelist/add',
    method: 'post',
    data
  })
}


/* 删除工具授权 */
export function deleteWhitelist(data) {
  return request({
    url: '/whitelist/del',
    method:'post',
    data
  })
}