<template>
  <div>
    <Header></Header>
    <div class="main">
      <TopicList class="topocList"></TopicList>
      <div class="side">
        <Standings></Standings>
        <Noreply class="noReply"></Noreply>
      </div>
    </div>

    <!-- <el-container>
      <el-header height="72px">
        
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="480px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TopicList from "@/components/TopicList.vue";
import Standings from "@/components/Standings.vue";
import Noreply from "@/components/Noreply.vue";
export default {
  //配置移动端页面meta
  components: {
    Header,
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
  margin: 20px;

  >.side{
    display: flex;
    flex-direction: column;

    >.noReply{
      margin-top: 20px;
    }
  }
}

.topocList {
  margin-right: 20px;
}
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}


.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>