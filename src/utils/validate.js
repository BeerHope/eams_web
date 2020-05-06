/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}


/**
 * validate phone
 * @param phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  const re = /^[1][3,4,5,7,8][0-9]{9}$/;
  return re.test(phone);
}

export function validatePassword(password){
  /* 匹配字母，数字和英文标点符号，必须包含大小写字母，数字，支持6~18 */
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,18}$/;
  return re.test(password)
}

export function validateIP(ip){
  const re = /^(2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2}(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
  return re.test(ip)
}

/* 校验mac */
export function validateMac(mac) {
  const re = /^[a-fA-F0-9]{2}(-[a-fA-F0-9]{2}){5}$/
  return re.test(mac)
}



