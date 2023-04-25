const express = require('express')
const cors = require('cors') // 引入cors库

const fs = require('fs')

const app = express()
app.use(cors()) // 使用cors中间件

app.get('/read_scan_results', (req, res) => {
  console.log(res)
  fs.readFile('../../src/tmp/iwscan.tmp', 'utf8', (err, data) => {
    // 读取iwscan.tmp文件内容
    if (err) throw err

    res.send(data) // 发送响应，将文件内容作为响应体发送回客户端
  })
})

app.listen(3002, () => console.log('Server running on port 3002')) // 启动服务器监听端口3000
