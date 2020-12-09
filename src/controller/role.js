/**
 * @abstract 角色的controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const {
  doAddRole,
  doConfigRole,
  doGetList
} = require('../modules/role.js')
 /**
  * 添加角色
  * @param {string} role_name 角色名称
  * @param {string} role_des 角色描述
  * @param {boolean} isEnable 是否启用 
  */
async function addRole ({role_name, role_des, isEnable}) {
  if (!role_name || !role_des || !isEnable) return new ErrorModal(requestParams)
  const result = await doAddRole({role_name, role_des, isEnable})
  if (result && result.error) {
    return new ErrorModal({
      code: 2001,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
/**
 * 获取角色列表
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function getList (pageNo, pageSize) {
  if (!pageNo || !pageSize) return new ErrorModal(requestParams)
  const result = await doGetList(pageNo, pageSize)
  if (result && result.error) {
    return new ErrorModal({
      code: 2003,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 角色添加菜单权限
 * @param {int} role_id 角色id
 * @param {Array} list 菜单id集合
 */
async function configRole (role_id, list) {
  const result = await doConfigRole(role_id, list)
  if (result && result.error) {
    return new ErrorModal({
      code: 2002,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}
module.exports = {
  addRole,
  configRole,
  getList
}