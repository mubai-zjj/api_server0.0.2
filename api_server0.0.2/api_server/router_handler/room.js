//导入数据库操作模块
const db = require('../db/index')


// 添加新房间的处理函数
exports.Addroom = (req, res) => {
  // 接收表单数据
  const roominfo = req.body

  /*
  const sql = `select * from room_list where room_id=?`
  db.query(sql, [roominfo.room_id], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
  return res.cc(err)
    }
    // 房间已存在
    if (results.length > 0) {
    return res.cc('当前房间编号已存在，请检查数据重新填写')
    }
  */

  //定义插入新用户的SQL语句
  const sql = 'insert into room_list set ?'
  //调用 db.query() 执行 SQL 语句，插入新用户：
  db.query(sql, { room_number: roominfo.room_number, room_name: roominfo.room_name, room_typeId: roominfo.room_typeId, room_type: roominfo.room_type, hotel_id: roominfo.hotel_id, hotel_name: roominfo.hotel_name }, function (err, results) {
    // 执行 SQL 语句失败
    if (err)
      return res.cc(err)
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.cc('添加房间失败，请检查房间信息是否完整')
    }
    // 注册成功
    //res.send({ status: 0, message: '注册成功！' })
    res.cc('房间信息发送成功', 0)
  })
  /*})*/
}

