<template>
  <div>
    <facebook-login @login="facebookLogin"/>

    <button @click="socialLogin('google')" class="loginBtn loginBtn--google">
      Login with Google
    </button>
  </div>
</template>

<script>
import FacebookLogin from '~/components/Auth/FacebookLogin'
import AuthService from '~/services/API/AuthService'
import {FACEBOOK_APP_ID} from '~/services/Constant'
import {setAccessToken, setRefreshToken} from '~/services/Auth'
import {success} from '~/services/Helpers/notifications'

export default {
  data() {
    return {appId: FACEBOOK_APP_ID};
  },
  components: {
    FacebookLogin
  },
  methods: {
    socialLogin(service) {
      window.location.href = `http://127.0.0.1:8000/api/login/${service}`
    },
    facebookLogin({authResponse}) {
      AuthService.facebookLogin(authResponse)
        .then(response => {
          const token = response.refresh_token
          setRefreshToken(token)
          setAccessToken(response.token)
          this.$store.commit('setToken', {
            token: response.token,
            status: true,
          })
          success(this, {message: response.message})
          window.location.reload();
        })
        .catch(err => {
        })
    }
  }
}
</script>
