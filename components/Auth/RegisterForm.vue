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
              class="input-signup"
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
              class="input-signup"
              span="6"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item has-feedback>
            <span slot="label">
              Password&nbsp;
              <a-tooltip :title="passwordMessage">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your password' },
                    { min: 8 },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                },
              ]"
              class="input-signup"
              type="password"
              @blur="handleConfirmBlur"
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
              class="input-signup"
              type="password"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button :loading="loading" block type="primary" html-type="submit">
          SIGN UP
        </a-button>
        <a-col class="text-center pt-2" :span="24"
          >By signing up or loging in you accept our terms & conditions</a-col
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import SocialLogin from './SocialLogin.vue'
import AuthService from '~/services/API/AuthService'
import { setUserDetails } from '~/services/Auth'
import UserService from '~/services/API/UserServices'
import notifications from '~/mixins/notifications'

export default {
  components: {
    SocialLogin,
  },
  mixins: [notifications],
  data() {
    return {
      formLayout: 'inline',
      confirmDirty: false,
      passwordMessage:
        'should contain at least one digit,at least one lower case,at least one upper case,at least 8 from the mentioned characters',
      form: this.$form.createForm(this, {
        name: 'coordinated',
      }),
      loading: false,
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
      // const exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      // if (!exp.test(value)) {
      //   callback(this.passwordMessage)
      // }
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
      this.loading = true
      AuthService.register(params)
        .then((response) => {
          this.$emit('close', false)
          this.success(response.message)
          console.log('hello')
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
<style scoped>
.ant-col-12 {
  padding: 10px;
}
.input-signup {
  min-height: 38px;
}
</style>
