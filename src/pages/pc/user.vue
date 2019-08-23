<template>
  <div id="user">
    <UserInfo :loginname="loginname"></UserInfo>
    <div class="side">
      <DetailSideBar :loginname="loginname"></DetailSideBar>
      <Adside></Adside>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";
import Adside from "@/components/Adside.vue";

export default {
  data() {
    return {
      loginname: null
    };
  },
  created() {
    this.loginname = this.$route.params.loginname;
  },
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