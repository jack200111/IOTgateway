const fs = require('fs')
module.exports = {
  parseIni,
  jsonData
}
function parseIni (filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const result = {}
  let sectionName = null
  for (let line of lines) {
    // 去除空格
    line = line.trim()
    // 忽略注释行
    if (line.startsWith(';') || line.startsWith('#')) {
      continue
    }
    // 解析[section]
    if (line.startsWith('[')) {
      sectionName = line.slice(1, -1)
      result[sectionName] = {}
      continue
    }
    // 解析key=value
    const [key, value] = line.split('=')
    result[sectionName][key] = value
  }
  return result
}
function jsonData (filePath, jsonData) {
// 修改jsonData中的值

  let iniData = ''
  if (Object.keys(jsonData)[0] === 'iniData') {
    for (const key in jsonData) {
      iniData += `[${key}]\nuser=${jsonData[key].user}\npassword=${jsonData[key].password}\nMD5=${jsonData[key].MD5}\n`
    }
  }
  if (Object.keys(jsonData)[0] === 'zabbixAgent') {
    iniData += `[${Object.keys(jsonData)[0]}]\n`
    jsonData[Object.keys(jsonData)[0]].forEach((item) => {
      iniData += `${item.label}=${item.value}\n`
    })
  }
  const uarts = ['UART1', 'UART2', 'UART3', 'UART4']
  if (uarts.includes(Object.keys(jsonData)[0])) {
    iniData += `[${Object.keys(jsonData)[0]}]\n`
    iniData += `NAME=${Object.keys(jsonData)[0]}\n`
    jsonData[Object.keys(jsonData)[0]].forEach((item) => {
      iniData += `${item.label}=${item.selected}\n`
    })
  }

  console.log(jsonData, 'jsonData')
  if (Object.keys(jsonData)[0] === 'netconfig' || Object.keys(jsonData)[0] === 'wificonfig') {
    console.log('netconfig')
    iniData += `[${Object.keys(jsonData)[0]}]\n`
    for (const key in jsonData) {
      for (let i = 0; i < jsonData[key].length; i++) {
        const element = jsonData[key][i]
        if (Array.isArray(element.value)) {
          iniData += `${element.label}=${element.value.join(',')}\n`
        } else {
          iniData += `${element.label}=${element.value}\n`
        }
      }
    }
  }

  console.log(iniData, 'iniData')
  // 将ini文件写入文件
  fs.writeFileSync(filePath, iniData)
  const content2 = fs.readFileSync(filePath, 'utf-8')
  console.log(content2)
}
