<template>
  <div class="container-fluid">
    <!-- Start of LiveChat (www.livechat.com) code -->
    <script>
      window.__lc = window.__lc || {}
      window.__lc.license = 14387541
      ;(function (n, t, c) {
        function i(n) {
          return e._h ? e._h.apply(null, n) : e._q.push(n)
        }
        var e = {
          _q: [],
          _h: null,
          _v: '2.0',
          on: function () {
            i(['on', c.call(arguments)])
          },
          once: function () {
            i(['once', c.call(arguments)])
          },
          off: function () {
            i(['off', c.call(arguments)])
          },
          get: function () {
            if (!e._h)
              throw new Error(
                "[LiveChatWidget] You can't use getters before load."
              )
            return i(['get', c.call(arguments)])
          },
          call: function () {
            i(['call', c.call(arguments)])
          },
          init: function () {
            var n = t.createElement('script')
            ;(n.async = !0),
              (n.type = 'text/javascript'),
              (n.src = 'https://cdn.livechatinc.com/tracking.js'),
              t.head.appendChild(n)
          },
        }
        !n.__lc.asyncInit && e.init(),
          (n.LiveChatWidget = n.LiveChatWidget || e)
      })(window, document, [].slice)
    </script>
    <noscript
      ><a href="https://www.livechat.com/chat-with/14387541/" rel="nofollow"
        >Chat with us</a
      >, powered by
      <a
        href="https://www.livechat.com/?welcome"
        rel="noopener nofollow"
        target="_blank"
        >LiveChat</a
      ></noscript
    >
    <!-- End of LiveChat code -->

    <div class="mb-2">
      <slider
        :images="[
          'https://pocketapp.in/img/blog-img/electronics1.jpg',
          'http://www.reliablewash.com/images/slide3.jpg',
          'https://firstresponsecarpetcleaning.net/wp-content/uploads/2018/02/residential-Carpet-Cleaning-Service.jpg',
          'https://www.bechtle.com/dam/jcr:a0a76a52-6182-4496-b7f8-0d0553430049/cw42_mainbanner_apple_iphone12-eu.jpg',
        ]"
      />
    </div>
    <a-spin :spinning="loading" class="p-5">
      <a-row :gutter="16" class="d-flex">
        <a-col
          v-for="(product, index) in products"
          :key="index"
          class="tile-width-x mb-2 ant-col-md-4 ant-col-xs-12"
        >
          <Tile :product="product"
        /></a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
import Vue from 'vue'
import GoogleAuth from '@/plugins/google-auth'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '~/services/Constant'
import Products from '~/services/API/ProductServices'
import Tile from '~/components/products/Tile'

import slider from '~/components/sliders/ImageSlider'
const components = { Tile, slider }

// move to login component
Vue.use(GoogleAuth, {
  clientId: GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account',
})
export default Vue.extend({
  components,
  data() {
    return {
      products: [],
      loading: true,
    }
  },
  mounted() {
    this.fbInit()
    this.liveChatInit()
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.loading = true
      return Products.all({ is_sold: false })
        .then((products) => {
          console.log(products)
          this.products = products.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    fbInit() {
      // move to fb login button
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
    liveChatInit() {
      window.LiveChatWidget &&
        window.LiveChatWidget.on('ready', function () {
          window.LiveChatWidget.call('hide')
        })
    },
  },
})
</script>
<style scoped lang="scss">
.tile-width {
  width: 180px;
}
</style>
