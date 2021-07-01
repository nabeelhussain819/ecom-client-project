<template>
  <div class="container">
    <masonry-list />
  </div>
</template>

<script>
import Vue from 'vue'
import MasonryList from '~/components/products/masonryList'
import Carousel from '~/components/ui/Carousel'
import GoogleAuth from '@/plugins/google-auth'
import {FACEBOOK_APP_ID, GOOGLE_CLIENT_ID} from '~/services/Constant'

const components = { MasonryList, Carousel }
function showProductModal() {}

function data() {
  return {}
}

Vue.use(GoogleAuth, {
  clientId: GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
})

const method = { showProductModal }
export default Vue.extend({
  components,
  method,
  data,
  mounted() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v8.0'
      });
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
})
</script>
