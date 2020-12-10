/**
 * @abstract 用户模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  getList,
  addRole,
  removeUser
} = require('../controller/user.js')

// 获取用户
router.post('/get/list', checkLogin, async (ctx, next) => {
  const { pageNo, pageSize } = ctx.request.body
  ctx.body = await getList(pageNo, pageSize)
})
// 用户添加角色
router.post('/add/role', checkLogin, async (ctx, next) => {
  const { user_id, role_ids } = ctx.request.body
  ctx.body = await addRole(user_id, role_ids)
})
// 删除用户
router.post('/remove', checkLogin, async (ctx, next) => {
  const {user_id} = ctx.request.body
  ctx.body = await removeUser(user_id)
})
module.exports = router