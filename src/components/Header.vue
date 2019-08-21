<template>
  <div id="header">
    <div class="topNavBar">
      <my-icon name="js" class="logo"></my-icon>
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
      </ul>
    </div>
    <div class="topSearch">
      <el-input placeholder="Search..." v-model="searchInput" clearable>
      </el-input>
    </div>
    <!-- 已登录的header右侧 -->
    <template v-if="isLogin">
      <div class="myCenter">
        <my-icon name="discussion" class="icon"></my-icon>
        <my-icon name="note" class="icon"></my-icon>
        <div class="avatar">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </div>
    </template>
    <!-- 未登录 -->
    <template v-if="!isLogin"> </template>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  data() {
    return {
      isLogin: true,
      searchInput: ""
    };
  },
  components: {
    "my-icon": Icon
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
#header {
  color: $black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  height: 36px;
  padding: 16px 72px;
  border-bottom: 1px solid $border-color;
  > .topNavBar {
    display: flex;
    align-items: center;

    > .logo {
      font-size: 28px;
    }
    > ul {
      display: flex;
      > li {
        margin-left: 24px;
        white-space:nowrap; 
      }
    }
  }
  > .topSearch {
    width: 600px;
    margin: 0 72px;
   
  }
  > .myCenter {
    display: flex;
    vertical-align: center;

    > .icon {
      text-align: center;
      font-size: 24px;
      width: 32px;
      height: 32px;
      margin-right: 15px;
      color: $black;
    }
    > .avatar {
      > img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid $border-color;
      }
    }
  }
}


</style>