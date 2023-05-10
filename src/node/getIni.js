// server.js
// 转INI
const { parseIni } = require('../../src/utils/getIni')
// 转JSON
const { jsonData } = require('../../src/utils/getIni')
// node请求
const express = require('express')
const app = express()
// 解决跨域
const cors = require('cors')
// 请求sh
const { exec } = require('child_process')
// post接收请求参数
const bodyParser = require('body-parser')
// 解决JSON
app.use(bodyParser.json())

const sysinfo = '/config/sysinfo.conf'
const login = '/config/login.ini'
const netconfig = '/config/netconfig.conf'
const wificonfig = '/config/wificonfig.conf'
const uart1 = '/config/uart1.ini'
const uart2 = '/config/uart2.ini'
const uart3 = '/config/uart3.ini'
const uart4 = '/config/uart4.ini'
const zabbixAgent = '/config/zabbix_agent.conf'
const pathAll = '/config/pathAll.ini'
const setPassword = '/config/setPassword.ini'
app.use(cors())
// 解析URL编码数据 qs库来解析
app.use(express.urlencoded({ extended: true }))

// 请求Ini方法
function getData (getUrl, IniUrl) {
  app.get(getUrl, (req, res) => {
    const ini = parseIni(IniUrl)
    res.json(ini)
  })
}

// 定义接口
getData('/pathAll', pathAll)
getData('/login', login)
getData('/sysinfo', sysinfo)
getData('/netconfig', netconfig)
getData('/wificonfig', wificonfig)
getData('/uart1', uart1)
getData('/uart2', uart2)
getData('/uart3', uart3)
getData('/uart4', uart4)
getData('/zabbixAgent', zabbixAgent)
getData('/setPassword', setPassword)

getData('/getTmp', '/tmp/iwscan.tmp')

// 写入Ini方法
function postData (postUrl, IniUrl) {
  app.post(postUrl, (req, res) => {
    const reqData = req.body
    // console.log(reqData)
    jsonData(IniUrl, req.body)
    res.json(reqData)
  })
}
postData('/login', login)
postData('/netconfig', netconfig)
postData('/wificonfig', wificonfig)
postData('/uart1', uart1)
postData('/uart2', uart2)
postData('/uart3', uart3)
postData('/uart4', uart4)
postData('/zabbixAgent', zabbixAgent)
postData('/setPassword', setPassword)

postData('/sysinfoPost', '/tmp/iwscan.tmp')

// 请求sh
app.post('/postSh', (req, res) => {
  // console.log(req.body.value)
  exec(req.body.value, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(error.message)
      return
    }
    res.send(stdout)
  })
})

// 启动服务器
const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
