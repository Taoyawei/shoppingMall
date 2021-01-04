/**
 * @abstract 商品模块modules
 * @author taoyawei
 */
const fs = require('fs')
const {Commoditys, ComType} = require('../db/modular/index.js')
/**
 * 新建商品
 * @param {string} name 商品名称
 * @param {int} com_type_id 商品类型id
 * @param {string} com_brand 品牌名称
 * @param {int} brand_id 品牌id
 * @param {float} price 商品价格
 * @param {int} number 商品数量
 * @param {string} des 商品描述
 * @param {int} weight 商品重量
 * @param {boolean} isShelf 是否上架
 * @param {text} com_detail 商品详细描述
 */
async function doAddCommodity ({name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail}) {
  try {
    const com = await Commoditys.findOne({
      where: {
        name,
        com_type_id,
        brand_id,
        price,
        weight
      }
    })
    if (com) return { error: '该商品已存在' }
    const result = await Commoditys.create({
      name,
      com_type_id,
      com_brand,
      brand_id,
      price,
      number,
      des,
      weight,
      isShelf,
      com_detail,
      com_img: '11111'
    })
    return result
  } catch (err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
/**
 * 获取商品列表
 * @param {string} name 商品名称
 * @param {int} com_type_id 商品类型id
 * @param {int} brand_id 品牌id
 * @param {boolean} isShelf 是否上架，默认查询上架商品
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 * 
 */
async function doGetList ({name, com_type_id, brand_id, isShelf, pageNo, pageSize}) {
  const item = {}
  if (name) item.name = name
  if (com_type_id) item.com_type_id = com_type_id
  if (brand_id) item.brand_id = brand_id
  item.isShelf = isShelf
  try {
    const result = await Commoditys.findAndCountAll({
      attributes: ['id', 'name', 'com_brand', 'brand_id', 'price', 'number', 'weight', 'isShelf', 'com_img', 'order_number'],
      where: item,
      include: [{
        model: ComType,
        attributes: ['id', 'name'] 
      }],
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    // 获取商品图片列表
    // fs.readdirSync('src/comImg')
    const imgs = fs.readdirSync('src/comImg')
    // console.log(imgs)
    result.rows.forEach(res => {
      imgs.forEach(n => {
        if (n.split('.')[0].split('&')[1] === res.id.toString()) {
          res.com_img = `/src/comImg/${n}`
        }
      })
    })
    return result
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '连接错误'
    }
  }
}
/**
 * 根据商品id获取商品详情
 * @param {int} id 商品id 
 */
async function doGetDetail (id) {
  try {
    const result = await Commoditys.findOne({
      where: {
        id
      }
    })
    return result
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '连接错误'
    }
  }
}
/**
 * 修改商品
 * @param {int} id 商品id
 * @param {string} name 商品名称
 * @param {int} com_type_id 商品类型id
 * @param {string} com_brand 品牌
 * @param {int} brand_id 品牌id
 * @param {float} price 价格
 * @param {int} number 数量
 * @param {string} des 商品简介
 * @param {float} weight 商品重量
 * @param {boolean} isShelf 是否上架
 * @param {string} com_detail 商品详情
 */
async function doModifyCom ({id, name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail}) {
  try {
    const item = {
      name,
      com_type_id,
      com_brand,
      brand_id,
      price,
      number,
      des: des ? des : null,
      weight,
      isShelf,
      com_detail: com_detail ? com_detail : null
    }
    const result = await Commoditys.update(item, {
      where: {
        id
      }
    })
    return result
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '连接错误'
    }
  }
}
/**
 * 删除商品
 * @param {Array} ids 商品id
 */
async function doDeleteCom (ids) {
  try {
    for (let i = 0; i < ids.length; i++) {
      const com = await Commoditys.findOne({
        where: {
          id: ids[i]
        }
      })
      if (!com) return { error: '该商品不存在' }
      // removeRoles
      const orders = await com.getOrders() // 获取商品对应商品-订单中间表的数据
      await com.removeOrders(orders) // 删除对应订单的中间表数据
      await com.destroy() // 删除商品
    }
    return []
  } catch (err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddCommodity,
  doGetList,
  doGetDetail,
  doModifyCom,
  doDeleteCom
}
