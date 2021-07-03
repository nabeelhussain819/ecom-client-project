/* eslint-disable no-undef */
<template>
  <div class="container"></div>
</template>

<script>
import Vue from 'vue'
import GoogleAuth from '@/plugins/google-auth'
import MasonryList from '~/components/products/masonryList'
import Carousel from '~/components/ui/Carousel'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '~/services/Constant'

const components = { MasonryList, Carousel }
function showProductModal() {}

function data() {
  return {}
}

Vue.use(GoogleAuth, {
  clientId: GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account',
})

const method = { showProductModal }
export default Vue.extend({
  components,
  method,
  data,
  mounted() {
    window.fbAsyncInit = function () {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v8.0',
      })
    }
    ;(function (d, s, id) {
      let js
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      // eslint-disable-next-line prefer-const
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  },
})
</script>
