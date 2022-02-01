<template>
  <button @click="login" class="loginBtn loginBtn--facebook">
    Login with Facebook
  </button>
</template>

<script>
import { EVENT_LOGIN_MODAL } from '~/services/Constant'
export default {
  name: 'FacebookLogin',
  methods: {
    login() {
      // eslint-disable-next-line no-undef
      FB.login((response) => this.$emit(EVENT_LOGIN_MODAL, response))
    },
  },
}
</script>
