/**
 * @abstract 商品模块modules
 * @author taoyawei
 */
const {Commoditys} = require('../db/modular/index.js')
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

module.exports = {
  doAddCommodity
}
