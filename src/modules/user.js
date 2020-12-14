/**
 * @abstract user模块的modules
 * @author taoyawei
 */
const {Users, Roles} = require('../db/modular/index.js')
const {resultHandle} = require('../utils/utils.js')
/**
 * 获取用户列表
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function doGetList (pageNo, pageSize) {
  try {
    const result = await Users.findAndCountAll({
      attributes: ['account', 'name', 'email', 'add_time', 'login_time', 'isEnable', 'mobile', 'password_account'],
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    return resultHandle(result)
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 用户添加角色
 * @param {int} user_id 用户id
 * @param {Array} role_ids 角色id数组
 */
async function doAddRole (user_id, role_ids) {
  try {
    // 获取用户数据
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    })
    // 获取所有的角色数据模型
    const roles = await Roles.findAll({
      where: {
        id: role_ids
      }
    })
    // 修改直接多对多的关系(修改中间表)
    await user.setRoles(roles)
    return []
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 删除用户
 * @param {int} user_id 用户id
 */
async function doRemoveUser (user_id) {
  try {
    // 删除之前先清除用户角色中间表中数据
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    })
    // 清除中间表
    await user.removeRoles()

    // 删除用户
    const result = await Users.destroy({
      where: {
        id: user_id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return  {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
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
 * @param {string} password_account 密码明文
 */
async function doAddUser ({account, name, email, password, mobile, isEnable, password_account}) {
  try {
    const reuslt = await Users.create({
      account,
      name,
      email,
      password,
      mobile,
      isEnable,
      password_account,
      add_time: (new Date()).getTime()
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
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
 * @param {string} password_account 密码明文
 */
async function doMobileBasic ({ id, account, name, email, password, mobile, isEnable, password_account }) {
  try {
    const item = {
      account,
      name,
      email,
      password,
      mobile,
      isEnable,
      password_account
    }
    const result = await Users.update(item, {
      where: {
        id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 修改用户角色
 * @param {int} id 用户id
 * @param {array} role_ids 角色id数组
 */
async function doMobileRole ({id, role_ids}) {
  try {
    const user = await Users.findOne({
      where: {
        id
      }
    })
    if (!user) {
      return {
        errors: '用户不存在'
      }
    }
    const roles = await Roles.findAll({
      where: {
        id: role_ids
      }
    })
    // 先删除中间表的初始数据
    await user.removeRoles()
    await user.setRoles(roles)
    return []
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doGetList,
  doAddRole,
  doRemoveUser,
  doAddUser,
  doMobileBasic,
  doMobileRole
}
