<template>
  <div>
    <div @click="showRegisterModal(true)">Sign Up</div>
    <a-modal
      title="Signup Form"
      :visible="visible"
      :confirm-loading="confirmLoading"
      footer=""
      :destroy-on-close="true"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <RegisterForm @close="close" />
    </a-modal>
  </div>
</template>
<script>
import RegisterForm from '~/components/Auth/RegisterForm'
import { EVENT_SIGNUP_MODAL } from '~/services/Constant'
export default {
  components: { RegisterForm },
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  },
  mounted() {
    const showRegisterModal = this.showRegisterModal
    this.$nuxt.$on(EVENT_SIGNUP_MODAL, function (flag) {
      showRegisterModal(flag)
    })
  },
  methods: {
    showRegisterModal(show) {
      console.log('show', show)
      this.visible = show
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    close(show) {
      this.showRegisterModal(show)
    },
    handleCancel(e) {
      // console.log('Clicked cancel button')
      this.visible = false
    },
  },
}
</script>
