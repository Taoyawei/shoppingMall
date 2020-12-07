/**
 * @abstract 登录模块转换器
 * @author taoyawei
 */
const { doCrypto } = require('../utils/crypto.js')
const {
  ErrorModal,
  SuccessModal
} = require('../utils/response.js')
const { requestParams } = require('../utils/errorInfo.js')
const {
  doGoLogin
} = require('../modules/login.js')
const {set, del, exists} = require('../redis/index')
/**
 * 登录接口
 * @param account 账号
 * @param password 密码
 */
async function doLogin ({account, password}) {
  if (!account || !password) return new ErrorModal(requestParams)
  const result = await doGoLogin({
    account,
    password: doCrypto(password)
  })
  if (result && result.error) {
    return new ErrorModal({
      code: 1001,
      message: result.error
    })
  } else {
    const token = doCrypto(password) + '=' + (new Date()).getTime()
    const info = {
      token,
      ...result
    }
    if (exists('userInfo')) {
      del('userInfo')
    }
    set('userInfo', JSON.stringify(info))
    return new SuccessModal(info)
  }
}

module.exports = {
  doLogin
}