<template>
  <div>
    <div class="detail-container">
      <div id="detail" v-if="!topicDetail[0] && !authorInfo[0]">
        <h3 class="title">{{ topicDetail.title }}</h3>
        <div class="topicInfo">
          <span>回到主页</span>
          <span>{{ topicDetail.visit_count }} 次浏览</span>
          <span>来自 {{ topicDetail.tab }}</span>
        </div>

        <div class="topicDetail">
          <div class="avatar">
            <img :src="avatar_url" alt="" />
          </div>
          <div class="artical">
            <div class="userName">
              {{ loginname }}
              <span>{{ friendlyDate(topicDetail.create_at) }}</span>
            </div>
            <div class="markdown-body" id="content" v-html="content"></div>
          </div>
        </div>

        <div v-if="replies[0]">
          <div class="comment-count">{{ replies.length }} 条评论</div>
          <div
            class="comment-container"
            v-for="(reply, index) in replies"
            :key="reply.id"
          >
            <div class="avatar-name">
              <img :src="reply.author.avatar_url" alt="" />
              <p class="name">{{ reply.author.loginname }}</p>
              <div class="comment-info">
                <span>{{ index + 1 }}楼</span>
                <span>{{ friendlyDate(reply.create_at) }}</span>
                <span v-if="reply.ups.length">{{ reply.ups.length }}点赞</span>
              </div>
            </div>
            <p class="comment" id="content" v-html="reply.content"></p>
          </div>
        </div>
      </div>

      <div class="side-bar">
        <div id="detail-side-bar">
          <div class="avatar">
            <img :src="avatar_url" alt="" />
          </div>
          <p class="userName">{{ loginname }}</p>
          <p>积分: {{ score }}</p>
          <p class="signature">
            “这家伙很懒，什么个性签名都没有留下。”
          </p>
        </div>

        <div
          id="author-recent-topics"
          v-if="recentTopics && recentTopics.length > 0"
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
            authorInfo.recent_replies && authorInfo.recent_replies.length > 0
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
  </div>
</template>

<script>
import topic from "@/api/topic.js";
import user from "@/api/user.js";
export default {
  data() {
    return {
      topicDetail: [],
      id: null,
      author: null,
      avatar_url: null,
      loginname: null,
      content: null,
      replies: [],
      authorInfo: [],
      score: null,
      recentTopics: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getTopicById(this.id).then(() => {
      this.getUserByName(this.loginname);
    });
  },
  methods: {
    getTopicById(id) {
      return topic.getTopicById({ id }).then(res => {
        this.topicDetail = res.data.data;
        this.author = res.data.data.author;
        this.avatar_url = res.data.data.author.avatar_url;
        this.loginname = res.data.data.author.loginname;
        this.content = res.data.data.content;
        this.replies = res.data.data.replies;
      });
    },
    getUserByName(loginname) {
      if (this.loginname) {
        user.getUserByName({ loginname }).then(res => {
          this.authorInfo = res.data.data;
          this.score = res.data.data.score;
          console.log(1, this.authorInfo);
          this.recentTopics = res.data.data.recent_topics;
          if (this.recentTopics && this.recentTopics.length >= 5) {
            this.recentTopics.splice(5);
          }
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.getTopicById(this.id).then(() => {
        this.getUserByName(this.loginname);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.detail-container {
  display: flex;
  justify-content: center;
}

#detail,
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
#detail {
  width: 980px;
  padding: 40px;
  margin-right: 20px;
  > .title {
    font-size: 32px;
  }
  > .topicInfo {
    font-size: 15px;
    margin-top: 12px;
    margin-bottom: 30px;
    color: $lightGray;
    > span {
      margin-right: 6px;
    }
  }

  > .topicDetail {
    display: flex;
    > .avatar {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    > .artical {
      display: flex;
      flex-direction: column;
      > .userName {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        > span {
          font-size: 14px;
          font-weight: normal;
          color: $lightestGray;
        }
      }
    }
  }

  .markdown-text {
    >>> {
      margin: 10px;
    }
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 890px;
    margin: 0 auto;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 10px;
    }
  }
  .markdown-body img {
    width: 92% !important;
  }
  .comment-count {
    font-size: 20px;
    font-weight: 700;
    color: $gray;
    margin: 30px 0;
  }
  .comment-container {
    margin-top: 20px;
    &:not(:last-child) {
      margin-bottom: 10px;
      border-bottom: 1px solid $border-color;
    }

    > .avatar-name {
      display: flex;
      align-items: flex-end;
      > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      > .name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 12px;
        margin-bottom: 16px;
      }

      > .comment-info {
        font-size: 14px;
        color: $lightestGray;
        display: flex;
        align-items: center;
        letter-spacing: 1px;
        margin-bottom: 16px;
        > span {
          margin-right: 4px;
        }
      }
    }

    .comment {
      margin-left: 50px;
      margin-top: -10px;
    }
  }
}

#detail-side-bar,
#author-recent-topics,
#author-recent-replies {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
}

#detail-side-bar {
  justify-content: center;
  align-items: center;
  color: #121212;
  > .avatar {
    > img {
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
</style>