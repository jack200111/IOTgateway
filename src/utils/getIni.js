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
  // 传过来的对象的title
  const title = Object.keys(jsonData)[1]
  // 传过来的数据值
  const data = jsonData[keyName]
  // 传过来的数据
  console.log(jsonData, 'jsonData')

  // 对象
  if (keyName === 'iniData') {
    for (const key in data) {
      console.log(data, 'data')
      iniData += `[${key}]\nuser=${data[key].user}\npassword=${data[key].password}\nMD5=${data[key].MD5}\n`
    }
  }

  // 串口 // 无线 有限网络设置
  const uarts = [
    'UART1',
    'UART2',
    'UART3',
    'UART4',
    'zabbixAgent',
    'netconfig',
    'wificonfig',
    'setPassword'
  ]
  if (uarts.includes(keyName)) {
    iniData += `[${jsonData[title]}]\n`
    // iniData += `NAME=${keyName}\n`
    data.forEach((item) => {
      // iniData += `${item.prop}=${item.selected}\n`
      const valueArr = item.value
      // 特殊情况
      if (item.type === 'select' && item.prop === '工作方式') {
        iniData += `${item.prop}=${item.type},${
          valueArr[0].selected
        },${valueArr[0].value.join(',')},${
          valueArr[1].selected
        },${valueArr[1].value.join(',')},${valueArr[1].slot}\n`
      } else if (item.type === 'select') { // 下拉框
        iniData += `${item.prop}=${item.type},${
          item.selected
        },${item.value.join(',')},${item.slot}\n`
      } else {
        iniData += `${item.prop}=${item.type},${item.value},${item.slot}\n`
      }
    })
  }

  // 将ini文件写入文件
  console.log(iniData, 'iniData')
  console.log(filePath, 'filePath')
  fs.writeFileSync(filePath, iniData)
  // 检查：读取文件
  console.log(fs.readFileSync(filePath, 'utf-8'))
}
