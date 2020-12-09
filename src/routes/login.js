/**
 * @abstract 登录，注册，修改密码基本操作
 * @author taoyawei
 */
const router = require('koa-router')()
const {
  doLogin,
  modifyPassword
} = require('../controller/login')
const {checkLogin} = require('../utils/middle.js')

// const {checkLogin} = require('../utils/middle.js')

// 登录接口
router.post('/login', async (ctx, next) => {
  // console.log('******************')
  const { account, password } = ctx.request.body
  ctx.body = await doLogin({
    account,
    password
  })
})

// 修改密码
router.post('/modify/password', checkLogin, async(ctx, next) => {
  const {id, password, newPassword} = ctx.request.body
  ctx.body = await modifyPassword({id, password, newPassword})
})

module.exports = router