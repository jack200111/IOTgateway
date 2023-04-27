// server.js
const { parseIni } = require('../../src/utils/getIni')
const { jsonData } = require('../../src/utils/getIni')
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const { exec } = require('child_process')

const systemPath = '/config/sysinfo.conf'
const loginPath = '/config/login.ini'
const networkPath = '/config/netconfig.conf'
const wificonfigPath = '/config/wificonfig.conf'
const serialPort1 = '/config/uart1.ini'
const serialPort2 = '/config/uart2.ini'
const serialPort3 = '/config/uart3.ini'
const serialPort4 = '/config/uart4.ini'
const zabbixAgent = '/config/zabbix_agent.conf'
const recoverySh = '/user/local/bin/recovery.sh'
const pathAll = '/config/pathAll.ini'
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

// 请求Ini方法
function getData (getUrl, IniUrl) {
  app.get(getUrl, (req, res) => {
    const ini = parseIni(IniUrl)
    res.json(ini)
  })
}

// 定义接口
getData('/pathAll', pathAll)
getData('/login', loginPath)
getData('/mySystem', systemPath)
getData('/myNetwork', networkPath)
getData('/wificonfig', wificonfigPath)
getData('/serialPort1', serialPort1)
getData('/serialPort2', serialPort2)
getData('/serialPort3', serialPort3)
getData('/serialPort4', serialPort4)
getData('/zabbixAgent', zabbixAgent)
getData('/serialPort4', serialPort4)

// 写入Ini方法
function postData (postUrl, IniUrl) {
  app.post(postUrl, (req, res) => {
    const reqData = req.body
    console.log(reqData)
    jsonData(IniUrl, req.body)
    res.json(reqData)
  })
}
postData('/saveNetconfig', loginPath)
postData('/loginPost', networkPath)
postData('/netconfigPost', wificonfigPath)
postData('/wificonfigPath', wificonfigPath)
postData('/serialPost1', serialPort1)
postData('/serialPost2', serialPort2)
postData('/serialPost3', serialPort3)
postData('/serialPost4', serialPort4)
postData('/zabbixAgentPost', zabbixAgent)
postData('/systemPathPost', systemPath)

app.get('/read_scan_results', (req, res) => {
  fs.readFile('../../tmp/iwscan.tmp', 'utf8', (err, data) => {
    // 读取iwscan.tmp文件内容
    if (err) throw err
    res.send(data) // 发送响应，将文件内容作为响应体发送回客户端
  })
})

app.get('/recoverySh', (req, res) => {
  exec(recoverySh, (error, stdout, stderr) => {
    if (error) {
      // console.log(`exec error: ${error}`)
      res.status(500).send(error.message)
      return
    }
    // console.log(`stdout: ${stdout}`)
    // console.error(`error: ${stderr}`)
    res.send(stdout)
  })
})

// 启动服务器
const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
