<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Email">
      <a-input
        v-decorator="[
          'email',
          {
            initialValue: $route.query.email,
            rules: [{ required: true, message: 'Please input your Email!' }],
          },
        ]"
        :disabled="true"
      />
    </a-form-item>
    <a-form-item label="Password">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your password' }],
          },
        ]"
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
        type="password"
      />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        style="text-align: center"
        block
        :loading="loading"
        :disabled="loading"
        html-type="submit"
      >
        Reset Password
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import AuthServices from '~/services/API/AuthService'

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
            .then(() => this.$router.push({ path: '/' }))
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
