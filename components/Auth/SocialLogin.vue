<template>
  <div>
    <facebook-login @login="facebookLogin" />

    <google-login @login="googleLogin" />
  </div>
</template>

<script>
import FacebookLogin from '~/components/Auth/FacebookLogin'
import GoogleLogin from '~/components/Auth/GoogleLogin'
import AuthService from '~/services/API/AuthService'
import { FACEBOOK_APP_ID } from '~/services/Constant'
import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { success } from '~/services/Helpers/notifications'

export default {
  data() {
    return { appId: FACEBOOK_APP_ID }
  },
  components: {
    FacebookLogin,
    GoogleLogin,
  },
  methods: {
    facebookLogin({ authResponse }) {
      AuthService.facebookLogin(authResponse).then((response) =>
        this.setToken(response)
      )
    },
    googleLogin(response) {
      const profile = response.getBasicProfile()
      const user = { name: profile.getName(), email: profile.getEmail() }
      AuthService.googleLogin({ ...response.getAuthResponse(), user }).then(
        (resp) => this.setToken(resp)
      )
    },
    setToken(response) {
      const token = response.refresh_token
      setRefreshToken(token)
      setAccessToken(response.token)
      this.$store.commit('setToken', {
        token: response.token,
        status: true,
      })
      success(this, { message: response.message })
    },
  },
}
</script>
