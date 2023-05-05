// // Do something with the modified data
// // 将jsonData转换成ini文件
// let iniData = `[${[jsonData.user]}]\n`
// for (const key in jsonData) {
//   iniData += key + '=' + jsonData[key] + '\n'
// }
// // 将ini文件写入文件
// console.log(iniData)
// fs.open(loginPath, 'w', (err, fd) => {
//   if (err) throw err
//   fs.write(fd, iniData, 0, 'utf8', (err) => {
//     if (err) throw err
//     fs.close(fd, (err) => {
//       if (err) throw err
//       console.log('文件已保存')
//     })
//   })
// })

// 数据库文件
// const db = new sqlite3.Database('./test.db')
// const sql = `INSERT INTO user (username, password) VALUES ('${this.username}', '${encrypted}')`
// db.run(sql)
// db.close()

// const xhr = new XMLHttpRequest()
// xhr.open('GET', '../../../src/config/netconfig.conf', true) // 请求的URL地址
// xhr.responseType = 'text' // 返回类型为文本
// xhr.onload = function () {
//   if (xhr.status === 200) { // 成功
//     let iniData = xhr.responseText // 获取到的文本数据
//     // 处理中文字符
//     iniData = decodeURIComponent(escape(iniData))
//     // 其他处理逻辑...
//     console.log(iniData)
//   } else { // 失败
//     console.log('获取ini文件失败')
//   }
// }
// axios.post('http://localhost:3000/run-script')
//   .then(result => console.log(result, 1))
// // .then(response => response.text())
//   .catch(error => console.error(error))
// // axios.get('http://localhost:3001/getData').then(response => {
// //   console.log(response.data)
// // })
