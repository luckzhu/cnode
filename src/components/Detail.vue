<template>
  <div>
    <div id="detail" v-if="!topicDetail[0]">
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
          <div
            class="markdown-body"
            id="content"
            v-html="content"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topic from "@/api/topic.js";
export default {
  data() {
    return {
      topicDetail: [],
      id: null,
      author: null,
      avatar_url: null,
      loginname: null,
      content: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getTopicById(this.id);
  },
  methods: {
    getTopicById(id) {
      topic.getTopicById({ id }).then(res => {
        this.topicDetail = res.data.data;
        this.author = res.data.data.author;
        this.avatar_url = res.data.data.author.avatar_url;
        this.loginname = res.data.data.author.loginname;
        this.content = res.data.data.content;
        console.log(this.topicDetail);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";


#detail {
  font-size: 16px;
  background-color: #fff;
  width: 980px;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  > .title {
    font-size: 32px;
  }
  > .topicInfo {
    font-size: 15px;
    margin-top: 12px;
    margin-bottom: 30px;
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
    >>>  {
      margin: 10px;
    }
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
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
}
</style>