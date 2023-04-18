<template>
  <div class="bg">
    <div class="login">
      <div class="title">登录</div>
      <div class="input">
        <p><span>用户名: </span><input type="text" /></p>
        <p><span>密码: </span><input type="text" /></p>
      </div>
      <button @click="routerLink" class="btn">登录</button>
    </div>
  </div>
</template>

<script>
// import router from 'vue-router'
import router from '@/router'

export default {
  methods: {
    routerLink () {
      router.push('/myHome/mySystem')
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
      }
      p{
        height:40px;
       span {
        width: 80px;
        display: inline-block;
      }
      }
    }
    .btn{
      margin-top: 10px;
      background-color: #6490aa;
      color: #fff;
      width:80px;
      padding:8px;
      border: none;
    }
  }
}
</style>
