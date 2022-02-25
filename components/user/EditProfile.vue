<template>
  <div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Name"
      >
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: user.name,
              rules: [{ required: true, message: 'Please enter product name' }],
            },
          ]"
          placeholder="Please Enter Product Name"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="email"
      >
        <a-input
          v-decorator="[
            'email',
            {
              initialValue: user.email,
              rules: [
                { required: true, message: 'Please enter product email' },
              ],
            },
          ]"
          placeholder="Please Enter Product Name"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="phone"
      >
        <a-input
          v-decorator="[
            'phone',
            {
              initialValue: user.phone,
              rules: [
                { required: true, message: 'Please enter product phone' },
              ],
            },
          ]"
          placeholder="Please Enter Product Name"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          type="primary"
          size="large"
          @click="handleSubmit"
        >
          Save
        </a-button></a-form-item
      >
    </a-form>
  </div>
</template>
<script>
import UserServices from '~/services/API/UserServices'
import notifications from '~/mixins/notifications'
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}
export default {
  mixins: [notifications],
  data() {
    return {
      loading: false,
      user: {},
      products: [],
      formItemLayout,
      form: this.$form.createForm(this, {
        name: 'dynamic_rule',
      }),
    }
  },
  mounted() {
    this.user = this.$store.getters.getUser
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          this.updateUser(values)
        }
      })
    },
    updateUser(value) {
      this.loading = true
      UserServices.update(value)
        .then((response) => {
          this.success(response.message)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
