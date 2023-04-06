//导入数据库操作模块
const db = require('../db/index')
//导入bcryptjs对用户信息进行加密
//const bcrypt = require('bcryptjs')
//导入request模块向云起发起url请求
const request = require('request');
// 添加新订单的处理函数
exports.roomorder = (req, res) => {
  // 接收表单数据
  const orderinfo = req.body
  const GetLSToken =
  {
    method: 'POST',
    url: 'https://n1.vip.ilifesmart.com:3886/ent_stuouc_com/app/api',
    body: {
      messageId: '6c209507-e0e5-4b74-9df6-a5b0b89e9f31',
      method: 'Login',
      params: { 'username': 'admin', 'password': 'admin' }

    },
    json: true

  }
  //查询订单中房间是否存在
  const sql = `select * from room_list where room_number=?`
  db.query(sql, [orderinfo.room_number], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err)
    }
    // 房间是否存在
    if (results.length !== 1) {
      return res.cc('当前订单内房间不存在，系统无法完成供电')
    }
    const sql = 'insert into room_order set ?'
    //调用 db.query() 执行 SQL 语句，插入订单信息：
    request(GetLSToken, function (error, response, body) {
      if (error) throw new Error(error);
      db.query(sql,
        {
          room_number: orderinfo.room_number,
          room_status: orderinfo.room_status,
          room_name: orderinfo.room_name,
          room_typeId: orderinfo.room_typeId,
          room_type: orderinfo.room_type,
          room_checkInDate: orderinfo.room_checkInDate,
          room_checkOutDate: orderinfo.room_checkOutDate,
          room_orderId: orderinfo.room_orderId,
          room_guestPhone: orderinfo.room_guestPhone,
          room_guestname: orderinfo.room_guestname,
          room_guestIDcard: orderinfo.room_guestIDcard
        }, function (err, results) {
          // 执行 SQL 语句失败
          if (err)
            return res.cc(err)
          // SQL 语句执行成功，但影响行数不为 1
          if (results.affectedRows !== 1) {
            return res.cc('订单信息缺失，请检查订单信息是否完整')
          }
          //开启云起设备
          if (orderinfo.room_status == 'checkIn') {
            const options = {
              method: 'POST',
              url: 'https://n1.vip.ilifesmart.com:3886/ent_stuouc_com/app/api',
              body: {
                messageId: '6c209507-e0e5-4b74-9df6-a5b0b89e9f31',
                method: 'SetLgcProperties',
                auth: {
                  userid: body.message.userid,
                  usertoken: body.message.usertoken
                },
                params: { items: [[results[0].room_resgrpId, 'L', 1]] }
              },
              json: true
            };

            request(options, function (error, response, body) {
              if (err)
                return res.cc(err);
              res.cc('订单信息已记录，房间已供电', 0)
            }
            );
          }

          //关闭云起设备

          if (orderinfo.room_status == 'checkOut') {
            const options = {
              method: 'POST',
              url: 'https://n1.vip.ilifesmart.com:3886/ent_stuouc_com/app/api',
              body: {
                messageId: '6c209507-e0e5-4b74-9df6-a5b0b89e9f31',
                method: 'SetLgcProperties',
                auth: {
                  userid: body.message.userid,
                  usertoken: body.message.usertoken
                },
                params: { items: [[results[0].room_resgrpId, 'L', 0]] }
              },
              json: true
            };

            request(options, function (error, response, body) {
              if (err)
                return res.cc(err);
              res.cc('订单信息已记录，房间已断电', 0)
            }
            );
          }
        })
    })
  }
  )
}