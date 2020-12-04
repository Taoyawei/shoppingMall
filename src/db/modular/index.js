/**
 * @abstract 各个数据表之间的关联关系
 * @author taoyawei
 */
const Users = require('./user.js') // 用户表
const Brands = require('./brands.js') // 品牌表
const Collects = require('./collects.js') // 收货信息表
const ComType = require('./com_type.js') // 商品类型表
const Commoditys = require('./commodity.js') // 商品表
const Menus = require('./menu.js') // 菜单表
const Orders = require('./order.js') // 订单表
const Roles = require('./role.js') // 角色表

// 用户与角色关系，多对多
Users.belongsToMany(Roles, {
  through: 'users_roles'
})
Roles.belongsToMany(Users, {
  through: 'users_roles'
})

// 角色与菜单关系，多对多
Roles.belongsToMany(Menus, {
  through: 'roles_menus'
})
Menus.belongsToMany(Roles, {
  through: 'roles_menus'
})

// 用户与订单，一对多
Users.hasMany(Orders, {
  foreignKey: 'user_id'
})
Orders.belongsTo(Users, {
  foreignKey: 'user_id'
})

// 商品类型与商品关系, 一对多
ComType.hasMany(Commoditys, {
  foreignKey: 'com_type_id'
})
Commoditys.belongsTo(ComType, {
  foreignKey: 'com_type_id'
})

// 品牌和商品关系，一对多
Brands.hasMany(Commoditys, {
  foreignKey: 'brand_id'
})
Commoditys.belongsTo(Brands, {
  foreignKey: 'brand_id'
})

// 商品和订单关系，多对多
Commoditys.belongsToMany(Orders, {
  through: 'commoditys_orders'
})
Orders.belongsToMany(Commoditys, {
  through: 'commoditys_orders'
})

// 收货信息与订单关系，一对多
Collects.hasMany(Orders, {
  foreignKey: 'collect_id'
})
Orders.belongsTo(Collects, {
  foreignKey: 'collect_id'
})

module.exports = {
  Users,
  Brands,
  Collects,
  ComType,
  Commoditys,
  Menus,
  Orders,
  Roles
}
