/**
 * @abstract 菜单模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  addMenu,
  getList
} = require('../controller/menu.js')
// 添加菜单
router.post('/add', checkLogin, async (ctx, next) => {
  const {menu_name, parent_id, code, des, menu_ser, menu_icon} = ctx.request.body
  ctx.body = await addMenu({
    menu_name,
    parent_id,
    code,
    des,
    menu_ser,
    menu_icon
  })
} )
// 获取菜单列表
router.get('/list', checkLogin, async (ctx, next) => {
  ctx.body = await getList()
})
module.exports = router
