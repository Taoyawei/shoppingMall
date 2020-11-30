/**
 * @abstract sequelize实例
 * @author taoyawei
 */
const {MYSQL_CONFIG} = require('../config/db.js')
const Sequelize = require('sequelize')
const {isPro, isTest} = require('../utils/env.js')

const {host, user, database, password} = MYSQL_CONFIG

// 实例配置
const config = {
  host,
  dialect: 'mysql'
}

// 如果测试环境就打印日志
if (isTest) {
  config.logging = () => {}
}

// 如果生成环境，需要连接池
if (isPro) {
  config.pool = {
    max: 5,
    min: 1,
    idle: 1000
  }
}

// 实例
const seq = new Sequelize(database, user, password, config)
module.exports = seq