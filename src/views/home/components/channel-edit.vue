<template>
  <div class="channel-edit">
      <!-- 我的频道 -->
      <van-cell title="我的频道" :border="false">
          <van-button
          @click="isEditShow=!isEditShow"
          size="mini" round type="danger"
          plain>
          {{isEditShow?'完成':'编辑'}}
          </van-button>
      </van-cell>

      <van-grid :gutter="10" :border="false">
        <van-grid-item
            v-for="item in userChannels"
            :key="item.id"
            :text="item.name"
        >
            <van-icon v-show="isEditShow" class="close-icon" slot="icon" name="close"></van-icon>
        </van-grid-item>
      </van-grid>

      <!-- 推荐频道 -->
      <van-cell title="推荐频道" :border="false" />

      <van-grid :gutter="10">
        <van-grid-item
            v-for="item in remainingChannels"
            :key="item.id"
            :text="item.name"
            @click="onAdd(item)"
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
      allChannels: [], // 所有频道
      isEditShow: false // 编辑按钮的状态
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
    // 获取所有频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      //   console.log(data)
      this.allChannels = data.data.channels
    },
    // 点击加入我的频道
    onAdd (channel) {
      this.userChannels.push(channel)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
    padding: 40px 0;
    ::v-deep .van-grid-item__content{
        position: relative;
        .van-grid-item__icon-wrapper{
            position: absolute;
            top: -10px;
            right: -5px;
            .close-icon{
                font-size: 16px
            }
        }
    }
}
</style>
