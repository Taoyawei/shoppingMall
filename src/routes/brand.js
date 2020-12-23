/**
 * @abstract 品牌模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  doLogo,
  addBrand,
  modifyBrand,
  deleteBrand,
  getList
} = require('../controller/brand.js')

// 上传品牌logo
router.post('/logo', checkLogin, async (ctx, next) => {
  const file = ctx.request.files.file
  ctx.body = await doLogo(file)
})
// 新建品牌
router.post('/add', checkLogin, async (ctx, next) => {
  const {name} = ctx.request.body
  ctx.body = await addBrand(name)
})
// 修改品牌(暂时只能修改名称)
router.post('/modify', checkLogin, async (ctx, next) => {
  const {id, name} = ctx.request.body
  ctx.body = await modifyBrand(id, name)
})
// 删除品牌
router.post('/delete', checkLogin, async (ctx, next) => {
  const {ids} = ctx.request.body
  ctx.body = await deleteBrand(ids)
})
// 获取品牌列表
router.post('/list', checkLogin, async (ctx, next) => {
  const {name, pageNo, pageSize} = ctx.request.body
  ctx.body = await getList(name, pageNo, pageSize)
})
module.exports = router
