<template>
  <div id="user">
    <UserInfo :loginname="loginname"></UserInfo>
    <DetailSideBar :loginname="loginname"></DetailSideBar>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";

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
    DetailSideBar
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