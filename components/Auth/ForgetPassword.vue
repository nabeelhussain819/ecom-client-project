<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @submit="onSubmit"
    >
      <a-form-item label="Email">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: 'Please insert the Email.' }],
            },
          ]"
          placeholder="Enter Email"
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
    <a-modal
      title="OTP Form"
      :visible="visible"
      footer=""
      @cancel="handleOk(false)"
    >
      <otp-verify :email="email" @close="handleOk(false)" />
    </a-modal>
    <ul>
      <li v-for="error in errors" :key="error" class="text-danger">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import OtpVerify from './OtpVerify.vue'
import AuthServices from '~/services/API/AuthService'
export default {
  components: { OtpVerify },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'forgetPassword' }),
      visible: false,
      errors: {},
      loading: false,
      email: {},
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        this.email = values.email
        if (!err) {
          this.forget({ ...values })
        }
      })
    },
    forget(values) {
      this.loading = true
      AuthServices.forgetPassword(values)
        .then((response) => {
          this.visible = true
          this.$emit('close')
        })
        .catch((e) => {
          if (e.response.status === 404) {
            this.errors = e.response.data.message
          }
          console.log(this.email)
          this.loading = false
        })
    },
    handleOk(show) {
      this.visible = show
    },
  },
}
</script>
