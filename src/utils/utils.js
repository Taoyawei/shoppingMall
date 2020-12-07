/**
 * @abstract 公共方法
 * @author taoyawei
 */

// 接口返回统一处理
function resultHandle (result) {
  if (result instanceof Array) {
    return result
  } else {
    return result ? result.dataValues ? result.dataValues : result : []
  }
}

module.exports = {
  resultHandle
}