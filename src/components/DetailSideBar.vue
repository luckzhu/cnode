<template>
  <div>
    <div id="detail-side-bar">
      <div class="avatar">
      <img src="" alt="">
      </div>
      <p class="describe">本文作者</p>
    </div>
  </div>
</template>

<script>
import user from "@/api/user.js";
export default {
  data() {
    return {
      user:null
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getTopicById(this.id);
  },
  methods: {
    getTopicById(id) {
      topic.getTopicById({ id }).then(res => {
        this.author = res.data.data.author;
        this.avatar_url = res.data.data.author.avatar_url;
        this.loginname = res.data.data.author.loginname;
        console.log(res.data.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#detail-side-bar {
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #121212;
  
}
</style>