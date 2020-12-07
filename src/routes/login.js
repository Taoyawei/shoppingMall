/**
 * @abstract 登录，注册，修改密码基本操作
 * @author taoyawei
 */
const router = require('koa-router')()
const {
  doLogin
} = require('../controller/login')

// router.post('/login', async (ctx, next) => {
//   console.log('123')
//   ctx.body = '登录成功'
// })

// 登录接口
router.post('/login', async (ctx, next) => {
  const { account, password } = ctx.request.body
  ctx.body = await doLogin({
    account,
    password
  })
})

module.exports = router