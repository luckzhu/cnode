<template>
  <div class="main">
    <TopicList class="topicList"></TopicList>
    <div class="side">
      <Standings class="standings"></Standings>
      <!-- <Noreply class="noReply"></Noreply> -->
      <Adside class="adside"></Adside>
    </div>
  </div>
</template>

<script>
import TopicList from "@/components/TopicList.vue";
import Standings from "@/components/Standings.vue";
import Noreply from "@/components/Noreply.vue";
import Adside from "@/components/Adside.vue";

export default {
  components: {
    TopicList,
    Standings,
    Noreply,
    Adside
  }
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;

  > .side {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    > .standings {
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 1050px) {
  .main {
    display: flex;
    justify-content: center;
    > .topicList {
      width: 80%;
    }
    > .side {
     
      > .standings {
        display: none;
      }
    }
  }
}
</style>