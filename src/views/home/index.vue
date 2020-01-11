<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab
      :title="channel.name"
      v-for="channel in UserChannels"
      :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'
// import { async } from 'q'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      UserChannels: [] // 用户频道列表
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

<style>

</style>
