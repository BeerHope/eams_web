import request from '@/utils/requestSSO'


//找回密码第一步

export function checkUserAndSendCode(data) {
  return request({
    url: '/findpassApi/xgdsso/checkUserAndSendCode',
    method: 'post',
    data
  })
}
//判断验证码是否正确

export function checkRetrievePasswordCode(data) {
  return request({
    url: '/findpassApi/xgdsso/checkRetrievePasswordCode',
    method: 'post',
    data
  })
}

//修改密码提交
export function retrievePassword(data) {
  return request({
    url: '/findpassApi/xgdsso/retrievePassword',
    method: 'post',
    data
  })
}
