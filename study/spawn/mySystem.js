// node/mySystem.js
const express = require('express')
const { spawn } = require('child_process')
const app = express()
const cors = require('cors') // 引入cors库
app.use(cors()) // 使用cors中间件

app.get('/getData', (req, res) => {
  const ls = spawn('D:/Users/liuhuanjie/Desktop/english/inter-meneange/src/user/local/bin/recovery.sh')
  // const ls = spawn('../../src/user/local/bin/recovery.sh')
  let result = ''

  ls.stdout.on('data', function (data) {
    console.log(data)
    result += data.toString()
  })

  ls.on('close', function (code) {
    console.log(`child process exited with code ${code}`)
    console.log(result)
    res.send(result)
  })
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})

// app.use((req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', '*')
//   next()
// })
