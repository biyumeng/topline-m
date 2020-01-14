<template>
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
</template>

<script>
import { getSearch } from '@/api/search.js'

export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearch({
        page: this.page,
        per_page: this.perPage,
        q: this.q
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = false
      }
    }
  }
}
</script>

<style>

</style>
