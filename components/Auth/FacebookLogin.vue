<template>
  <button @click="login" class="loginBtn loginBtn--facebook">
    Login with Facebook
  </button>
</template>

<script>
export default {
  name: "FacebookLogin",
  methods: {
    login() {
      FB.login(response => this.$emit('login', response));
    }
  }
}
</script>
