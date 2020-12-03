/**
 * @abstract 商品品牌表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const Brands = seq.define('brands', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '品牌名称'
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '品牌logo'
  },
  order_number: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0,
    comment: '品牌订单数'
  }
})

module.exports = Brands
