/**
 * @abstract 登录模块
 * @author taoyawei
 */
const {
  Users
} = require('../db/modular/index.js')
const {resultHandle} = require('../utils/utils')
/**
* 
* @param {stirng} account 账号
* @param {string} password 密码 
*/
async function doGoLogin ({account, password}) {
  // 查询是否存在该用户
  try {
    const date = (new Date).getTime()
    const item = {
      login_time: date
    }
    const result = await Users.findOne({
      attributes: ['account', 'name', 'login_time', 'email', 'isEnable', 'mobile'],
      where: {
        account,
        password
      }
    })
    if (!result) {
      return {
        error: '该用户不存在'
      }
    }
    await Users.update(item, {
      where: {
        account,
        password
      }
    })
    return resultHandle(result)
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doGoLogin
}
