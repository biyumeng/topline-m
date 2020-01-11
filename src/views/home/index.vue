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
      <!-- 文章列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
// import { async } from 'q'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      UserChannels: [] // 用户频道列表
    }
  },
  methods: {
    // 上拉刷新
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },
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
