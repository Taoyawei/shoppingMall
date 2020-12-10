/**
 * @abstract 用户模块的controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const  {
  doGetList,
  doAddRole,
  doRemoveUser
} = require('../modules/user.js')
const { del, get } = require('../redis/index.js')
/**
* 获取用户列表
* @param {*} pageNo 页数
* @param {*} pageSize 每页条数
*/
async function getList (pageNo, pageSize) {
  if (!pageNo || !pageSize) return new ErrorModal(requestParams)
  const result = await doGetList(pageNo, pageSize)
  if (result && result.error) {
    return new ErrorModal({
      code: 4001,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
/**
 * 用户添加角色
 * @param {int} user_id 用户id
 * @param {Array} role_ids 角色id数组
 */
async function addRole (user_id, role_ids) {
  if (!user_id || !role_ids) return new ErrorModal(requestParams)
  const result = await doAddRole(user_id, role_ids)
  if (result && result.error) {
    return new ErrorModal({
      code: 4002,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
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
module.exports = {
  getList,
  addRole,
  removeUser
}