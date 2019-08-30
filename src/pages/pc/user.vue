<template>
  <div id="user">
    <UserInfo></UserInfo>
    <div class="side">
      <DetailSideBar></DetailSideBar>
      <Adside></Adside>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";
import Adside from "@/components/Adside.vue";

export default {
  components: {
    UserInfo,
    DetailSideBar,
    Adside
  }
};
</script>

<style lang="scss"scoped>
#user {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
</style>