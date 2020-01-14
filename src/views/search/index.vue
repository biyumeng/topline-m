<template>
  <div class="search-container">
      <!-- 搜索栏 -->
      <form class="search-form" action="/">
        <van-search
            v-model="searchText"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @cancel="$router.back()"
            @focus="isResultShow=false"
            @input="onSearchInput"
        />
      </form>

      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :q="searchText" />

      <!-- 联系建议 -->
      <van-cell-group v-else-if="searchText">
        <van-cell
        icon="search"
        v-for="(item,index) in suggestions"
        :key="index"
        @click="onSuggesttionClick(item)"
        >
            <div slot="title" v-html="highlight(item)"></div>
        </van-cell>
      </van-cell-group>

      <!-- 历史记录 -->
      <van-cell-group v-else>
        <van-cell title="历史记录">
            <van-icon name="delete"></van-icon>
            <span>全部删除</span>
            &nbsp;&nbsp;
            <span>完成</span>
        </van-cell>
        <van-cell
        :title="item"
        v-for="(item,index) in searchHistories"
        :key="index"
        >
            <van-icon name="close"></van-icon>
        </van-cell>
      </van-cell-group>

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search.js'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制是否显示搜索结果
      suggestions: [], // 存储联想建议
      searchHistories: getItem('search-histories') || [] // 搜索历史记录
    }
  },
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  },
  methods: {
    // 打开搜索结果
    onSearch () {
      // 记录搜索历史记录
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
      this.isResultShow = true
    },
    // 获得联想建议
    async onSearchInput () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      this.suggestions = data.data.options
    },
    highlight (str) {
      return str.toLowerCase().replace(this.searchText.toLowerCase(), `<span style="color:red;">${this.searchText}</span>`)
    },
    onSuggesttionClick (item) {
      this.searchText = item
      this.isResultShow = true
    }
  }
}
</script>

<style scoped lang="less">
    .search-container{
        padding-top: 54px;
        .search-form{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }
    }
</style>
