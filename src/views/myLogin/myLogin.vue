<template>
  <div class="bg" id="">
    <div class="login">
      <div class="title">XX智慧物联IOT网关</div>
      <!-- 账号 -->
      <p>
        <span><img class="icon" src="@/assets/image/user.png" alt=""></span>
        <img class="shuxian" src="@/assets/image/shuxian.png" alt="">
        <input type="text" v-model="user"/>
      </p>
      <!-- 密码 -->
      <p>
        <span> <img class="icon2" src="@/assets/image/suo.png" alt=""></span>
        <img class="shuxian" src="@/assets/image/shuxian.png" alt="">
        <input type="password" v-model="password" @keyup.enter="routerLink"/>
      </p>
      <button @click="routerLink"  class="btn btn1">登录</button>
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
      imgWidth: 500,
      imgHeight: 768,
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
        await http.post('/login', { iniData: this.iniData })
        router.push('/myHome/sysinfo')
        alert('登录成功')
      } else {
        // 第二次登录，先判断上一次的哈希值，如果一样才登录，否则提示，并清空
        if (storedPassword.MD5 === encrypted) {
          // 密码正确，执行登录操作
          router.push('/myHome/sysinfo')
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
.bg{
  float:right ;
  position: absolute;
  // z-index: -1;
  // background-image: url('@/assets/image/IOT.jpg');
  background-image: url('@/assets/image/1683689877641.jpg');
  background-size: cover; /* 设置为 cover 或者 contain */
  background-position: center;
}
.bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  .login {
    width: 500px;
    .title {
      color: #333333;
      height: 45px;
      margin-bottom: 30px;
      font-size: 32px;
      font-weight: 600;
      text-align: center;
    }
    // .input {
      p{
        // height:40px;
        height:80px;
        font-size: 24px;
        display: flex;
        margin-bottom: 18px;
        opacity: 60%;
        border: 1px solid #065E9C;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #fff;
        line-height: 80px ;
        display: flex;
        align-items: center;
        span{
          width: 75px;
          // height: 80px;
          // line-height: 80px ;
          display: flex;
          justify-content: center;
          align-content: center;
        }
        .icon {
          width: 31px;
        }
        .icon2{
          width: 26px;
        }
        input{
          border: none;
          outline: none;
          flex: 1;
          text-indent: 1em;
          font-size: 24px;
          color: #333333;
          height: 60px;
        }
      }
    // }
    .btn{
      margin-top: 14px;
      width: 100%;
      border-radius: 5px;
      border: none;
      height: 70px;
      font-size: 32px;
      font-weight: bold;
    }
    .btn1{
      background-color: #005CAA;
      color: #fff;
      // margin-right: 10px;
    }
  }
}
.remember {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666666;
  span {
    display: flex;
    align-items: center;
    color: #333;
  }
  input{
    width: 30px;
  }
}
</style>
