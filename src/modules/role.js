/**
 * @abstract 角色模块的modules
 * @author taoyawei
 */
const { Roles, Menus, Users } = require('../db/modular/index.js')
const {resultHandle, returnData} = require('../utils/utils.js')
/**
 * 添加角色
 * @param {string} role_name 角色名称
 * @param {string} role_des 角色描述
 * @param {boolean} isEnable 是否启用
 */
async function doAddRole ({role_name, role_des, isEnable}) {
  try {
    const time = (new Date()).getTime()
    const result = await Roles.create({
      role_name,
      role_des,
      isEnable,
      add_time: time
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 获取角色列表
 * @param {int} pageNo 页数 
 * @param {int} pageSize 每页条数 
 */
async function doGetList (pageNo, pageSize) {
  try {
    const result = Roles.findAll({
      attributes: ['id', 'role_name', 'role_des', 'isEnable', 'user_number', 'add_time'],
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 角色添加菜单权限
 * @param {int} role_id 角色id
 * @param {Array} list 菜单的id和是否勾选数组
 */
async function doConfigRole (role_id, list) {
  try {
    // 获取角色
    const role = await Roles.findOne({
      where: {
        id: role_id
      }
    })
    for (let i = 0; i < list.length; i++) {
      const menu = await Menus.findOne({
        where: {
          id: list[i].id
        }
      })
      // 查询中间表是否存在这条数据
      const middle = await role.getMenus(menu)
      if (!middle && list[i].isCheck) { // 如果没有这条数据，且这个菜单是勾选的
        await role.addMenus(menu) // 添加这条数据
      } else if (middle && !list[i].isCheck) { // 如果存在这条数据且没有被勾选
        await role.removeMenus(menu) // 删除中间表这条数据
      }
    }
    return []
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 修改角色
 * @param {int} id 角色id
 * @param {string} role_name 角色名称
 * @param {string} role_des 角色描述
 * @param {boolean} isEnable 是否启用
 */
async function doMobileRole ({id, role_name, role_des, isEnable}) {
  try {
    const item = {
      role_name,
      role_des,
      isEnable
    }
    const role = await Roles.findOne({
      where: {
        id
      }
    })
    if (!role) {
      return {
        error: '角色不存在'
      }
    }
    const result = await Roles.update(item, {
      where: {
        id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return err.errors ? err.errors[0].message : '链接错误'
  }
}
/**
 * 删除角色
 * @param {int} role_id 角色id
 */
async function doDeleteRole (role_id) {
  /**
   * 思路：
   * 1. 角色表和用户表，菜单表都有关联，但是二者不一样，对于用户表，角色是辅，用户是主，对于菜单表，角色是主
   * 2. 所以我们先要知道这个角色有多少个用户用了，并且知道有没有被用，有没有设置菜单权限
   * 3. 根据上述条件删除多对多关系
   */
  try {
    const role = await Roles.findOne({
      where: {
        id: role_id
      }
    })
    if (!role) return { error: '该角色不存在' }
    const user_number = await role.getUsers()
    const menu_number = await role.getMenus()
    // console.log(user_number.length)
    // console.log('****************')
    // console.log(menu_number.length)
    if (user_number && user_number.length > 0) await role.removeUsers(user_number)
    if (menu_number && menu_number.length > 0) await role.removeMenus(menu_number)
    return returnData([])
  } catch (err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddRole,
  doConfigRole,
  doGetList,
  doMobileRole,
  doDeleteRole
}