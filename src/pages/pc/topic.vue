<template>
  <div>
    <div class="topic">
      <Detail class="detail"></Detail>
    </div>
  </div>
</template>

<script>
import Detail from "@/components/Detail.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";
export default {
  components: {
    Detail,
    DetailSideBar
  }
};
</script>

<style lang="scss" scoped>
.topic {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
</style>