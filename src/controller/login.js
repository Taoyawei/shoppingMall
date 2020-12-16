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
  doGoLogin,
  doModifyPassword
} = require('../modules/login.js')
const {set, del, exists, get} = require('../redis/index')
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
    set('userInfo', JSON.stringify(info), 24*60*60)
    return new SuccessModal(info)
  }
}
/**
 * 修改密码
 * @param {int} id 用户id
 * @param {string} password 老密码
 * @param {string} newPassword 新密码
 */
async function modifyPassword ({id, password, newPassword}) {
  if (!id || !password || !newPassword) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  if (info.id !== id) {
    return new ErrorModal({
      code: 1002,
      message: '抱歉，您无权修改'
    })
  }
  const result = await doModifyPassword({id, password, newPassword})
  if (result && result.error) {
    return new ErrorModal({
      code: 1003,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}
module.exports = {
  doLogin,
  modifyPassword
}