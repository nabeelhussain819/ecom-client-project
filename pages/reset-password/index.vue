<template>
  <a-form class="container" :form="form" @submit="handleSubmit">
    <h1>RESET PASSWORD</h1>
    <div class="container">
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              initialValue: $route.query.email,
              rules: [{ required: true, message: 'Please input your Email!' }],
            },
          ]"
          :disabled="true"
          hidden
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
          class="p-4"
          type="password"
        />
      </a-form-item>
      <a-form-item label="Confirm Password">
        <a-input
          v-decorator="[
            'password_confirmation',
            {
              rules: [
                { required: true, message: 'Please retype your password' },
                { validator: compareToFirstPassword },
              ],
            },
          ]"
          class="p-4"
          type="password"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          class="theme-btn"
          style="height: 47px"
          block
          :loading="loading"
          :disabled="loading"
          html-type="submit"
        >
          Reset Password
        </a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script>
import AuthServices from '~/services/API/AuthService'
import { success } from '~/services/Helpers/notifications'

export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: 'reset_password' }),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          AuthServices.resetPassword(values)
            .then(() => {
              success(this, { message: 'Password Reset Successfully!' })
              this.$router.push({ path: '/' })
            })
            .catch((e) => {
              if (e.response.status === 404) {
                this.errors = e.response.data.message
              }
              this.loading = false
            })
        }
      })
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
  },
}
</script>
