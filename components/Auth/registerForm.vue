<!-- Input is not working under row idk why  -->
<template>
  <div>
    <social-login />
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Name">
        <a-input v-decorator="['name', { rules: [{ required: true, message: 'Please input your First Name!' }] }]" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input
          v-decorator="['email', { rules: [{ required: true, message: 'Please input your enter your email!' }] }]" />
      </a-form-item>

      <a-form-item label="Password">
        <a-input v-decorator="['password',{rules:[{required:true, message:'Please input your password'}]}]" />
      </a-form-item>
      <a-form-item label="Confirm Password">
        <a-input
          v-decorator="['password_confirmation', { rules: [{ required: true, message: 'Passwords dont match' }] }]" />
      </a-form-item>

      <a-form-item>
        <a-button block type="primary" html-type="submit">
          SIGN UP
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped>
  .ant-col-12 {
    padding: 10px;
  }

</style>

<script>
  import AuthService from '~/services/Api/AuthService';
  import {
    setAccessToken,
    setUserDetails
  } from '~/services/Auth';
  import SocialLogin from './SocialLogin.vue';
  export default {
    components: {
      SocialLogin
    },
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, {
          name: 'coordinated'
        }),
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
              this.register({...values});
          }
        });
      },
      getUserDetails() {
        UserService.detail()
          .then((user) => {
            setUserDetails(user);
            this.$store.commit("setUser", user);
          })
          .then(() => this.$router.go());
      },
      register: function (params = {}) {
        AuthService.register(params)
          .then((response) => {
            setAccessToken(response.access_token);
            this.$store.commit('authStatus', {
              token: response.access_token,
              status: true
            });
            this.getUserDetails();
            this.$notification.open({
              message: "Registration",
              description: response.message,
              class: "successNotification",
            });
          })
          .catch((e) => {
            this.errors = e.response;
            this.responseError = "Invalid input";
          })
      }
    },
  };

</script>
