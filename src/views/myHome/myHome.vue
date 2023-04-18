<template>
  <div class="box">
    <!-- <h1>myHome</h1> -->
    <div class="top">
      <div class="title">Z Q W L 智嵌物联</div>
      <div class="middle">Smart网关 参数配置 v1.0.10</div>
      <div class="btn">
        <button class="btn1">English</button>
        <button class="btn2">重启</button>
      </div>
    </div>
    <div class="flx">
      <div class="left">
        <ul>
          <li v-for="(item,index) in routerArr" :key="index" @click="changeRoute(item.meta.title)" :class="[index==ActiveIndex?'active':'']">{{ item.meta.title }}</li>
        </ul>
      </div>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '@/router'

export default {
  data () {
    return {
      ActiveIndex: 0
    }
  },
  computed: {
    ...mapState({
      routerArr: state => state.routerArr.routerArr
    })
  },
  methods: {
    changeRoute (title) {
      const index = this.routerArr.findIndex((item) => item.meta.title === title)
      this.ActiveIndex = index
      router.push(this.routerArr[index].path)
    }
  }
}
</script>

<style scoped lang="scss">
.top{
  width: 100%;
  height: 70px;
  background-color:#6490aa;
  display: flex;
  color: #fff;
  line-height: 70px;
  .title{
    width:200px;
    text-align: center;
    font-size: 20px;
  }
  .middle{
    flex: 1;
    font-size: 17px;
    margin-left:5px;
  }
  .btn{
    width:220px;
    button{
      width:100px;
      height: 32px;
      background-color: #fff;
      color: #000;
      border: none;
    }
    .btn1{
      margin-right: 10px;
    }
  }
}
.flx{
  display: flex;
  .left{
  width: 200px;
  height: calc(100vh - 70px);
  background-color: #324c5d;
  color: #fff;
  ul{
    li{
      width: 100%;
      height: 60px;
      padding-left: 30px;
      line-height: 60px;
    }
    // :hover{
    //   background-color: #3b5a6c;
    //   color: #f3ef20;
    // }
    .active{
      background-color: #3b5a6c;
      color: #f3ef20;
    }
  }
}
.right{
  width: calc(100vw - 200px);
  height: calc(100vh - 70px);
  background-color: #5694be;
}
}

</style>
