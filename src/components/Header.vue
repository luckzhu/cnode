<template>
  <div id="header">
    <div class="topNavBar">
      <router-link to="/pc">
        <div class="logo">
          <img src="../assets/cnodejs.svg" alt="" />
        </div>
      </router-link>
      <ul>
        <li><router-link to="/pc">首页 </router-link></li>
        <li><router-link to="/pc/getstart">新手入门</router-link></li>
        <li><router-link to="/pc/api">API</router-link></li>
        <li><router-link to="/pc/reference">关于</router-link></li>
      </ul>
    </div>
    <div class="topSearch">
      <el-input
        placeholder="Search your favorite thing..."
        v-model="searchInput"
        clearable
      >
      </el-input>
    </div>
    <!-- 已登录的header右侧 -->
    <template v-if="isLogin">
      <div class="myCenter">
        <div class="avatar">
          <router-link :to="`/pc/user/${loginname}`">
            <img :src="avatar_url" alt=""
          /></router-link>
        </div>

        <!-- <my-icon name="discussion" class="icon"></my-icon> -->
        <div @click="onLogout">
          <my-icon name="logout" class="icon"></my-icon>
        </div>
      </div>
    </template>
    <!-- 未登录 -->
    <template v-if="!isLogin">
      <router-link to="/pc/login">
        <el-button type="primary">L0G IN</el-button></router-link
      >
    </template>
  </div>
</template>

<script>
import Icon from "./Icon";
import { mapGetters, mapActions } from "vuex";
import user from "@/api/user.js";
export default {
  data() {
    return {
      searchInput: "",
      avatar_url: ""
    };
  },
  computed: {
    ...mapGetters(["loginname", "isLogin"])
  },
  created() {
    if (this.isLogin && this.loginname) {
      user.getUserByName({ loginname: this.loginname }).then(res => {
        this.avatar_url = res.data.data.avatar_url;
        console.log(res);
      });
    }
  },
  updated() {
    if (this.isLogin && this.loginname) {
      user.getUserByName({ loginname: this.loginname }).then(res => {
        this.avatar_url = res.data.data.avatar_url;
        console.log(res);
      });
    }
  },
  methods: {
    ...mapActions([
      "login", // 映射为 `this.$store.dispatch('login')`
      "logout"
    ]),
    onLogout() {
      this.$confirm("确定要注销账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.logout();
          this.$message({
            type: "success",
            message: "注销成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
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
  background-color: #fff;
  > .topNavBar {
    display: flex;
    align-items: center;

    .logo {
      width: 120px;
      margin-right: -5px;
      margin-bottom: 5px;
    }
    > ul {
      display: flex;
      > li {
        margin-left: 24px;
        white-space: nowrap;
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
    .icon {
      text-align: center;
      font-size: 24px;
      width: 32px;
      height: 32px;
      margin-left: 12px;
      color: $theme-color;
      cursor: pointer;
    }
    > .avatar {
      img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 1px solid $border-color;
      }
    }
  }
}
</style>