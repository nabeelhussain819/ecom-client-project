<template>
  <button @click="login" class="loginBtn loginBtn--google">
    Login with Google
  </button>
</template>

<script>
import { EVENT_LOGIN_MODAL } from '~/services/Constant'
export default {
  name: 'GoogleLogin',
  methods: {
    login() {
      this.$gAuth
        .signIn()
        .then((response) => this.$emit(EVENT_LOGIN_MODAL, response))
    },
  },
}
</script>
