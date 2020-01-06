<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />

    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-icon name="chat-o" color="#1989fa" />
    <van-icon name="chat-o" color="#07c160" />

    <div class="title">123</div>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
  @import url("./styles/variables.less");
  .title{
    color: @color-primary;
  }
</style>
