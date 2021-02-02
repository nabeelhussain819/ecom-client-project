<template>
  <div>
    <social-login />
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Name">
        <a-input v-decorator="['email', { rules: [{ required: true, message: 'Please input your Email!' }] }]" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input v-decorator="['password',{rules:[{required:true, message:'Please input your password'}]}]" />
      </a-form-item>
      <!-- commented -->
      <a-form-item>
        <a-button type="primary" style="text-align:center;" block :disabled="loading" html-type="submit">
          LOGIN
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import SocialLogin from './SocialLogin.vue';
  import AuthServices from "~/services/Api/AuthService";
  import UserService from '~/services/Api/UserServices';

  import {
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
  } from "~/services/Constant";
  import {
    setUserDetails,
    setAccessToken,
    setRefreshToken,
    getAccessToken
  } from "~/services/Auth";
  export default {
    components: {
      SocialLogin
    },
    data() {
      return {
        formLayout: 'horizontal',
        loading: false,
        successResponse: '',
        errors: '',
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
            let client = {
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              grant_type: GRANT_TYPE
            };
            this.login({
              ...values,
              ...client
            });
          }
        });
      },
      login: function (params = {}) {
        this.loading = true;
        AuthServices.login(params)
          .then((response) => {
            const token = response.refresh_token;
            setRefreshToken(token);
            setAccessToken(response.access_token);
            this.$store.commit("authStatus", {
              token: response.access_token,
              status: true
            });
            this.$bvModal.hide("login-modal");
            this.getUserDetails();
            this.successResponse = "Login sucessful";
          })
          .catch(e => {
            if (e.code === 401) {}
            this.errors = e.response;
          })
          .then(() => (this.loading = false));
      },
      getUserDetails() {
        UserService.detail()
          .then(user => {
            setUserDetails(user);
            this.$store.commit("setUser", user);
          })
          .then(() => this.$router.go());
      },
    },
  };

</script>
