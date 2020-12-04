/**
 * @abstract 菜单表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const Menus = seq.define('menus', {
  menu_name: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '菜单名称'
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '菜单编码'
  },
  des: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '菜单描述'
  },
  menu_ser: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '同级排序位数'
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: -1,
    comment: '上级菜单id'
  },
  menu_icon: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '菜单图标(阿里巴巴图标库的type)'
  }
})

module.exports = Menus
