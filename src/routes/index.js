/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()

const login = require('./login.js')
const role = require('./role.js')
const menu = require('./menu.js')

router.use('/api', login.routes(), login.allowedMethods())
router.use('/api/role', role.routes(), role.allowedMethods())
router.use('/api/menu', menu.routes(), menu.allowedMethods())

module.exports = router