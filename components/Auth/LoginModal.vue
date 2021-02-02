<template>
  <div>    
   <div @click="showModal">
      Login
    </div>
    <a-modal
      title="Login Form"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      footer=''

    >
        <LoginForm/>
    </a-modal>
  </div>
</template>
<script>    
import LoginForm from './loginForm.vue';
export default {
  components: { LoginForm },
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },
};
</script>
