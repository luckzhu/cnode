<template>
  <div>
    <div class="side-bar">
      <div id="detail-side-bar">
        <div class="avatar">
            <router-link :to="`/pc/user/${loginname}`">

          <img :src="authorInfo.avatar_url" alt="" />
          </router-link>

        </div>
        <p class="userName">{{ authorInfo.loginname }}</p>
        <p>积分: {{ score }}</p>
        <p class="signature">
          “这家伙很懒，什么个性签名都没有留下。”
        </p>
      </div>

      <div
        id="author-recent-topics"
        v-if="recentTopics && recentTopics.length > 0 && !isShowRecent"
      >
        <p>近期发表:</p>
        <div
          class="recent-topics"
          v-for="topic in recentTopics"
          :key="topic.id"
        >
          <router-link :to="`/pc/detail/${topic.id}`">{{
            ellipsis(topic.title, 19)
          }}</router-link>
        </div>
      </div>

      <div
        id="author-recent-replies"
        v-if="
          authorInfo.recent_replies &&
            authorInfo.recent_replies.length > 0 &&
            !isShowRecent
        "
      >
        <p>近期回复:</p>
        <div
          class="recent-topics"
          v-for="topic in authorInfo.recent_replies"
          :key="topic.id"
        >
          <router-link :to="`/pc/detail/${topic.id}`">{{
            ellipsis(topic.title, 19)
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>   

<script>
import topic from "@/api/topic.js";
import user from "@/api/user.js";
export default {
  data() {
    return {
      authorInfo: [],
      score: null,
      recentTopics: [],
      loginname: ""
    };
  },
  computed: {
    isShowRecent() {
      if (this.$route.params.loginname) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.loginname = this.$route.params.loginname;
    if (this.id) {
      this.getTopicById(this.id).then(res => {
        this.getUserByName(this.loginname);
      });
    }
    if (this.loginname) {
      this.getUserByName(this.loginname);
    }
  },
  methods: {
    getUserByName(loginname) {
      user.getUserByName({ loginname }).then(res => {
        this.authorInfo = res.data.data;
        this.score = res.data.data.score;
        this.recentTopics = res.data.data.recent_topics;
        if (this.recentTopics && this.recentTopics.length >= 5) {
          this.recentTopics.splice(5);
        }
      });
    },
    getTopicById(id) {
      return topic.getTopicById({ id }).then(res => {
        this.loginname = res.data.data.author.loginname;
      });
    }
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.loginname = this.$route.params.loginname;
      if (this.id) {
        this.getTopicById(this.id).then(res => {
          this.getUserByName(this.loginname);
        });
      }
      if (this.loginname) {
        this.getUserByName(this.loginname);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

#detail-side-bar,
#author-recent-topics,
#author-recent-replies {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}

#detail-side-bar,
#author-recent-topics,
#author-recent-replies {
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

#detail-side-bar {
  justify-content: center;
  align-items: center;
  color: #121212;
  > .avatar {
     img {
      display: block;
      width: 100px;
      height: 100px;
      border: 1px solid $border-color;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(34, 34, 34, 0.2);
    }
  }
  > .userName {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0 10px 0;
  }
  > .signature {
    margin-top: 10px;
    font-size: 15px;
    color: $lightGray;
  }
}

#author-recent-topics,
#author-recent-replies {
  > p {
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    margin-bottom: 4px;
  }
  > .recent-topics {
    &:not(:last-child) {
      margin: 6px 0;
    }
  }
}

@media screen and (max-width: 1050px) {
  .side-bar {
    display: none;
  }
}

</style>