const db = require('../db/index')
const sql = `select * from ev_users where username=?`
    db.query(sql, 'YMSJ', function (err, results){console.log(results[0].LSEA_username)})