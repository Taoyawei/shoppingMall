/**
 * @abstract 菜单模块的modules
 * @author taoyawei
 */
const {Menus} = require('../db/modular/index.js')
const {resultHandle} = require('../utils/utils.js')
/**
 * 添加菜单
 * @param {string} menu_name 菜单名称
 * @param {int} parent_id 上级菜单id
 * @param {string} code 菜单code
 * @param {string} des 菜单描述
 * @param {int} menu_ser 菜单同级排序数
 * @param {string} menu_icon 菜单图标
 */
async function doAddMenu({menu_name, parent_id, code, des, menu_ser, menu_icon}) {
  try {
    const result = await Menus.create({
      menu_name,
      parent_id,
      code,
      des,
      menu_ser,
      menu_icon
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 查询菜单列表
 */
async function doGetList () {
  try {
    const result = await Menus.findAll({
      attributes: ['id', 'menu_name', 'code', 'des', 'menu_ser', 'parent_id', 'menu_icon']
    })
  } catch (err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

module.exports = {
  doAddMenu,
  doGetList
}
