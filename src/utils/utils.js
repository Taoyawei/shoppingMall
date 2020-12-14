/**
 * @abstract 公共方法
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('./response.js')
// 接口返回统一处理
function resultHandle (result) {
  if (result instanceof Array) {
    return result
  } else {
    return result ? result.dataValues ? result.dataValues : result : []
  }
}

// 判断参数是否缺失
function paramDefect (obj) {
  let isTrue = true
  for (let key in obj) {
    // if (!obj[key] && obj[key] !== 0 && obj[key] !== false) isTrue = false
    if (typeof(obj[key]) !== 'boolean' && obj[key] !== 0 && !obj[key]) isTrue = false
  }
  return isTrue
}

// 接口统一格式返回
function returnData (code, result, msg) {
  if (result && result.error) {
    return new ErrorModal({
      code: code,
      message: result.error
    })
  } else {
    return msg ? new SuccessModal(result) : new SuccessModal
  }
}
module.exports = {
  resultHandle,
  paramDefect,
  returnData
}