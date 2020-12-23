/**
 * @abstract 品牌模块的controller
 * @author taoyawei
 */
const fs = require('fs')
const {get, del, set, exists} = require('../redis/index.js')
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {returnData, paramDefect} = require('../utils/utils.js')
const {requestParams} = require('../utils/errorInfo.js')
const {
  doAddBrand,
  doModifyBrand,
  doDeleteBrand,
  doGetList
} = require('../modules/brand.js')
 /**
  * 保存上传的logo
  * @param {file} file 上传的图片
  */
async function doLogo (file) {
  // 先判断是否存在logo
  const info = await get('userInfo')
  const fileList = []
  const files = fs.readdirSync('src/updata')
  files.forEach(item => {
    fileList.push(item)
  })
  let isLogo = false
  fileList.forEach(res => {
    // console.log(res)
    const arr = JSON.parse(JSON.stringify(res.split('.')[0].split('$')))
    if (arr[1] === info.id) isLogo = true
  })
  if (!isLogo) {
    const obj = {
      error: 'logo已存在'
    }
    return returnData(6001, obj)
  }
  const reader = fs.createReadStream(file.path)
  const ext = file.name.split('.').pop()
  const name = file.name.split('.')[0] + '$' + info.id
  const upStream = fs.createWriteStream(`src/updata/${name}.${ext}`)
  reader.pipe(upStream)
  const newFiles = fs.readdirSync('src/updata')
  if (await exists('files')) await del('files')
  await set('files', newFiles, 1000000000000)
  return returnData(6001, [])
}
/**
 * 新增品牌
 * @param {string} name 品牌名
 */
async function addBrand (name) {
  if (!paramDefect({name})) return new ErrorModal(requestParams)
  const fileList = await get('files')
  let logo = ''
  fileList.forEach(item => {
    const arr = JSON.parse(JSON.stringify(item.split('.')[0].split('$')))
    if (arr[1] === info.id) logo = `src/updata/${item}`
  })
  const result = await doAddBrand(name, logo)
  return returnData(6002, result)
}
/**
 * 修改品牌
 * @param {int} id 品牌id
 * @param {string} name 品牌名称
 */
async function modifyBrand (id, name) {
  if (!paramDefect({id, name})) return new ErrorModal(requestParams)
  const result = await doModifyBrand(id, name)
  return returnData(6003, result)
}
/**
 * 删除品牌
 * @param {Array} ids 品牌id集合
 */
async function deleteBrand (ids) {
  const result = await doDeleteBrand(ids)
  return returnData(6004, result)
}
/**
 * 获取品牌列表
 * @param {string} name 搜索条件
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function getList (name, pageNo, pageSize) {
  if (!paramDefect({pageNo, pageSize})) return new ErrorModal(requestParams)
  const result = await doGetList(name, pageNo, pageSize)
  return returnData(6005, result)
}
module.exports = {
  doLogo,
  addBrand,
  modifyBrand,
  deleteBrand,
  getList
}
