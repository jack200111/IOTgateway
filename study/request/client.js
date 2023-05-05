//  post () {
// client.js
const axios = require('axios')
axios
  .get('http://localhost:3003/data')
  .then(function (response) {
    // 修改原有的数据
    console.log(response.data)
    response.data.message = 'Hello Universe!'
    // console.log(response.data)
    return response
  })
  .then(function (response) {
    console.log(response.data)
    // 将修改后的数据发送回服务器
    axios
      .post('http://localhost:3003/data', response.data)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
  .catch(function (error) {
    console.log(error)
  })
// }
