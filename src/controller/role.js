/**
 * @abstract 角色的controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const {
  doAddRole,
  doConfigRole,
  doGetList,
  doMobileRole,
  doDeleteRole
} = require('../modules/role.js')
const {paramDefect, returnData} = require('../utils/utils.js')
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
/**
 * 修改角色
 * @param {int} id 角色id
 * @param {string} role_name 角色名称
 * @param {string} role_des 角色描述
 * @param {boolean} isEnable 是否启用
 */
async function mobileRole ({id, role_name, role_des, isEnable}) {
  if (!paramDefect({id, role_name, role_des, isEnable})) {
    return new ErrorModal(requestParams)
  }
  const result = await doMobileRole({id, role_name, role_des, isEnable})
  return returnData(2003, result)
}
/**
 * 删除角色
 * @param {int} role_id 角色id
 */
async function deleteRole (role_id) {
  if (!paramDefect({role_id})) {
    return new ErrorModal(requestParams)
  }
  const result = await doDeleteRole(role_id)
  return returnData(2004, result)
}
module.exports = {
  addRole,
  configRole,
  getList,
  mobileRole,
  deleteRole
}