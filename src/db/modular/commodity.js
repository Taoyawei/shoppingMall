/**
 * @abstract 商品表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const Commoditys = seq.define('commoditys', {
  // com_type: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   comment: '商品类型'
  // },
  com_type_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品类型id'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  com_brand: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品品牌'
  },
  brand_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '品牌id'
  },
  des: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '商品描述'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品价格'
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品存储数量'
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品重量'
  },
  isShelf: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否上架'
  },
  com_img: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品图片'
  },
  com_detail: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '商品详情，一般是富文本'
  },
  order_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品订单数量，默认为0'
  }
})

module.exports = Commoditys
