<template>
  <button @click="login" class="loginBtn loginBtn--google">
    Login with Google
  </button>
</template>

<script>
export default {
  name: "GoogleLogin",
  methods: {
    login() {
      this.$gAuth.signIn().then(response => this.$emit('login', response));
    }
  }
}
</script>
