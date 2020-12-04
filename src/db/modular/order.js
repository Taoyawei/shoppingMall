/**
 * @abstract 订单表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const Orders = seq.define('orders', {
  order_number: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '订单编码'
  },
  submit_time: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '提交时间'
  },
  user_account: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '下单用户账号'
  },
  order_money: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '订单金额'
  },
  pyment: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: -1,
    comment: '支付方式/支付状态(微信支付：0。支付宝：1。未支付：-1)'
  },
  order_source: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '订单来源(App:0，Pc: 1)'
  },
  order_staus: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '订单状态(待付款：0，待发货：1，已发货：2，已完成；3，退款中：4，已关闭：5(异常订单结束))'
  },
  order_mode: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '配送方式'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '下单用户id'
  },
  collect_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '收货信息id'
  },
  // comm_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   comment: '商品id'
  // },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量'
  },
  return_reason: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '退款原因'
  }
})

module.exports = Orders