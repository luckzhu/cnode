<template>
  <div>
    <div class="topic">
      <Detail class="detail"></Detail>
      <div>
        <DetailSideBar :loginname="loginname" v-if="loginname"></DetailSideBar>
        <Adside></Adside>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from "@/components/Detail.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";
import topic from "@/api/topic.js";
import Adside from "@/components/Adside.vue";

export default {
  data() {
    return {
      loginname: null
    };
  },
  components: {
    Detail,
    DetailSideBar,
    Adside
  },
  created() {
    this.id = this.$route.params.id;

    topic.getTopicById({ id: this.id }).then(res => {
      this.loginname = res.data.data.author.loginname;
    });
  }
};
</script>

<style lang="scss" scoped>
.topic {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
</style>