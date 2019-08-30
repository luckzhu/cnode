<template>
  <div class="container">
    <Header id="header"></Header>
    <div class="main">
      <router-view> </router-view>
    </div>
    <Footer id="footer_main"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped lang="scss">
#header{
  margin-bottom: 20px;
}
#footer_main{
  margin-top: 20px;
}

@media screen and (max-width: 960px) {
  .main {
  
    // flex: 1;
  }
}
</style>