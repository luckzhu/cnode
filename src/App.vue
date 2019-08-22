<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  mounted() {
    if (this._isMobile()) {
      console.log("手机端");
      this.$router.replace("/wap");
    } else {
      console.log("pc端");
      this.$router.replace("/pc");
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/css/init.scss';
@import "@/assets/css/markdown-github.scss";
body{
  background-color: #f3f3f3;
}

</style>
