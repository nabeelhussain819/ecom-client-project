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
    this.$nuxt.$on('login', () => {
      show(true)
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
