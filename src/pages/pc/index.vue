<template>
  <div>
    <Header></Header>
    <div class="main">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  //配置移动端页面meta
  components: {
    Header
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