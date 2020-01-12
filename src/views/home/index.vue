<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed ></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon @click="isChannelEditShow=true" class="wap-nav" slot="nav-right" name="wap-nav"></van-icon>
      <van-tab
      :title="channel.name"
      v-for="channel in UserChannels"
      :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>

    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
// import { async } from 'q'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      UserChannels: [], // 用户频道列表
      isChannelEditShow: false // 控制频道编辑弹窗是否开启 默认是false
    }
  },
  methods: {
    // 显示用户列表
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.UserChannels = data.data.channels
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-top: 90px;
  padding-bottom: 50px;
  .wap-nav{
    position: fixed;
    right: 0;
    line-height: 44px;
    background-color: #fff;
  }
}
  ::v-deep .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 2;
  }
</style>
