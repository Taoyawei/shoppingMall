/**
 * @abstract 加密处理
 * @author taoyawei
 */
const crypto = require('crypto')
const key = 'SD123ui_sd$@'

/**
 * md5加密
 * @param {string} content 加密明文
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 加密明文
 */
function doCrypto (content) {
  const str = `password=${content}&key=${key}`
  return _md5(str)
}

module.exports = {
  doCrypto
}
