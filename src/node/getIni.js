// server.js
const { parseIni } = require('../../src/utils/getIni')
const { jsonData } = require('../../src/utils/getIni')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs')
// const ini = require('ini')
const { exec } = require('child_process')
// const filePath = path.resolve(__dirname) + '/config.ini'
const systemPath = path.join(path.resolve(__dirname), '../config/sysinfo.conf')
const loginPath = path.join(path.resolve(__dirname), '../config/login.ini')
const networkPath = path.join(path.resolve(__dirname), '../config/netconfig.conf')
const wificonfigPath = path.join(path.resolve(__dirname), '../config/wificonfig.conf')
const serialPort1 = path.join(path.resolve(__dirname), '../config/uart1.ini')
const serialPort2 = path.join(path.resolve(__dirname), '../config/uart2.ini')
const serialPort3 = path.join(path.resolve(__dirname), '../config/uart3.ini')
const serialPort4 = path.join(path.resolve(__dirname), '../config/uart4.ini')
const zabbixAgent = path.join(path.resolve(__dirname), '../config/zabbix_agent.conf')
// 'D:/Users/liuhuanjie/Desktop/english/inter-meneange/src/user/local/bin/'
const bodyParser = require('body-parser')
const netconfigPath = path.join(path.resolve(__dirname), '../user/local/bin/test1/netconfig.sh')
app.use(cors())
app.use(bodyParser.json())

// 定义接口
app.get('/data', (req, res) => {
  // const data = {
  //   message: 'Hello World!'
  // }
  const ini = parseIni(systemPath)
  res.json(ini)
})
app.get('/login', (req, res) => {
  const ini = parseIni(loginPath)
  // const str = fs.readFileSync(loginPath).toString()
  // const iniData = ini.parse(str)
  res.json(ini)
})

app.get('/mySystem', (req, res) => {
  const ini = parseIni(systemPath)
  res.json(ini)
})
app.get('/myNetwork', (req, res) => {
  const ini = parseIni(networkPath)
  res.json(ini)
})
app.get('/wificonfig', (req, res) => {
  const ini = parseIni(wificonfigPath)
  res.json(ini)
})
app.get('/serialPort1', (req, res) => {
  const ini = parseIni(serialPort1)
  res.json(ini)
})
app.get('/serialPort2', (req, res) => {
  const ini = parseIni(serialPort2)
  res.json(ini)
})
app.get('/serialPort3', (req, res) => {
  const ini = parseIni(serialPort3)
  res.json(ini)
})
app.get('/serialPort4', (req, res) => {
  const ini = parseIni(serialPort4)
  res.json(ini)
})

app.get('/zabbixAgent', (req, res) => {
  const ini = parseIni(zabbixAgent)
  res.json(ini)
})
app.get('/read_scan_results', (req, res) => {
  fs.readFile('../../src/tmp/iwscan.tmp', 'utf8', (err, data) => {
    // 读取iwscan.tmp文件内容
    if (err) throw err
    res.send(data) // 发送响应，将文件内容作为响应体发送回客户端
  })
})

app.get('/netconfig', (req, res) => {
  const result = exec(netconfigPath,
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
  console.log(result)
})
// 接收修改后的数据
app.post('/saveNetconfig', (req, res) => {
  const modifiedData = req.body
  console.log(req.body)
  // jsonData(netconfigPath, req.body)
  // Do something with the modified data
  res.json(modifiedData)
})
// console.log(jsonData)
app.post('/loginPost', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(loginPath, req.body)
  res.json(reqData)
})
app.post('/netconfigPost', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(networkPath, req.body)
  res.json(reqData)
})
app.post('/wificonfigPath', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(wificonfigPath, req.body)
  res.json(reqData)
})
app.post('/serialPost1', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(serialPort1, req.body)
  res.json(reqData)
})
app.post('/serialPost2', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(serialPort2, req.body)
  res.json(reqData)
})
app.post('/serialPost3', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(serialPort3, req.body)
  res.json(reqData)
})
app.post('/serialPost4', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(serialPort4, req.body)
  res.json(reqData)
})

app.post('/zabbixAgentPost', (req, res) => {
  const reqData = req.body
  console.log(reqData)
  jsonData(zabbixAgent, req.body)
  res.json(reqData)
})

// 接收修改后的数据
// app.post('/data', (req, res) => {
//   const modifiedData = req.body
//   console.log(req.body)
//   // Do something with the modified data
//   res.json(modifiedData)
// })

// 启动服务器
const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
