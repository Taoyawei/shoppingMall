/**
 * @abstract 品牌模块的modules
 * @author taoyawei
 */
const {Brands, Commoditys} = require('../db/modular/index.js')
/**
 * 新增品牌
 * @param {string} name 品牌名称
 * @param {string} logo 品牌logo
 */
async function doAddBrand (name, logo) {
  try {
    const brand = await Brands.findOne({
      where: {
        name,
        logo
      }
    })
    if (brand) return { error: '该品牌已存在' }
    const result = await Brands.create({
      name,
      logo
    })
    return result
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 修改品牌
 * @param {int} id 品牌id
 * @param {string} name 品牌名称
 */
async function doModifyBrand (id, name) {
  try {
    const item = {
      name
    }
    const result = await Brands.update(item, {
      where: {
        id
      }
    })
    if (result && result[0] === 0) return { error: '该品牌不存在' }
    else return result
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 删除品牌
 * @param {Array} ids 品牌id数组
 */
async function doDeleteBrand (ids) {
  try {
    // const coms = await Commoditys.findAll({
    //   where: {
    //     brand_id: ids
    //   }
    // })
    for (let i = 0; i < ids.length; i++) {
      // const brand = await Brands.findOne({
      //   wher: {
      //     id: ids[i]
      //   }
      // })
      // const coms = await Commoditys.findAll({
      //   where: {
      //     brand_id: ids[i]
      //   }
      // })
      // await brand.removeCommoditys(coms)
      const brand = Brands.findById(ids[i])
      const coms = brand.getCommoditys()
      for (let com of coms) com.destory()
      brand.destory()
    }
    // const result = await Brands.destroy({
    //   where: {
    //     id: ids
    //   }
    // })
    return []
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 获取品牌列表
 * @param {string} name 搜索条件
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function doGetList (name, pageNo, pageSize) {
  try {
    const item = name ? {
      [Op.or]: [
        {
          name: name
        },
        {
          id: name
        }
      ]
    } : {}
    const result = await Brands.findAndCountAll({
      where: item,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    return result
  } catch (err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddBrand,
  doModifyBrand,
  doDeleteBrand,
  doGetList
}
