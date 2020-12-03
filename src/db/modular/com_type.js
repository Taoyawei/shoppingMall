/**
 * @abstract 商品类型表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const ComType = seq.define('com_types', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品类型名称'
  }
})

module.exports = ComType
