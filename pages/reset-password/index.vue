<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item hidden>
      <a-input v-decorator="['token', {initialValue: this.$route.query.token}]"/>
    </a-form-item>
    <a-form-item label="Email">
      <a-input
        v-decorator="[
            'email',
            {rules: [{ required: true, message: 'Please input your Email!' }],},
          ]"
      />
    </a-form-item>
    <a-form-item label="Password">
      <a-input
        v-decorator="[
            'password',
            {rules: [{ required: true, message: 'Please input your password' }]},
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
                { required: true, message: 'Please retype password' },
                // ({ getFieldValue }) => ({
                //   validator(_, value) {
                //     if (!value || getFieldValue('password') === value) {
                //       return Promise.resolve();
                //     }
                //     return Promise.reject(new Error('The two passwords that you entered do not match!'));
                //   },
                // }),
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
  name: "index",
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, {name: 'reset_password'}),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          AuthServices.resetPassword(values)
            .then(response => this.$router.push({path: '/'}))
            .catch(err => {
            })
            .then(() => this.loading = false);
        }
      })
    },
  }
}
</script>
