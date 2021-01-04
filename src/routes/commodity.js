/**
 * @abstract 商品模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  upImg,
  addCommodity,
  getList,
  modifyCom,
  getDetail
} = require('../controller/commodity.js')
// 添加商品
router.post('/add', checkLogin, async (ctx, next) => {
  const { name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail } = ctx.request.body
  ctx.body = await addCommodity({
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
})
// 上传商品图片
router.post('/com/img', checkLogin, async (ctx, next) => {
  const img = ctx.request.files.img
  const {id} = ctx.request.body
  ctx.body = await upImg(id, img)
  // ctx.body = ctx.request.files.img
})
// 获取商品列表
router.post('/list', checkLogin, async (ctx, next) => {
  const { name, com_type_id, brand_id, isShelf, pageNo, pageSize } = ctx.request.body
  ctx.body = await getList({
    name,
    com_type_id,
    brand_id,
    isShelf,
    pageNo,
    pageSize
  })
})
// 根据商品id获取详情
router.post('/detail', checkLogin, async (ctx, next) => {
  const {id} = ctx.request.body
  ctx.body = await getDetail(id)
})
// 修改商品列表
router.post('/modify', checkLogin, async (ctx, next) => {
  const {id, name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail} = ctx.request.body
  ctx.body = await modifyCom({
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
})
module.exports = router