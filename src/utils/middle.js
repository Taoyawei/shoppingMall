/**
 * @abstract 公用中间件封装
 * @author taoyawei
 */
const {exists, get} = require('../redis/index')
// 判断是否登录并验证token
async function checkLogin (ctx, next) {
  // console.log(ctx.request.header)
  const info = ctx.request.header
  if (exists('userInfo')) {
    // await next()
    const token = (await get('userInfo')).token
    if (!info.token || info.token !== token) {
      return ctx.body = {
        code: '401',
        message: 'token验证失败'
      }
    } else {
      await next()
    }
  } else {
    return ctx.body = {
      code: '402',
      message: '登录失效，请重新登录'
    }
  }
}

module.exports = {
  checkLogin
}