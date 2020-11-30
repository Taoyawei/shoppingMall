/**
 * @abstract mysql与redis的配置
 * @author taoyawei
 */
const {isPro} = require('../utils/env.js')

// mysql配置
const MYSQL_CONFIG = {
  host: '127.0.0.1',
  prot: '3306',
  user: 'root',
  password: 'taoyawei',
  database: 'shopping'
}

// redis配置
const REDIS_CONFIG = {
  host: '127.0.0.1',
  prot: 6379
}

// 线上环境配置
if (isPro) {
  MYSQL_CONFIG = {}
  REDIS_CONFIG = {}
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}