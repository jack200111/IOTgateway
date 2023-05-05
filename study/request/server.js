// server.js
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

// 定义接口
app.get('/data', (req, res) => {
  const data = {
    message: 'Hello World!'
  }
  res.json(data)
})

// 接收修改后的数据
app.post('/data', (req, res) => {
  const modifiedData = req.body
  console.log(req.body)
  // Do something with the modified data
  res.json(modifiedData)
})

// 启动服务器
const port = 3003
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
