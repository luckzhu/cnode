<template>
  <div>
    <div id="topicList">
      <div class="theme_nav"></div>
      <div class="topic_item" v-for="topic in topicList" :key="topic.id">
        <div class="avatar">
          <img :src="topic.author.avatar_url" alt="" />
        </div>
        <div class="topicInfo">
          <h3>{{ ellipsis(topic.title) }}</h3>
          <p>{{ topic.author.loginname }}</p>
          <div class="disscussPeople">
            <img :src="topic.author.avatar_url" alt="" />
            <img :src="topic.author.avatar_url" alt="" />
            <img :src="topic.author.avatar_url" alt="" />
            <span>{{ friendlyDate(topic.last_reply_at) }}</span>
          </div>
        </div>
        <div class="replyAndVisit">
          <my-icon name="see"></my-icon>
          <span>{{ topic.reply_count }}</span>
          <my-icon name="discuss1e"></my-icon>
          <span>{{ topic.visit_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topic from "@/api/topic.js";
import axios from "axios";
import Icon from "./Icon";
export default {
  data() {
    return {
      topicList: null
    };
  },
  components: {
    "my-icon": Icon
  },
  created() {
    this.getTopics();
  },
  methods: {
    getTopics() {
      topic.getTopics().then(res => {
        this.topicList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
#topicList {
  font-size: 16px;
  background-color: #fff;
  max-width: 690px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  > .topic_item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    > .avatar {
      > img {
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
        > img {
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
          margin-left: 2px;
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