/**
 * @abstract 获取当前环境
 * @author taoyawei
 */
const env = process.env.NODE_ENV

module.exports = {
  isDev: env === 'dev',
  isNoDev: env !== 'dev',
  isPro: env === 'production',
  isNoPro: env !== 'production',
  isTest: env === 'test',
  isNoTest: env !== 'test'
}