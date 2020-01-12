<template>
    <!-- 文章列表 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.title"
        />
      </van-list>
    </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  methods: {
    // 上拉刷新
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // console.log(data)
      const results = data.data.results
      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // 将新数据放到列表顶部
      const { results } = data.data
      this.list.unshift(...results)
      // 关闭下拉刷新的状态
      this.isLoading = false
      // 提示信息
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}
</script>

<style>

</style>
