/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()

const login = require('./login.js')
const role = require('./role.js')
const menu = require('./menu.js')
const user = require('./user.js')
const comType = require('./comType.js')
const brand = require('./brand.js')
const commodity = require('./commodity.js')

router.use('/api', login.routes(), login.allowedMethods())
router.use('/api/role', role.routes(), role.allowedMethods())
router.use('/api/menu', menu.routes(), menu.allowedMethods())
router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/type', comType.routes(), comType.allowedMethods())
router.use('/api/brand', brand.routes(), brand.allowedMethods())
router.use('/api/commodity', commodity.routes(), commodity.allowedMethods())

module.exports = router