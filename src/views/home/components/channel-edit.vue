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
      <van-cell title="推荐频道" :border="false" />

      <van-grid :gutter="10">
        <van-grid-item
            v-for="item in remainingChannels"
            :key="item.id"
            :text="item.name"
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
  computed: {
    remainingChannels () {
      const { allChannels, userChannels } = this
      //   剩余频道=所有-我的
      const channels = []
      allChannels.forEach(item => {
        //   如果我的频道中不包括遍历的频道
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      //   console.log(channels)
      return channels
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      //   console.log(data)
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style scoped>
.channel-edit{
    padding: 40px 0;
}
</style>
