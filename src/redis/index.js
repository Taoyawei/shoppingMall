/**
 * @abstract redis配置，set, get, del
 * @author taoyawei
 */
const { REDIS_CONFIG } = require('../config/db.js')
const redis = require('redis')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
// 监听错误
redisClient.on('error', err => {
  console.log('redis error:', err)
})

/**
 * 存储
 * @param {string} key 键
 * @param {string} value 值
 * @param {date} timeout 有效期
 */
function set (key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}

/**
 * 取值
 * @param {string} key 键
 */
function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      if (!val) {
        resolve(val)
      }
      try {
        resolve(JSON.parse(val))
      } catch(error) {
        resolve(val)
      }
    })
  })
}

/**
 * 删除
 * @param {string} key 键
 */
function del (key) {
  redisClient.del(key)
}

/**
 * 判断是否存在
 * @param {string} key 键
 */
function exists (key) {
  return redisClient.exists(key)
}

module.exports = {
  set,
  get,
  del,
  exists
}