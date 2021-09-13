<!-- Input is not working under row idk why  -->
<template>
  <div>
    <social-login />
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item label="Name">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    { max: 50 },
                    {
                      required: true,
                      message: 'Please input your First Name!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Email">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    { max: 65 },
                    {
                      required: true,
                      message: 'Please input your enter your email!',
                    },
                  ],
                },
              ]"
              span="6"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item label="Password" has-feedback>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your password' },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                },
              ]"
              @blur="handleConfirmBlur"
              type="password"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Confirm Password" has-feedback>
            <a-input
              v-decorator="[
                'password_confirmation',
                {
                  rules: [
                    { required: true, message: 'Passwords dont match' },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button block type="primary" html-type="submit"> SIGN UP </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import SocialLogin from './SocialLogin.vue'
import AuthService from '~/services/API/AuthService'
import { setAccessToken, setUserDetails } from '~/services/Auth'
import UserService from '~/services/API/UserServices'
export default {
  components: {
    SocialLogin,
  },
  data() {
    return {
      formLayout: 'inline',
      confirmDirty: false,
      form: this.$form.createForm(this, {
        name: 'coordinated',
      }),
    }
  },
  methods: {
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['password_confirmation'], { force: true })
      }
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.register({ ...values })
        }
      })
    },
    getUserDetails() {
      UserService.detail()
        .then((user) => {
          setUserDetails(user)
          this.$store.commit('setUser', user)
        })
        .then(() => this.$router.go())
    },
    register(params = {}) {
      AuthService.register(params)
        .then((response) => {
          setAccessToken(response.access_token)
          this.$store.commit('authStatus', {
            token: response.access_token,
            status: true,
          })
          this.getUserDetails()
          this.$notification.open({
            message: 'Registration',
            description: response.message,
            class: 'successNotification',
          })
        })
        .catch((e) => {
          this.errors = e.response
          this.responseError = 'Invalid input'
        })
    },
  },
}
</script>
<style scoped>
.ant-col-12 {
  padding: 10px;
}
</style>
