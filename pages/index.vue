<template>
  <div class="container-fluid">
    <div class="mb-2">
      <slider
        :images="[
          'https://galaxy.pk/wp-content/uploads/2022/01/Apple-Macbook-Pro-6.jpg',
          'https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/dell-homepage/apj/heroes/npl-cons-dell-xps-9310nt-uhp-apj-homepage-hero-lf-2400x696.png?fmt=pjpg&pscan=auto&scl=1&hei=696&wid=2400&qlt=100,0&resMode=sharp2&size=2400,696&op_usm=1.75,0.3,2,0',
        ]"
      />
    </div>
    <a-spin :spinning="loading" class="p-5">
      <a-row :gutter="16">
        <a-col
          v-for="(product, index) in products"
          :key="index"
          :span="3"
          class="tile-width"
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
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.loading = true
      return Products.all()
        .then((products) => {
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
  },
})
</script>
<style scoped lang="scss">
.tile-width {
  width: 180px;
}
</style>
