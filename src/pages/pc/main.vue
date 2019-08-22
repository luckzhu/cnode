<template>
  <div>
    <div class="main">
      <TopicList class="topocList"></TopicList>
      <div class="side">
        <Standings></Standings>
        <Noreply class="noReply"></Noreply>
      </div>
    </div>
  </div>
</template>

<script>
import TopicList from "@/components/TopicList.vue";
import Standings from "@/components/Standings.vue";
import Noreply from "@/components/Noreply.vue";
export default {
  components: {
    TopicList,
    Standings,
    Noreply
  }
};
</script>

<style scoped lang="scss">

.main {
  display: flex;
  justify-content: center;
  margin: 0 20px;

  > .side {
    display: flex;
    flex-direction: column;

    > .noReply {
      margin-top: 20px;
    }
  }
}

.topocList {
  margin-right: 20px;
}

</style>