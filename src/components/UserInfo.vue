<template>
  <div id="user">
    <div>
      <div class="userInfo"></div>
      <div class="recentTopics">
        <p class="tab-bar">近期发表</p>
        <div class="topic_item" v-for="topic in recentTopics" :key="topic.id">
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
              <img :src="topic.author.avatar_url" alt="" />
              <img :src="topic.author.avatar_url" alt="" />
              <img :src="topic.author.avatar_url" alt="" />
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
      </div>
      <div class="recentReplies">
        <p class="tab-bar">近期回复</p>
        <div class="topic_item" v-for="topic in recentReplies" :key="topic.id">
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
              <img :src="topic.author.avatar_url" alt="" />
              <img :src="topic.author.avatar_url" alt="" />
              <img :src="topic.author.avatar_url" alt="" />
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
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/api/user.js";
import Icon from "./Icon";
import topic from "@/api/topic.js";

export default {
  data() {
    return {
      authorInfo: null,
      score: null,
      recentTopics: [],
      recentReplies: []
    };
  },
  components: {
    "my-icon": Icon
  },
  props: {
    loginname: {
      type: String,
      required: true
    }
  },
  created() {
    this.getUserByName(this.loginname);
  },
  methods: {
    getUserByName(loginname) {
      if (this.loginname) {
        user.getUserByName({ loginname }).then(res => {
          this.authorInfo = res.data.data;
          this.score = res.data.data.score;
          console.log(2, this.authorInfo);
          this.recentTopics = res.data.data.recent_topics;
          this.getCount(this.recentTopics);
          this.recentReplies = res.data.data.recent_replies;
          this.getCount(this.recentReplies);
        });
      }
    },
    getCount(array) {
      if (array && array.length > 0) {
        array.forEach(item => {
          topic.getTopicById({ id: item.id }).then(res => {
            this.$set(item, "reply_count", res.data.data.reply_count);
            this.$set(item, "visit_count", res.data.data.visit_count);
          });
        });
      }
    }
  }
};
</script>

<style lang="scss"scoped>
@import "@/assets/css/base.scss";

.recentTopics,
.recentReplies {
  font-size: 16px;
  background-color: #fff;
  width: 690px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  > .tab-bar {
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }
  > .topic_item {
    display: flex;
    padding: 10px;
    position: relative;
    &:not(:last-child) {
      border-bottom: 1px solid #e8e8e8;
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
  }
}
</style>