/**
 * @abstract 菜单模块的modules
 * @author taoyawei
 */
const {Menus, Roles} = require('../db/modular/index.js')
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
    return result
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 查询菜单列表
 * @param {int} role_id 角色id,可选
 */
async function doGetList (role_id) {
  try {
    // 获取所有菜单列表
    const result = await Menus.findAll({
      attributes: ['id', 'menu_name', 'code', 'des', 'menu_ser', 'parent_id', 'menu_icon'],
      raw: true
    })
    if (role_id) {
      // 先获取对应角色
      const role = await Roles.findOne({
        where: {
          id: role_id
        }
      })
      if (!role) return { error: '该角色不存在' }
      // 获取角色对应菜单中间表的数据
      const arr = await role.getMenus({
        raw: true
      })
      const menus = arr.map(item => item.id)
      result.forEach(res => {
        if (menus.indexOf(res.id) !== -1) res.isCheck = true
        else res.isCheck = false
      })
    }
    // console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 修改菜单
 * @param {int} id 菜单id
* @param {string} menu_name 菜单名称
* @param {int} parent_id 上级菜单id
* @param {string} code 菜单code
* @param {string} des 菜单描述
* @param {int} menu_ser 菜单同级排序数
* @param {string} menu_icon 菜单图标
*/
// 判断传入的排序menu_ser是否已经存在
function judgeSer (arr, ser) {
  const newArr = arr.filter(item => item.menu_ser === ser)
  return newArr.length > 0
}
async function doModifyMenu ({id, menu_name, parent_id, code, des, menu_ser, menu_icon}) {
  try {
    // 根据parent_id获取对应的菜单列表
    const parent = parent_id ? parent_id : null
    const list = await Menus.findAll({
      where: parent
    })
    if (judgeSer(list, menu_ser)) {
      return {
        error: '菜单排序不能重复'
      }
    }
    // 排序不存在，修改菜单
    const item = {
      menu_name,
      parent_id,
      code,
      des,
      menu_ser,
      menu_icon
    }
    const menu = await Menus.update(item, {
      where: {
        id
      }
    })
    // console.log('**************')
    // console.log(id)
    // console.log(menu[0])
    if (menu && menu[0] === 0) {
      // console.log(menu[0] === 0)
      return { error: '菜单不存在' }
    } else {
      return []
    }
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 删除菜单
 * @param {number} menu_id 菜单id
 */
async function doDeleteMenu (menu_id) {
  try {
    for (let i = 0; i < menu_id.length; i++) {
      const menu = await Menus.findOne({
        where: {
          id: menu_id[i]
        }
      })
      if (!menu) return { error: '菜单不存在' }
      const roles = await menu.getRoles()
      await menu.removeRoles(roles)
      await menu.destroy()
    }
    // destroy
    return []
  } catch (err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddMenu,
  doGetList,
  doModifyMenu,
  doDeleteMenu
}
