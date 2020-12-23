/**
 * @abstract 商品模块的controller
 * @author taoyawei
 */
const {paramDefect, returnData} = require('../utils/utils.js')
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const fs = require('fs')

const {
  doAddCommodity
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

module.exports = {
  upImg,
  addCommodity
}
