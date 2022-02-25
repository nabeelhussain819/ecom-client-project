<template>
  <div>
    <social-login />
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Name">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: 'Please input your Email!' }],
            },
          ]"
          class="input-login"
        />
      </a-form-item>
      <a-form-item label="Password">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your password' },
              ],
            },
          ]"
          class="input-login"
          type="password"
        />
      </a-form-item>
      <!-- commented -->

      <!-- --- should be a component ---- -->
      <a-alert
        v-for="error in errors"
        :key="error"
        :message="error"
        banner
        closable
      />
      <!-- --- should be a component ---- -->
      <a-form-item>
        <a-button
          type="primary"
          style="text-align: center"
          block
          :loading="loading"
          :disabled="loading"
          html-type="submit"
        >
          LOGIN
        </a-button>
      </a-form-item>
      <a-row type="flex" justify="center" :style="{ fontWeight: 600 }">
        <a-col
          class="text-center login--label"
          :span="24"
          @click="showForgetModal(true)"
          >Forgotten Password?</a-col
        >
        <a-col
          class="text-center login--label"
          @click="showSignUpModal(true)"
          :span="24"
          >Don't have an account?&nbsp;<a> Sign Up</a></a-col
        >
        <a-col class="text-center pt-2" :span="24"
          >By signing up or loging in you accept our terms & conditions</a-col
        >
      </a-row>
      <a-modal
        title="Reset Password"
        :visible="visible"
        :footer="null"
        @cancel="showForgetModal(false)"
      >
        <forget-password @close="showForgetModal(true)" />
      </a-modal>
    </a-form>
  </div>
</template>

<script>
import SocialLogin from './SocialLogin.vue'
import ForgetPassword from '~/components/Auth/ForgetPassword'
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
  EVENT_SIGNUP_MODAL,
} from '~/services/Constant'

import {
  setUserDetails,
  setAccessToken,
  setRefreshToken,
} from '~/services/Auth'
import AuthServices from '~/services/API/AuthService'
import UserService from '~/services/API/UserServices'
import { isEmpty } from '~/services/Utilities'
import { success } from '~/services/Helpers/notifications'
export default {
  components: {
    SocialLogin,
    ForgetPassword,
  },
  data() {
    return {
      visible: false,
      formLayout: 'horizontal',
      loading: false,
      successResponse: '',
      errors: null,
      form: this.$form.createForm(this, {
        name: 'coordinated',
      }),
      EVENT_SIGNUP_MODAL,
    }
  },
  mounted() {},
  methods: {
    showSignUpModal(show) {
      this.$nuxt.$emit(EVENT_SIGNUP_MODAL, show)
      this.closeLoginModal()
    },
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          const client = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE,
          }
          this.login({
            ...values,
            ...client,
          })
        }
      })
    },
    login(params = {}) {
      this.loading = true
      AuthServices.login(params)
        .then((response) => {
          const token = response.refresh_token
          setRefreshToken(token)
          setAccessToken(response.token)
          this.$store.commit('setToken', {
            token: response.token,
            status: true,
          })
          success(this, { message: response.message })
          this.getUserDetails()
          this.closeLoginModal()
        })
        .catch((e) => {
          if (e.response && !isEmpty(e.response.data)) {
            this.errors = e.response.data.errors
          }
          if (e.response && !isEmpty(e.response.data.message)) {
            this.errors = [e.response.data.message]
          }
          // if(e.response)
        })
        .then(() => (this.loading = false))
    },
    getUserDetails() {
      UserService.detail()
        .then((user) => {
          setUserDetails(user)
          this.$store.commit('setUser', user)
        })
        .then(() => {
          // this.$router.go()
        })
    },
    closeLoginModal() {
      this.$emit('close')
    },
    showForgetModal(show) {
      this.visible = show
    },
  },
}
</script>
<style scoped>
.input-login {
  min-height: 38px;
}
</style>
