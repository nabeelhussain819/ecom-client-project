<template>
  <div>
    <a-form :form="form">
      <a-row class="account-form-field">
        <a-col :sm="10">
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
                  rules: [{ required: true, message: 'Please Enter name' }],
                },
              ]"
              placeholder="Please Enter Name"
            /> </a-form-item
        ></a-col>
        <a-col :sm="10">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Phone Number"
          >
            <a-input
              v-decorator="[
                'phone',
                {
                  initialValue: user.phone,
                  rules: [
                    { required: true, message: 'Please Enter Phone Number' },
                  ],
                },
              ]"
              placeholder="Please Enter Phone Number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="account-form-field">
        <a-col :sm="10">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Email"
          >
            <a-input
              :disabled="true"
              v-decorator="[
                'email',
                {
                  initialValue: user.email,
                  rules: [{ required: true, message: 'Please Enter Email' }],
                },
              ]"
              placeholder="Please Enter Email"
            />
          </a-form-item>
        </a-col>
        <a-col :sm="10">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Location"
          >
            <a-input
              v-decorator="[
                'location',
                {
                  initialValue: user.location,
                  rules: [{ required: true, message: 'Your Location' }],
                },
              ]"
              placeholder="Your Location"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item class="btn-account">
        <a-button
          :loading="loading"
          type="primary"
          size="large"
          class="px-5"
          @click="handleSubmit"
        >
          Save Changes
        </a-button></a-form-item
      >
    </a-form>
  </div>
</template>
<script>
import UserServices from '~/services/API/UserServices'
import notifications from '~/mixins/notifications'
import userDetail from '~/mixins/user-detail'
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}
export default {
  mixins: [notifications, userDetail],
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
          this.getUserDetails()
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
