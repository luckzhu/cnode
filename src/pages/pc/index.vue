<template>
  <div>
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

.main {
  display: flex;
  justify-content: center;
  margin: 20px;
}

</style>