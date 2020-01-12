<template>
  <div class="channel-edit">
      <!-- 我的频道 -->
      <van-cell title="我的频道" :border="false">
          <van-button size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
            v-for="item in userChannels"
            :key="item.id"
            :text="item.name"
        />
      </van-grid>

      <!-- 推荐频道 -->
      <van-cell title="推荐频道" :border="false">
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
            v-for="value in 8"
            :key="value"
            text="文字"
        />
      </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channle.js'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
    }
  }
}
</script>

<style scoped>
.channel-edit{
    padding: 40px 0;
}
</style>
