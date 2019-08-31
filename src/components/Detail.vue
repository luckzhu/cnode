<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <my-loading></my-loading>
      </div>
    </transition>
    <div class="detail-container" v-if="!isLoading">
      <div id="detail" v-if="!topicDetail[0] && !authorInfo[0]">
        <h3 class="title">{{ topicDetail.title }}</h3>
        <div class="topicInfo">
          <router-link to="/pc"><span>回到主页</span></router-link>
          <span>{{ topicDetail.visit_count }} 次浏览</span>
          <span>来自 {{ topicDetail.tab }}</span>
        </div>

        <div class="topicDetail">
          <div class="avatar">
            <router-link :to="`/pc/user/${loginname}`">
              <img :src="avatar_url" alt="" />
            </router-link>
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
              <router-link :to="`/pc/user/${reply.author.loginname}`">
                <img :src="reply.author.avatar_url" alt="" />
              </router-link>

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
    </div>
  </div>
</template>

<script>
import topic from "@/api/topic.js";
import user from "@/api/user.js";
import Loading from "./Loading";
export default {
  data() {
    return {
      isLoading: true,
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
  components: {
    "my-loading": Loading
  },
  created() {
    this.id = this.$route.params.id;
    this.getTopicById(this.id).then(() => {
      this.getUserByName(this.loginname);
      this.isLoading = false;
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

.loading {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  width: 80vw;
  padding: 40px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#detail {
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 980px;
  padding: 40px;
  // margin-right: 20px;
  > .title {
    font-size: 32px;
  }
  > .topicInfo {
    font-size: 15px;
    margin-top: 12px;
    margin-bottom: 30px;
    color: $lightGray;
    span {
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
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .name {
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

@media screen and (max-width: 1060px) {
  .markdown-body {
    width: 70vw;
  }
  #detail {
    width: 80vw;
  }
}

@media screen and (max-width: 480px) {
  .markdown-body {
    width: 90vw;
  }
  #detail {
    height: 100%;
    width: 100vw;
    padding: 6%;
    font-size: 16px;

    > .title {
      font-size: 20px;
    }
    > .topicInfo {
      font-size: 13px;
      margin-top: 12px;
      margin-bottom: 15px;
      span {
        margin-right: 6px;
      }
    }

    > .topicDetail {
      > .avatar {
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
      }
      > .artical {
        > .userName {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
          > span {
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>