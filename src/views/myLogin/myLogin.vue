<template>
  <div class="bg">
    <div class="login">
      <div class="title">登录</div>
      <div class="input">
        <p><span>用户: </span><input type="text" v-model="user"/></p>
        <p><span>密码: </span><input type="password" v-model="password" @keyup.enter="routerLink"/></p>
      </div>
      <button @click="routerLink"  class="btn btn1">登录</button>
      <button @click="closeLogin"  class="btn btn2">取消</button>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import md5 from 'js-md5'
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
      // 加密密码
      const encrypted = md5(this.password)
      const storedPassword = await this.getIni()// 请求当前账号信息
      // 第一次登录，存储加密的hash值
      if (!storedPassword.MD5) {
        // 密码错误
        if (this.password !== storedPassword.password) {
          this.alertPassWarn()
          return
        }
        // 密码正确，写入MD5，后续登录
        storedPassword.MD5 = encrypted
        await http.post('/loginPost', { iniData: this.iniData })
        router.push('/myHome/mySystem')
        alert('登录成功')
      } else {
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
    async getIni () {
      // 请求原有所有账号
      const res = await http.get('/login')
      this.iniData = res.data
      let currentObject = {}
      // 返回当前账号信息
      Object.keys(res.data).forEach((item) => {
        if (item === this.user) {
          currentObject = res.data[item]
        }
      })
      return currentObject
    },
    closeLogin () {
      //
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
