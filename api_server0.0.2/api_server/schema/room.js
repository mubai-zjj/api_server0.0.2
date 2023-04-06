const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 房间id的验证规则
const room_number = joi.string().required()
// 房间名的验证规则
const room_name = joi.string().required()
// 房间名的验证规则
const room_type = joi.string().required()
// 房间名的验证规则
const room_typeId = joi.string().required()
// 房间名的验证规则
const hotel_name = joi.string().required()
// 房间名的验证规则
const hotel_id = joi.string().required()

// 注册和登录表单的验证规则对象
exports.addroom_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
      room_number,
      room_name,
      room_type,
      room_typeId,
      hotel_name,
      hotel_id,},
}
