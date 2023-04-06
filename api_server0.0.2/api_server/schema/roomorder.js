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
/*
// 房间类型的验证规则
const room_type = joi.string().required()
// 房间类型的验证规则
const room_typeId = joi.string().required()
*/
// 房间订单号的验证规则
const room_orderId = joi.string().required()
// 房间入住时间的验证规则
const room_checkInDate = joi.string().required()
//房间退房时间验证规则
const room_checkOutDate = joi.string().required()
//房间状态验证规则
const room_status = joi.string().required()
//房间顾客电话号码
const room_guestPhone = joi.string().required()
//房间入住顾客姓名
const room_guestname = joi.string().required()
//房间入住顾客身份证号
const room_guestIDcard = joi.string().required()
//房间顾客入住信息登记表单验证规则
exports.room_order_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
  room_number,
  room_name,
  room_orderId,
  room_checkInDate,
  room_checkOutDate,
  room_status,
  room_guestPhone,
  room_guestname,
  room_guestIDcard,},
}
