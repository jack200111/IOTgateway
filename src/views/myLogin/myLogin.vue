<template>
  <div class="bg">
    <div class="login">
      <div class="title">登录</div>
      <div class="input">
        <p><span>用户: </span><input type="text" v-model="user"/></p>
        <p><span>密码: </span><input type="text" v-model="password"/></p>
      </div>
      <button @click="routerLink" @keyup.enter="routerLink" class="btn btn1">登录</button>
      <button @click="closeLogin" class="btn btn2">取消</button>
    </div>
  </div>
</template>

<script>
// import router from 'vue-router'
import router from '@/router'
import md5 from 'js-md5'
// import storage from '@/utils/storage'
// import axios from 'axios'
import http from '@/utils/http'

export default {
  data () {
    return {
      user: 'admin',
      password: '',
      iniData: {
        user: '',
        password: '',
        MD5: ''
      }
    }
  },
  mounted () {

  },
  methods: {
    async routerLink () {
      // 非空校验
      if (!this.password.trim()) {
        alert('请输入密码')
        return
      }
      // 加密
      const encrypted = md5(this.password)
      // 第一次登录，存储加密的hash值
      // const storedPassword = storage.get('password')
      let storedPassword = null
      storedPassword = await this.getIni()
      // console.log(storedPassword)
      if (!storedPassword.MD5) {
        // console.log('第一次登录')
        // storage.set('password', encrypted)
        // console.log('使用密码验证')
        if (this.password !== storedPassword.password) {
          this.alertPassWarn()
          return
        }
        // 密码正确，登录并写入MD5
        storedPassword.MD5 = encrypted
        this.postIni()
        // console.log(encrypted)
        alert('首次登录成功,但未未加密,请重新登录一次为您加密')
        // router.push('/myHome/mySystem')
      } else {
        // console.log('已经加密过')
        // console.log('验证后登录')
        // 第二次登录，先判断上一次的哈希值，如果一样才登录，否则提示，并清空
        if (storedPassword.MD5 === encrypted) {
          // 密码正确，执行登录操作
          router.push('/myHome/mySystem')
          // 存到仓库
          localStorage.setItem('user', this.user)
          this.$store.state.user = this.user
          this.$store.state.password = this.password
          this.$store.state.iniData = this.iniData
          alert('登录成功')
        } else {
          // 密码错误，提示用户重新输入
          this.alertPassWarn()
        }
      }
    },
    alertPassWarn () {
      alert('密码错误')
      this.user = ''
      this.password = ''
    },
    closeLogin () {
      //
    },
    async getIni () {
      const res = await http.get('/login')
      this.iniData = res.data
      console.log(res.data)
      let currentObject = {}
      Object.keys(res.data).forEach((item) => {
        console.log(item, this.user + 1)
        if (item === this.user) {
          currentObject = res.data[item]
        }
      })
      return currentObject
    },
    async postIni () {
      const res = await http.post('/loginPost', { iniData: this.iniData })
      console.log(res)
      // this.iniData = res.data
      // Object.keys(res.data).forEach((item) => {
      //   console.log(item)
      //   if (item === this.user) {
      //     this.iniData = res.data[item]
      //     console.log(res.data[item])
      //   }
      // })
      return this.iniData
    }
  }
}
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  .login {
    width: 300px;
    height: 200px;
    .title {
      color: #0069d6;
      height: 40px;
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: 600;
    }
    .input {
      input{
        outline: none;
        height:20px;
      }
      p{
        height:40px;
        font-size: 14px;
       span {
        width: 80px;
        display: inline-block;
      }
      }
    }
    .btn{
      margin-top: 10px;
      width:80px;
      padding:8px;
      border: none;
    }
    .btn1{
      background-color: #6490aa;
      color: #fff;
      margin-right: 10px;
    }
    .btn2{
      background-color: #fff;
      color: #6490aa;
    }
  }
}
</style>
