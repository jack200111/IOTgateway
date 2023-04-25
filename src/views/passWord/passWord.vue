<template>
  <div class="bg">
    <div class="login">
      <div class="title">登录</div>
      <div class="input">
        <p><span>原密码: </span><input type="password" v-model="oldPassword"/></p>
        <p><span>新密码: </span><input type="password" v-model="newPassword1"/></p>
        <p><span>确认密码: </span><input type="password" v-model="newPassword2"/></p>
      </div>
      <button @click="routerLink" @keyup.enter="routerLink" class="btn btn1">登录</button>
      <button @click="clearPassword" class="btn btn2">取消</button>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import { mapState } from 'vuex'
import md5 from 'js-md5'
export default {
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: ''
    }
  },
  computed: {
    ...mapState({
      // 第一个参数是state的属性名，第二个参数是state的别名
      user: state => state.user.user,
      password: state => state.user.password,
      iniData: state => state.user.iniData
    })
  },
  async mounted () {
    if (!this.password) {
      await this.getIni()
    }
  },
  methods: {
    async routerLink () {
      // console.log(await this.getIni())
      // 刷新页面数据丢失 重新请求
      if (this.oldPassword !== this.password) {
        alert('原密码错误')
        this.clearPassword()
        return
      }
      if (this.password === this.newPassword1) {
        alert('您设置的密码与原来相同，请重新设置一个不同的密码')
        this.clearPassword()
        return
      }
      if (this.oldPassword !== this.newPassword1) {
        if (this.newPassword1.length < 6) {
          alert('请输入大于6位数新密码')
          this.clearPassword()
          return
        }
        if (this.newPassword1 !== this.newPassword2) {
          alert('两次输入的密码不一致')
          this.clearPassword()
          return
        }
        // 写入
        // console.log(this.iniData)
        // 找到当前项 修改密码
        Object.keys(this.iniData).forEach((item) => {
          if (item === this.user) {
            this.iniData[item].password = this.newPassword1
            this.iniData[item].MD5 = md5(this.newPassword1)
          }
        })
        // 写入请求
        await http.post('/loginPost', { iniData: this.iniData })
        alert('密码修改成功')
        this.clearPassword()
      }
    },
    async getIni () {
      // 请求所有账号
      const res = await http.get('/login')
      // 获取当前账号信息
      let currentObject = {}
      Object.keys(res.data).forEach((item) => {
        if (item === localStorage.getItem('user')) {
          currentObject = res.data[item]
        }
      })
      // 重新保存仓库
      this.$store.commit('changeIniData', res.data)
      this.$store.commit('changeUser', currentObject.user)
      this.$store.commit('changePassword', currentObject.password)
      return currentObject
    },
    clearPassword () {
      this.oldPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
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
