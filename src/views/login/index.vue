<template>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar
        title="登录"
      />

      <!--
      vee-validate 验证插件的具体使用
      1、使用 ValidationObserver 把需要校验的整个表单包起来
      2、使用 ValidationProvider 把需要校验的具体表单元素包起来，例如 input
      3、通过 ValidationProvider 配置具体的校验规则
        name      配置验证字段的名称
        rules     验证规则
          rules="requried" 单个验证规则
          rules="required|length:4" 多个验证规则使用 | 分隔
        v-slot="{ errors }" 获取错误消息
     -->
      <!-- 登录表单 -->
      <ValidationObserver ref="form">
        <ValidationProvider name="手机号" rules="required|mobile">
          <van-field
            class="form-item"
            v-model="user.mobile"
            clearable
            label="手机号"
            placeholder="请输入手机号"
          >
            <i class="icon icon-shouji" slot="left-icon"></i>
          </van-field>
        </ValidationProvider>

        <ValidationProvider name="验证码" rules="required|code">
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
          </ValidationProvider>

      </ValidationObserver>

      <!-- 登录按钮 -->
      <div class="btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
      </div>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
import { validate } from 'vee-validate'

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
      // 获得手机号
      const { mobile } = this.user
      // 校验手机号是否有效
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 发送验证码
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
      // 获取表单数据
      const user = this.user

      // 表单验证
      const success = await this.$refs.form.validate()
      // 如果验证失败，提示错误，停止表单提交
      if (!success) {
        // const { errors } = this.$refs.form
        // console.log('验证失败', this.$refs.form)
        setTimeout(() => {
          const errors = this.$refs.form.errors
          const item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
          console.log('验证失败', errors)
          // // 第二种方法  使用for循环
          // for (let key in errors) {
          //   const item = errors[key]
          //   if (item[0]) {
          //     this.$toast(item[0])
          //     return
          //   }
          // }
        }, 100)
        return
      }
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(user)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        // 提示登录成功
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
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
