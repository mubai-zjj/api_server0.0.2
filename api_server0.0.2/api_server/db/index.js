// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'bywl_database',
  password: '7Z2NHCziLRxp7jj5',
  database: 'bywl_database',
})

// 向外共享 db 数据库连接对象
module.exports = db
