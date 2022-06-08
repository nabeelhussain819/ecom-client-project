<template>
  <button class="loginBtn loginBtn--google" @click="login">
    Login with Google
  </button>
</template>

<script>
export default {
  name: 'GoogleLogin',
  methods: {
    login() {
      this.$gAuth
        .signIn()
        .then((response) => this.$emit('google-login', response))
    },
  },
}
</script>
