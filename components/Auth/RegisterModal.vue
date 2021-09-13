<template>
  <div>
    <div @click="showRegisterModal">Sign Up</div>
    <a-modal
      title="Signup Form"
      :visible="visible"
      :confirm-loading="confirmLoading"
      footer=""
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <RegisterForm />
    </a-modal>
  </div>
</template>
<script>
import RegisterForm from '~/components/Auth/RegisterForm'
export default {
  components: { RegisterForm },
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    showRegisterModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      // console.log('Clicked cancel button')
      this.visible = false
    },
  },
}
</script>
