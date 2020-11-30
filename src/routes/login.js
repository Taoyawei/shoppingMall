/**
 * @abstract 登录，注册，修改密码基本操作
 * @author taoyawei
 */
const router = require('koa-router')()

router.post('/login', async (ctx, next) => {
  console.log('123')
  ctx.body = '登录成功'
})

module.exports = router