<template>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar
        title="登录"
      />

      <!-- 登录表单 -->
      <van-cell-group>
        <van-field
          class="form-item"
          v-model="user.mobile"
          clearable
          label="手机号"
          placeholder="请输入手机号"
        >
          <i class="icon icon-shouji" slot="left-icon"></i>
        </van-field>
        <van-field
          class="form-item"
          label="验证码"
          placeholder="请输入验证码"
          v-model="user.code"
        >
          <i class="icon icon-mima" slot="left-icon"></i>
          <!-- 倒计时组件 -->
          <van-count-down
          v-if="isCountShow"
          :time="1000*60"
          slot="button"
          format=" ss s"
          @finish="isCountShow=false"
          />
          <!-- 验证码按钮 -->
          <van-button
          v-else slot="button"
          size="small"
          type="primary"
          @click="onSendSmsCode"
          round>发送验证码</van-button>
        </van-field>
      </van-cell-group>

      <!-- 登录按钮 -->
      <div class="btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
      </div>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountShow: false // 默认是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 点击发送验证码
    async onSendSmsCode () {
      const { mobile } = this.user
      try {
        this.isCountShow = true
        await getSmsCode(mobile)
      } catch (err) {
        this.isCountShow = false
        if (err.response.status === 429) {
          this.$toast('请问频繁操作')
          return
        }
        this.$toast('发送失败')
      }
    },
    // 点击登录按钮
    async onLogin () {
      const user = this.user
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(user)
        console.log(res)
        // 提示登录成功
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登陆失败', err)
        // 提示登陆失败
        this.$toast.fail('登陆失败,手机或验证码错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-item {
  align-items: center;
  height: 45px;
}
.btn-wrap{
  padding: 27px 16px;
  .van-button{
    width: 100%;
    background: #6db4fb;
    border-radius: 7px;
  }
}
</style>
