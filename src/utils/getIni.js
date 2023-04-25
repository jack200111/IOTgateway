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
  // 传过来的对象的属性名
  const keyName = Object.keys(jsonData)[0]
  // 传过来的数据值
  const data = jsonData[keyName]
  // 传过来的数据
  console.log(jsonData, 'jsonData')

  if (keyName === 'iniData') {
    for (const key in data) {
      console.log(data, 'data')
      iniData += `[${key}]\nuser=${data[key].user}\npassword=${data[key].password}\nMD5=${data[key].MD5}\n`
    }
  }
  if (keyName === 'zabbixAgent') {
    iniData += `[${keyName}]\n`
    data.forEach((item) => {
      iniData += `${item.label}=${item.value}\n`
    })
  }

  // 串口
  const uarts = ['UART1', 'UART2', 'UART3', 'UART4']
  if (uarts.includes(keyName)) {
    iniData += `[${keyName}]\n`
    iniData += `NAME=${keyName}\n`
    data.forEach((item) => {
      iniData += `${item.label}=${item.selected}\n`
    })
  }

  // 无线 有限网络设置
  if (keyName === 'netconfig' || keyName === 'wificonfig') {
    iniData += `[${keyName}]\n`
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

  // 将ini文件写入文件
  console.log(iniData, 'iniData')
  fs.writeFileSync(filePath, iniData)
  // 检查：读取文件
  console.log(fs.readFileSync(filePath, 'utf-8'))
}
