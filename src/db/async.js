/**
 * @abstract 数据库连接，初始化
 * @author taoyawei
 */
const seq = require('./seq.js')
require('./modular/index.js')

// 连接
seq.authenticate().then(() => {
  console.log('连接成功')
}).catch(err => {
  console.log('错误：' + err)
})

// 同步数据
seq.sync({foreach: true}).then(() => {
  console.log('Ok')
  process.exit()
})