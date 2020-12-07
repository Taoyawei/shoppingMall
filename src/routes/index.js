/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()

const login = require('./login.js')

router.use('/api', login.routes(), login.allowedMethods())

module.exports = router