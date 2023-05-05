// node/node.js
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

// 定义接口
app.get('/data', (req, res) => {
  const data = {
    message: 'Hello World!'
  }
  res.json(data)
})

// 启动服务器
const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
