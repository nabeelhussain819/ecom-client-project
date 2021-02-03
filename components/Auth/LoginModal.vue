<template>
  <div>
    <div @click="showModal">Login</div>
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
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
    },
    handleCancel() {},
  },
}
</script>
