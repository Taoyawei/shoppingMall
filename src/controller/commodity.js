/**
 * @abstract 商品模块的controller
 * @author taoyawei
 */
const {paramDefect, returnData} = require('../utils/utils.js')
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const fs = require('fs')

const {
  doAddCommodity,
  doGetList,
  doModifyCom,
  doGetDetail,
  doDeleteCom
} = require('../modules/commodity.js')
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
async function addCommodity ({name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail}) {
  if (!paramDefect({name, com_type_id, com_brand, brand_id, price, number, weight, isShelf})) return new ErrorModal(requestParams)
  const result = await doAddCommodity({
    name,
    com_type_id,
    com_brand,
    brand_id,
    price,
    number,
    des,
    weight,
    isShelf,
    com_detail
  })
  return returnData(7001, result, 1)
}
/**
 * 上传商品图片
 * @param {int} id 商品id
 * @param {file} img 上传图片信息
 */
async function upImg (id, img) {
  if (!paramDefect({id})) return new ErrorModal(requestParams)
  const imgs = fs.readdirSync('src/comImg')
  let isImg = false
  imgs.forEach(item => {
    const arr = JSON.parse(JSON.stringify(item.split('.')[0].split('&')))
    if (arr[1] === id) isImg = true
  })
  if (isImg) {
    const obj = {
      error: '该商品已有图片'
    }
    return returnData(7002, obj)
  }
  const reader = fs.createReadStream(img.path)
  const ext = img.name.split('.').pop() // 文件后缀名
  const name = img.name.split('.')[0] + '&' + id // 文件名字
  const upStream = fs.createWriteStream(`src/comImg/${name}.${ext}`)
  reader.pipe(upStream)
  return returnData(7002, [])
}
/**
 * 获取商品列表
 * @param {string} name 商品名称
 * @param {int} com_type_id 商品类型id
 * @param {int} brand_id 品牌id
 * @param {boolean} isShelf 是否上架
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function getList ({name, com_type_id, brand_id, isShelf, pageNo, pageSize}) {
  if (!paramDefect({pageNo, pageSize})) return new ErrorModal(requestParams)
  const result = await doGetList({
    name,
    com_type_id,
    brand_id,
    isShelf,
    pageNo,
    pageSize
  })
  return returnData(7003, result, 1)
}
/**
 * 根据商品id获取商品详情
 * @param {int} id 商品id 
 */
async function getDetail (id) {
  if (!paramDefect({id})) return new ErrorModal(requestParams)
  const result = await doGetDetail(id)
  return returnData(7005, result, 1)
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
 * 
 */
async function modifyCom({id, name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail}) {
  if (!paramDefect({id, name, com_type_id, com_brand, brand_id, price, number, weight})) return new ErrorModal(requestParams)
  const result = await doModifyCom({
    id,
    name,
    com_type_id,
    com_brand,
    brand_id,
    price,
    number,
    des,
    weight,
    isShelf,
    com_detail
  })
  return returnData(7004, result)
}
/**
 * 删除商品
 * @param {Array} ids 商品id
 */
async function deleteCom (ids) {
  // if (!paramDefect({ids})) return new ErrorModal(requestParams)
  const result = await doDeleteCom(ids)
  return returnData(7005, result)
}
module.exports = {
  upImg,
  addCommodity,
  getList,
  modifyCom,
  getDetail,
  deleteCom
}
