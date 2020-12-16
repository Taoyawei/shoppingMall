/**
 * @abstract 菜单模块的controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const {
  doAddMenu,
  doGetList,
  doModifyMenu
} = require('../modules/menu.js')
const {returnData, paramDefect} = require('../utils/utils.js')
 /**
  * menu_name, parent_id, code, des, menu_ser, menu_icon
  * 新增菜单
  * @param {string} menu_name 菜单名称
  * @param {int} parent_id 上级菜单id
  * @param {string} code 菜单code
  * @param {string} des 菜单描述
  * @param {int} menu_ser 菜单同级排序数
  * @param {string} menu_icon 菜单图标
  */
async function addMenu ({menu_name, parent_id, code, des, menu_ser, menu_icon}) {
  if (!menu_name || !code || !menu_ser || !menu_icon) return new ErrorModal(requestParams)
  const result = await doAddMenu({
    menu_name,
    parent_id,
    code,
    des,
    menu_ser,
    menu_icon
  })
  if (result && result.error) {
    return new ErrorModal({
      code: 3001,
      message: result.error
    })
  } else {
    return new SuccessModal(reuslt)
  }
}

/**
 * 获取菜单
 */
async function getList () {
  const result = await doGetList()
  if (result && result.error) {
    return new ErrorModal({
      code: 3002,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
/**
 * 修改菜单
 * @param {int} id 菜单id
 * @param {string} menu_name 菜单名称
 * @param {string} code 菜单code
 * @param {string} des 菜单描述
 * @param {int} menu_ser 菜单排序
 * @param {int} parent_id 父级id
 * @param {string} menu_icon 菜单icon
 */
async function modifyMenu ({id, menu_name, code, des, menu_ser, parent_id, menu_icon}) {
  if (!paramDefect({id, menu_name, code, menu_ser, menu_icon})) return new ErrorModal(requestParams)
  const result = await doModifyMenu({id, menu_name, code, des, menu_ser, parent_id, menu_icon})
  // console.log(result)
  return returnData(3003, result)
}
module.exports = {
  addMenu,
  getList,
  modifyMenu
}
