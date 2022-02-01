<template>
  <div>
    <div @click="showModal(true)">Login</div>

    <a-modal
      title="Login Form"
      :visible="visible"
      :confirm-loading="confirmLoading"
      footer=""
      @cancel="handleOk"
    >
      <login-form @close="handleOk" />
    </a-modal>
  </div>
</template>
<script>
import LoginForm from './loginForm.vue'
import { EVENT_LOGIN_MODAL } from '~/services/Constant'
export default {
  components: { LoginForm },
  data() {
    return {
      visible: false,
      confirmLoading: false,
    }
  },
  mounted() {
    const show = this.showModal
    this.$nuxt.$on(EVENT_LOGIN_MODAL, (flag = true) => {
      show(flag)
    })
  },
  methods: {
    showModal(show) {
      this.visible = show
    },
    handleOk() {
      this.visible = false
    },
    handleCancel() {},
  },
}
</script>
