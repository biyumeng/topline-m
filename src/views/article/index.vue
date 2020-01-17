<template>
    <div class="article-container">文章详情页</div>
</template>

<script>
export default {
  name: 'ArticlePage',
  components: {},
  props: {
    // 路由参数
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>

</style>
