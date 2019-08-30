<template>
  <div class="loginWrapper">
    <div id="login">
      <label for=""
        >请输入您的<span> Access Token</span>，来登陆CNode社区</label
      >
      <div class="tokenInput">
        <el-input
          placeholder="请输入Token"
          v-model="token"
          show-password
        ></el-input>
      </div>
      <el-button type="primary" @click="onLogin">确认登陆</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      token: ""
    };
  },
  computed: {
    ...mapGetters(["loginname", "isLogin"])
  },
  methods: {
    ...mapActions([
      "login", // 映射为 `this.$store.dispatch('login')`
      "logout"
    ]),
    onLogin() {
      this.login({ accesstoken: this.token }).then(res => {
        this.$router.push({ path: this.$route.query.redirect || "/pc" });
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/base.scss";
.loginWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#login {
  font-size: 16px;
  background-color: #fff;
  width: 690px;
  height: 500px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  > label {
    > span {
      font-weight: bold;
      color: $theme-color;
    }
  }
  > .tokenInput {
    width: 500px;
    margin: 20px 0;
  }
}

@media screen and (max-width: 480px) {
  #login {
    height: 100%;
    width: 100vw;
    margin: 2%;

    > .tokenInput {
      width: 80%;
      margin: 20px 0;
    }
  }
}
</style>