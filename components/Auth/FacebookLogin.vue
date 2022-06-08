<template>
  <button class="loginBtn loginBtn--facebook" @click="login">
    Login with Facebook
  </button>
</template>

<script>
export default {
  name: 'FacebookLogin',
  methods: {
    login() {
      // eslint-disable-next-line no-undef
      FB.login((response) => this.$emit('facebook-login', response))
    },
  },
}
</script>
