/**
 * @abstract 角色模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  addRole,
  configRole,
  getList,
  mobileRole,
  deleteRole,
  getAll
} = require('../controller/role.js')

// 添加角色
router.post('/add', checkLogin, async (ctx, next) => {
  const {role_name, role_des, isEnable} = ctx.request.body
  ctx.body = await addRole({
    role_name,
    role_des,
    isEnable
  })
})
// 获取角色列表
router.post('/get/list', checkLogin, async (ctx, next) => {
  const { pageNo, pageSize, name } = ctx.request.body
  ctx.body = await getList(pageNo, pageSize, name)
})
// 获取所有角色列表
router.post('/get/all', checkLogin, async (ctx, next) => {
  const {user_id} = ctx.request.body
  ctx.body = await getAll(user_id)
})
// 角色配置权限
router.post('/to/config', checkLogin, async (ctx, next) => {
  const {role_id, list} = ctx.request.body // 菜单集合
  ctx.body = await configRole(role_id, list)
})
// 修改角色
router.post('/mobile/role', checkLogin, async (ctx, next) => {
  const { id, role_name, role_des, isEnable } = ctx.request.body
  ctx.body = await mobileRole({id, role_name, role_des, isEnable})
})
// 删除角色
router.post('/delete', checkLogin, async (ctx, next) => {
  const { role_id } = ctx.request.body
  ctx.body = await deleteRole(role_id)
})
module.exports = router
