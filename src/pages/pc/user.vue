<template>
  <div id="user">
    <UserInfo :loginname="loginname"></UserInfo>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
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
    UserInfo
  }
};
</script>

<style lang="scss"scoped>
</style>