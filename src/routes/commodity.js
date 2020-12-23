/**
 * @abstract 商品模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  upImg,
  addCommodity
} = require('../controller/commodity.js')
// 添加商品
router.post('/add', checkLogin, async (ctx, next) => {
  const {name, com_type_id, com_brand, brand_id, price, number, des, weight, isShelf, com_detail } = ctx.request.body
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

module.exports = router