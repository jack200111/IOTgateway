<template>
  <div class="box">
    <!-- <h1>myHome</h1> -->
    <div class="top">
      <div class="title">瑞恩科技</div>
      <div class="middle">IOT网关</div>
      <div class="button">
        <!-- <button class="btn1">English</button> -->
        <button class="button2" @click="pushLogin">退出</button>
      </div>
    </div>
    <div class="flx">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in routerArr"
            :key="index"
            @click="changeRoute(item.meta.title)"
            :class="[!item.children&&index == ActiveIndex ? 'active li' : 'li']"
          >
            <span class="liSpan">{{ item.meta.title }}</span>
            <ul v-if="item.children&&index == ActiveIndex" class="liDiv">
              <li
                v-for="(item2, index2) in item.children"
                :key="index2"
                 @click.stop="changeChildRoute(item2.meta.title)"
                :class="[index2 == ActiveChildIndex ? 'active childrenLi' : 'childrenLi']"
              >
                 <span class="liSpan">{{ item2.meta.title }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-view />
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
      ActiveIndex: 0, // 一级高亮索引
      ActiveChildIndex: -1 // 二级高亮索引
      // showIndex: 0// 展开索引
    }
  },
  mounted () {
    // console.log(this.$route, this.routerArr)
    if (this.$route.matched.length < 3) {
      const index = this.routerArr.findIndex(
        (item) => item.meta.title === this.$route.meta.title)
      this.ActiveIndex = index
    } else {
      const ActiveIndex = this.routerArr.findIndex(
        (item) => item.name === this.$route.matched[1].name
      )
      this.ActiveIndex = ActiveIndex
      const index = this.routerArr[this.ActiveIndex].children.findIndex(
        (item) => item.meta.title === this.$route.meta.title
      )
      this.ActiveChildIndex = index
    }
  },
  computed: {
    ...mapState({
      routerArr: (state) => state.routerArr.routerArr
    })
  },
  methods: {
    // 改变高亮 跳转一级路由
    changeRoute (title) {
      // const oldIndex = this.ActiveIndex
      const index = this.routerArr.findIndex(
        (item) => item.meta.title === title
      )
      // this.showIndex = index
      this.ActiveIndex = index
      if (this.routerArr[index].children) {
        // this.showIndex = oldIndex
        this.ActiveChildIndex = -1
        return
      }
      router.push('/myHome/' + this.routerArr[index].path)
    },
    // 跳转子路由
    changeChildRoute (title) {
      const index = this.routerArr[this.ActiveIndex].children.findIndex(
        (item) => item.meta.title === title
      )
      this.ActiveChildIndex = index
      router.push('/myHome/serialPort/' + this.routerArr[this.ActiveIndex].children[this.ActiveChildIndex].path)
    },
    // 登录页
    pushLogin () {
      router.push('/myLogin')
    }
  }
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 70px;
  background-color: #6490aa;
  display: flex;
  color: #fff;
  line-height: 70px;
  .title {
    width: 200px;
    // text-align: center;
    padding-left: 30px;
    font-size: 22px;
    box-sizing: border-box;
  }
  .middle {
    flex: 1;
    font-size: 18px;
    padding-left: 30px;
  }
  .button {
    padding-right: 15px;
    button {
      width: 90px;
      height: 32px;
      background-color: #fff;
      color: #000;
      border: none;
    }
    // .button1 {
    //   margin-right: 10px;
    // }
  }
}
.flx {
  display: flex;
  .left {
    width: 200px;
    height: calc(100vh - 70px);
    background-color: #324c5d;
    color: #fff;
    ul {
      .li {
        width: 100%;
        line-height: 60px;
        box-sizing: border-box;
        .liSpan{
          padding-left: 30px;
        }
        .liDiv{
          width: 200px;
        }
      }
      .active {
        background-color: #3b5a6c;
        color: #f3ef20;
      }
    }
  }
  .right {
    width: calc(100vw - 200px);
    height: calc(100vh - 70px);
    background-color: #d6e4ed;
    padding: 5px 20px;
    box-sizing: border-box;
  }
  .childrenLi {
    list-style: none;
    padding-left: 30px;
  }
}
</style>
