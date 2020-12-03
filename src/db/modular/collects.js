/**
 * @abstract 收货信息表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const Collects = seq.define('collects', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '收货人姓名'
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '收货人手机号'
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '收货人地址(省市县镇)'
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '收货人详细地址(镇/乡/区 街道/村 门牌号/小区/楼号/室号)'
  },
  postal_code: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '邮政编码'
  }
})

module.exports = Collects
