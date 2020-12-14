/**
 * @abstract 用户模块的controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const  {
  doGetList,
  doAddRole,
  doRemoveUser,
  doAddUser,
  doMobileBasic,
  doMobileRole
} = require('../modules/user.js')
const { del, get } = require('../redis/index.js')
const {paramDefect, returnData} = require('../utils/utils.js')
const {doCrypto} = require('../utils/crypto.js')
/**
* 获取用户列表
* @param {*} pageNo 页数
* @param {*} pageSize 每页条数
*/
async function getList (pageNo, pageSize) {
  if (!pageNo || !pageSize) return new ErrorModal(requestParams)
  const result = await doGetList(pageNo, pageSize)
  // if (result && result.error) {
  //   return new ErrorModal({
  //     code: 4001,
  //     message: result.error
  //   })
  // } else {
  //   return new SuccessModal(result)
  // }
  return returnData(4001, result, 1)
}
/**
 * 用户添加角色
 * @param {int} user_id 用户id
 * @param {Array} role_ids 角色id数组
 */
async function addRole (user_id, role_ids) {
  if (!user_id || !role_ids) return new ErrorModal(requestParams)
  const result = await doAddRole(user_id, role_ids)
  // if (result && result.error) {
  //   return new ErrorModal({
  //     code: 4002,
  //     message: result.error
  //   })
  // } else {
  //   return new SuccessModal()
  // }
  return returnData(4002, result)
}
/**
 * 删除用户
 * @param {int} user_id 用户id
 */
async function removeUser (user_id) {
  const result = await doRemoveUser(user_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 4003,
      message: result.error
    })
  } else {
    const info = await get('userInfo')
    if (user_id === info.id) await del('userInfo')
    return new SuccessModal()
  }
}
/**
 * 添加用户
 * @param {string} account 账号
 * @param {string} name 姓名
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @param {string} mobile 手机号
 * @param {boolean} isEnable 是否启用
 */
async function addUser ({account, name, email, password, mobile, isEnable}) {
  if (!paramDefect({account, name, email, password, mobile, isEnable})) {
    return new ErrorModal(requestParams)
  }
  const result = await doAddUser({
    account,
    name,
    email,
    password: doCrypto(password),
    mobile,
    isEnable,
    password_account: password
  })
  return returnData(4004, result)
}
/**
 * 修改用户基本信息
 * @param {int} id 用户id
 * @param {string} account 账号
 * @param {string} name 姓名
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @param {string} mobile 手机号
 * @param {boolean} isEnable 是否启用
 */
async function mobileBasic ({id, account, name, email, password, mobile, isEnable}) {
  if (!paramDefect({ id, account, name, email, password, mobile, isEnable })) {
    return new ErrorModal(requestParams)
  }
  const result = await doMobileBasic({
    id,
    account,
    name,
    email,
    password: doCrypto(password),
    mobile,
    isEnable,
    password_account: password
  })
  return returnData(4005, result)
}
/**
 * 修改用户角色
 * @param {int} id 用户id
 * @param {array} role_ids 角色id集合
 */
async function mobileRole ({id, role_ids}) {
  if (!paramDefect({id, role_ids})) {
    return new ErrorModal(requestParams)
  }
  const result = await doMobileRole({id, role_ids})
  return returnData(4006, result)
}
module.exports = {
  getList,
  addRole,
  removeUser,
  addUser,
  mobileBasic,
  mobileRole
}