/**
 * @abstract 商品类型路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  addType,
  modifyType,
  getList
} = require('../controller/comType.js')
// 新建商品类型
router.post('/add', checkLogin, async (ctx, next) => {
  const {name} = ctx.request.body
  ctx.body = await addType(name)
})

// 修改商品类型
router.post('/modify', checkLogin, async (ctx, next) => {
  const {name, id} = ctx.request.body
  ctx.body = await modifyType({id, name})
})

// 删除商品类型
router.post('/delete', checkLogin, async (ctx, next) => {
  const {id} = ctx.request.body
  ctx.body = await deleteType(id)
})
// 获取商品类型列表
router.post('/list', checkLogin, async (ctx, next) => {
  const {pageNo, pageSize, findName} = ctx.request.body
  ctx.body = await getList({
    pageNo,
    pageSize,
    findName
  })
})
module.exports = router