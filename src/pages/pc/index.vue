<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <router-view> </router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  //配置移动端页面meta
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main {
  display: flex;
  justify-content: center;
  margin: 20px;
  flex: 1;
}
</style>