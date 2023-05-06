<template>
  <div class="bg">
    <!-- <div class="login">
      <div class="title">密码修改</div>
      <div class="input">
        <p><span>原密码: </span><input type="password" v-model="oldPassword"/></p>
        <p><span>新密码: </span><input type="password" v-model="newPassword1"/></p>
        <p><span>确认密码: </span><input type="password" v-model="newPassword2"/></p>
      </div>
      <button @click="changePassword" @keyup.enter="changePassword" class="btn btn1">登录</button>
      <button @click="clearPassword" class="btn btn2">取消</button>
    </div> -->
     <div>
    <div class="display">
      <div class="left">
        <h1>{{ title }}</h1>
        <div class="content">
          <span v-for="(item, index) in setPassword" :key="index">
            <p v-if="item.type !== 'button' && item.prop !== 'IP类型'">
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <span class="prop">{{ item.prop }}:</span>
                <input type="password" v-model="item.value" @keyup.enter="changePassword"/>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
            </p>
          </span>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <span v-for="item in setPassword" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="getSh(item.value, item)" >
          {{ item.prop }}
        </button>
      </template>
    </span>
  </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import { mapState } from 'vuex'
import md5 from 'js-md5'
import myMixin from '@/mixin/getIniData'
export default {
  mixins: [myMixin],
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      title: '',
      setPassword: [],
      refreshPassword: ''
    }
  },
  computed: {
    // 登录后存在仓库
    ...mapState({
      // 第一个参数是state的属性名，第二个参数是state的别名
      user: state => state.user.user,
      password: state => state.user.password,
      iniData: state => state.user.iniData
    })
  },
  async mounted () {
    // 动态页面数据
    this.fetchData('setPassword')
    // 页面刷新 重新请求丢失数据
    if (!this.password) {
      const res = await this.getIni()
      this.refreshPassword = res.password
    }
  },
  methods: {
    // 密码修改
    async changePassword () {
      // 进行密码赋值
      this.oldPassword = this.setPassword[0].value
      this.newPassword1 = this.setPassword[1].value
      this.newPassword2 = this.setPassword[2].value
      // 刷新页面数据丢失 重新请求
      // 原密码判断
      console.log(this.oldPassword, 'oldPassword')
      console.log(this.refreshPassword, 'refreshPassword')
      if (this.oldPassword !== this.refreshPassword) {
        alert('原密码错误')
        this.setPassword[0].value = ''
        this.clearPassword()
        return
      }
      // 新旧密码判断
      if (this.refreshPassword === this.newPassword1) {
        alert('您设置的密码与原来相同，请重新设置一个不同的密码')
        this.clearPassword()
        return
      }
      // 两次密码判断
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
        // 找到当前项 修改密码
        Object.keys(this.iniData).forEach((item) => {
          if (item === this.user) {
            this.iniData[item].password = this.newPassword1
            this.iniData[item].MD5 = md5(this.newPassword1)
          }
        })
        // 写入请求
        await http.post('/login', { iniData: this.iniData })
        // 仓库密码修改
        this.$store.commit('changePassword', this.newPassword1)
        // 用于判断的原密码修改
        this.refreshPassword = this.newPassword1
        // 初始化
        this.setPassword[0].value = ''
        this.clearPassword()
        alert('密码修改成功')
        // 写入动态页面
        // http.post('/setPassword', { setPassword: this.setPassword, title: this.title })
      }
    },
    // 页面刷新 重新请求
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
    // 清空密码
    // clearPassword2 () {
    //   // this.oldPassword = ''
    //   // this.newPassword1 = ''
    //   // this.newPassword2 = ''
    //   this.setPassword[0].value = ''
    //   this.setPassword[1].value = ''
    //   this.setPassword[2].value = ''
    // },
    clearPassword () {
      this.setPassword[1].value = ''
      this.setPassword[2].value = ''
    },
    // 动态页面数据
    fetchData (val) {
      http.get('/' + val).then((res) => {
        // 标题
        this.title = Object.keys(res.data)[0]
        // 对象数据
        const data = res.data[Object.keys(res.data)]
        // item:中文键名
        Object.keys(data).forEach((item) => {
          const valueArr = data[item].split(',')
          // 静态文本 按钮
          this[val].push({
            prop: item,
            value: valueArr[1],
            type: valueArr[0],
            slot: valueArr[2] && valueArr[2]
          })
        })
      })
    },
    getSh (value, item) {
      // 请求sh
      // 密码修改
      this.changePassword()
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
