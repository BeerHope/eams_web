import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  const cookie= Cookies.get(TokenKey)
  return cookie
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
