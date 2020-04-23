import request from '@/utils/request'


export function redirectToLogin(data) {
  // window.location.href = process.env.LOGIN_URL + "?callbackUrl="+ data;
  window.location.href = process.env.LOGIN_URL
}

// export function getUserInfo() {
//   return request({
//     url: '/user/getCurrentUser',
//     method: 'post'
//     // params: { token }
//   })
// }
