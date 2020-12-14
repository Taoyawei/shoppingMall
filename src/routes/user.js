/**
 * @abstract 用户模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  getList,
  addRole,
  removeUser,
  addUser,
  mobileBasic,
  mobileRole
} = require('../controller/user.js')

// 添加用户
router.post('/add/user', checkLogin, async (ctx, next) => {
  const { account, name, email, password, mobile, isEnable} = cts.request.body
  ctx.body = await addUser({
    account,
    name,
    email,
    password,
    mobile,
    isEnable
  })
})
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
// 修改用户基本信息
router.post('/mobile/basic', checkLogin, async (ctx, next) => {
  const { id, account, name, email, password, mobile, isEnable } = ctx.request.body
  ctx.body = await mobileBasic({
    id,
    account,
    name,
    email,
    password,
    mobile,
    isEnable
  })
})
// 修改用户角色信息
router.post('/mobile/role', checkLogin, async (ctx, next) => {
  const {id, role_ids} = ctx.request.body
  ctx.body = await mobileRole({id, role_ids})
})
module.exports = router