/**
 * @abstract 商品类型的controller
 * @author taoyawei
 */
const { paramDefect, returnData } = require('../utils/utils.js')
const {requestParams} = require('../utils/errorInfo.js')
const {ErrorModal} = require('../utils/response.js')
// , SuccessModal

const {
  doAddType,
  doModifyType,
  doDeleteModify,
  doGetList
} = require('../modules/comType.js')
/**
 * 添加商品，类型
 * @param {string} name 商品类型名称
 */
async function addType (name) {
  if (!paramDefect({name})) return new ErrorModal(requestParams)
  const result = await doAddType(name)
  return returnData(5001, result)
}

/**
 * 修改商品类型
 * @param {int} id 商品类型id
 * @param {string} name 商品类型名称
 */
async function modifyType ({id, name}) {
  if (!paramDefect({id, name})) return new ErrorModal(requestParams)
  const result = await doModifyType({id, name})
  return returnData(5002, result)
}

/**
 * 删除商品类型
 * @param {int} id 商品类型id
 */
async function deleteType (id) {
  if (!paramDefect({id})) return new ErrorModal(requestParams)
  const result = await doDeleteModify(id)
  return returnData(5003, result)
}
/**
 * 获取商品类型列表
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 * @param {string} findName 查询条件
 */
async function getList ({pageNo, pageSize, findName}) {
  if (!paramDefect({pageNo, pageSize})) return new ErrorModal(requestParams)
  const result = await doGetList({pageNo, pageSize, findName})
  return returnData(5004, result, 1)
}
module.exports = {
  addType,
  modifyType,
  deleteType,
  getList
}
