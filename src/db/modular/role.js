/**
 * @abstract 角色表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')

const Roles = seq.define('roles', {
  role_name: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '角色名称'
  },
  role_des: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '角色描述'
  },
  isEnable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '角色是否被启用'
  },
  user_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '角色被用户引用数'
  },
  add_time: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '创建角色时间'
  }
})

module.exports = Roles
