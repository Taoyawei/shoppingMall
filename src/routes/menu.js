/**
 * @abstract 菜单模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  addMenu,
  getList,
  modifyMenu,
  deleteMenu
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
// 修改菜单
router.post('/modify', checkLogin, async (ctx, next) => {
  const {id, menu_name, code, des, menu_ser, parent_id, menu_icon} = ctx.request.body
  ctx.body = await modifyMenu({
    id,
    menu_name,
    code,
    des,
    menu_ser,
    parent_id,
    menu_icon
  })
})
// 删除菜单
router.post('/delete', checkLogin, async (ctx, next) => {
  const {menu_id} = ctx.request.body
  ctx.body = await deleteMenu(menu_id)
})
module.exports = router
