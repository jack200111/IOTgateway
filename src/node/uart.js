// node/recovery.js
// mySystem
const { exec } = require('child_process')
const express = require('express')
const app = express()
const cors = require('cors') // 引入cors库
app.use(cors()) // 使用cors中间件

app.post('/run-script', (req, res) => {
  exec(
    'D:/Users/liuhuanjie/Desktop/english/inter-meneange/src/user/local/bin/uart2save.sh',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error: ${error}`)
        res.status(500).send(error.message)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`error: ${stderr}`)
      res.send(stdout)
    }
  )
  //  /config/uart2.ini
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})