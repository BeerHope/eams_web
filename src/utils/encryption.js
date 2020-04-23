import { JSEncrypt } from 'jsencrypt'

/**
 * 返回加密后的字符串
 * @param {String} text 
 */
export function getEncryptText(text) {
  const encryptor = new JSEncrypt()
  // 设置公钥
  const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5simUmTb1cbAaXLKUerWD+0BVsvLPW8FYryQnEFyqOFoA1P2SZXWkcv92eeodWvbonQGU9m3EL50o7W5s0EVvhDIo7kFKVlUmgCCL87SM67NFyy387db4EwR9TQkrBo3inxKp6TnFHlcbfeYuocfx1jqxUQsdn3lQ5C8K4qRIVQIDAQAB';  //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
  encryptor.setPublicKey(publicKey)
  // 加密数据
  return encryptor.encrypt(text);
}