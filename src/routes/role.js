/**
 * @abstract 角色模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {checkLogin} = require('../utils/middle.js')
const {
  addRole,
  configRole,
  getList
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
  const { pageNo, pageSize } = ctx.request.body
  ctx.body = await getList(pageNo, pageSize)
})
// 角色配置权限
router.post('/to/config', checkLogin, async (ctx, next) => {
  const {role_id, list} = ctx.request.body // 菜单集合
  ctx.body = await configRole(role_id, list)
})
module.exports = router
