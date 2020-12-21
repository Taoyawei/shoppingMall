/**
 * @abstract 商品类型的module
 * @author taoyawei
 */
const {ComType} = require('../db/modular/index')
const {Op} = require('sequelize')
/**
 * 添加商品类型
 * @param {string} name 商品类型名称
 */
async function doAddType (name) {
  try {
    const result = await ComType.findOrCreate({
      where: {
        name
      },
      default: {
        name
      }
    })
    // console.log(result)
    return result
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 修改商品类型
 * @param {int} id 商品类型id
 * @param {string} name 商品类型名称
 */
async function doModifyType ({id, name}) {
  try {
    const item = {
      name
    }
    const result = await ComType.update(item, {
      where:{
        id
      }
    })
    // if (!type) return { error: '商品类型不存在' }
    if (result && result[0] === 0) return { error: '商品类型不存在' }
    else return []
  } catch (err) {
    return {
      error: err.errors ? err.errors[0].message : '连接错误'
    }
  }
}
/**
 * 删除商品类型
 * @param {int} id 商品类型id
 */
async function doDeleteModify (id) {
  try {
    const type = await ComType.findOne({
      where: {
        id
      }
    })
    if (!type) return {error: '商品类型不存在'}
    const result = await ComType.destory({
      where: {
        id
      }
    })
    return result
  } catch (err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 获取商品类型列表
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 * @param {string} findName 查询条件
 */
async function doGetList ({pageNo, pageSize, findName}) {
  let obj = {}
  const find = findName && !isNaN(Number(findName)) ? Number(findName) : findName
  if (find) {
    obj = {
      [Op.or]: [
        {
          id: findName
        },
        {
          name: findName
        }
      ]
    }
  }
  try {
    const result = await ComType.findAll({
      where: obj,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    // console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddType,
  doModifyType,
  doDeleteModify,
  doGetList
}
