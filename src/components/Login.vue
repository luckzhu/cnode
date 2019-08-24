<template>
  <div>
    <div id="login">
      <label for="">请输入您的Access Token，来登陆CNode社区</label>
      <div class="tokenInput">
        <el-input
          placeholder="请输入Token"
          v-model="token"
          show-password
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: ""
    };
  }
};
</script>

<style lang="scss">
#login {
  font-size: 16px;
  background-color: #fff;
  width: 690px;
  height: 500px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  >.tokenInput{
    width: 500px;
 
    margin: 20px 0;
  }
}
</style>