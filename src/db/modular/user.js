/**
 * @abstract 用户表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')

const Users = seq.define('users', {
  account: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '账号'
  },
  name: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '姓名'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '邮箱'
  },
  add_time: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '创建时间'
  },
  login_time: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '最后登录时间'
  },
  isEnable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否启用'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码'
  },
  password_account: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码明文'
  },
  mobile: {
    type: Sequelize.STRING(11),
    allowNull: false,
    comment: '手机号码'
  }
})

module.exports = Users
