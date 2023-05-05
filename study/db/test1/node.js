// 1. 安装sqlite3模块：
//    npm install sqlite3 --save

// 2. 在Vue文件中引入sqlite3模块：
const sqlite3 = require('sqlite3')

// 3. 创建一个数据库对象：
const db = new sqlite3.Database('./database.db')
console.log(db)
// 4. 使用SQL语句创建表：
db.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)'
)

// 5. 插入数据：
db.run('INSERT INTO users (name, age) VALUES (?, ?)', ['John', 25])

// 6. 查询数据：
db.all('SELECT * FROM users', function (err, rows) {
  console.log(rows)
  console.log(err)
})

// 7. 关闭数据库：
db.close()
