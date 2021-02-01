<template>
  <div>
    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="Name">
        <a-input v-decorator="['name', { rules: [{ required: true, message: 'Please input your Email!' }] }]" />
      </a-form-item>
      <a-form-item label="password">
        <a-input v-decorator="['password',{rules:[{required:true, message:'Please input your password'}]}]" />
      </a-form-item>
      <!-- <a-form-item :wrapper-col="{ span: 12, offset: 15 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item> -->
    </a-form>
    <social-login />
  </div>
</template>

<script>
  import SocialLogin from './SocialLogin.vue';
  export default {
    components: {
      SocialLogin
    },
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, {
          name: 'coordinated'
        }),
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
    },
  };

</script>
