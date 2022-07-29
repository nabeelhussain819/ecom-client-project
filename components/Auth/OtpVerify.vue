<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @submit="onSubmit"
    >
      <a-form-item label="OTP">
        <a-input
          v-decorator="[
            'email',
            {
              initialValue: email,
              rules: [{ required: true, message: 'Please insert the OTP.' }],
            },
          ]"
          hidden
          placeholder="Enter OTP"
        />
        <a-input
          v-decorator="[
            'otp',
            {
              rules: [{ required: true, message: 'Please insert the OTP.' }],
            },
          ]"
          placeholder="Enter OTP"
        />
      </a-form-item>
      <a-form-item class="p-0 m-0" :wrapper-col="{ span: 24, offset: 0 }">
        <a-button
          type="primary"
          class="float-right primary-btn"
          :disabled="loading"
          html-type="submit"
        >
          Submit
        </a-button>
      </a-form-item>
    </a-form>
    <ul>
      <li v-for="error in errors" :key="error" class="text-danger">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import AuthServices from '~/services/API/AuthService'
export default {
  props: ['email'],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'forgetPassword' }),
      errors: {},
      loading: false,
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.forget({ ...values })
        }
      })
    },
    forget(values) {
      this.loading = true
      AuthServices.verifyOtp(values)
        .then((response) => {
          if (response.success === true) {
            this.$router.push({
              path: '/reset-password',
              query: { email: values.email },
            })
            this.$emit('close')
          }
        })
        .catch((e) => {
          if (e.response.status === 404) {
            this.errors = e.response.data.message
          }
          this.loading = false
        })
    },
  },
}
</script>
