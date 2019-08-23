<template>
  <div>
    <div id="topicList">
      <div class="theme_nav">
        <template>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="all">全部</el-menu-item>
            <el-menu-item index="good">精华</el-menu-item>
            <el-menu-item index="share">分享</el-menu-item>
            <el-menu-item index="ask">问答</el-menu-item>
            <el-menu-item index="job">招聘</el-menu-item>
          </el-menu>
        </template>
      </div>
      <div class="topic_item" v-for="topic in topicList" :key="topic.id">
        <div class="avatar">
          <router-link :to="`PC/user/${topic.author.loginname}`"
            ><img :src="topic.author.avatar_url" alt=""
          /></router-link>
        </div>
        <div class="topicInfo">
          <h3>
            <router-link :to="`/pc/detail/${topic.id}`">{{
              ellipsis(topic.title, 35)
            }}</router-link>
          </h3>
          <p>{{ topic.author.loginname }}</p>
          <div class="disscussPeople">
            <div v-for="reply in topic.replies" :key="reply.id">
              <router-link :to="`/pc/user/${reply.author.loginname}`">
                <img :src="reply.author.avatar_url" alt="" />
              </router-link>
            </div>

            <span>{{ friendlyDate(topic.last_reply_at) }}</span>
          </div>
        </div>
        <div class="replyAndVisit">
          <my-icon name="discuss1e"></my-icon>
          <span>{{ topic.reply_count }}</span>
          <my-icon name="see"></my-icon>
          <span>{{ topic.visit_count }}</span>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="27500"
        :current-page="page"
        @current-change="onPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import topic from "@/api/topic.js";
import Icon from "./Icon";
export default {
  data() {
    return {
      topicList: [],
      page: 1,
      activeIndex: "all",
      tab: "all"
    };
  },
  components: {
    "my-icon": Icon
  },
  created() {
    this.getTopics().then(() => {
      this.topicList.forEach(topic => {
        this.getTopicById(topic.id).then(res => {
          this.$set(topic, "replies", res.data.data.replies);
          if (topic.replies && topic.replies.length > 3) {
            topic.replies.splice(3);
          }
        });
      });
    });
  },
  methods: {
    getTopics() {
      this.page = parseInt(this.$route.query.page) || 1;
      return topic
        .getTopics({ page: this.page, limit: 15, tab: this.tab })
        .then(res => {
          this.topicList = res.data.data;
          this.$router.push({
            path: "/pc",
            query: { page: this.page, tab: this.tab }
          });
        });
    },
    getTopicById(id) {
      return topic.getTopicById({ id });
    },
    onPageChange(newPage) {
      topic.getTopics({ page: newPage, limit: 15, tab: this.tab }).then(res => {
        this.topicList = res.data.data;
        this.page = newPage;
        this.$router.push({
          path: "/pc",
          query: { page: this.page, tab: this.tab }
        });
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.tab = key;
      this.activeIndex = key;
      this.getTopics();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
#topicList {
  font-size: 16px;
  background-color: #fff;
  width: 690px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  > .theme_nav {
    margin-bottom: 10px;
    margin-top: -4px;
  }

  > .el-pagination {
    align-self: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  > .topic_item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    > .avatar {
      img {
        width: 80px;
        height: 80px;
        border: 1px solid $border-color;
        border-radius: 10px;
        margin-right: 15px;
      }
    }
    > .topicInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > h3 {
        font-size: 17px;
        white-space: nowrap;
        font-weight: 500;
        color: $black;
        margin-top: 6px;
      }
      p {
        color: $lightGray;
        font-size: 14px;
        margin-bottom: 4px;
      }
      > .disscussPeople {
        display: flex;
        align-items: center;
        img {
          width: 22px;
          height: 22px;
          border: 1px solid $border-color;

          border-radius: 50%;
          &:not(:first-child) {
            margin-left: -8px;
          }
        }
        > span {
          font-size: 13px;
          color: $lightestGray;
          margin-left: 4px;
        }
      }
    }

    > .replyAndVisit {
      position: absolute;
      bottom: 15px;
      right: -3px;
      display: flex;
      font-size: 13px;
      color: $lightestGray;
      height: 18px;
      > span {
        margin-right: 5px;
        margin-left: 1px;
      }
    }
  }
}
</style>