import request from '@/utils/request'


//根据电话号码检查账户是否存在
export function checkSsoUserByPhone(data) {
  return request({
    url: '/sso/checkSsoUser',
    method: 'post',
    data
  });
}
  //判斷用戶有沒有進行註冊
  export function checkAddUser(data) {
    return request({
      url: '/sso/checkAddUser',
      method: 'post',
      data
    });
}

//用户登录

export function doLogin(data) {
  return request({
    url: '/dologin/xgdsso/auth/login',
    method: 'post',
    data
  });
}


