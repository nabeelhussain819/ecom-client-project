<template>
  <div class="container container-pay-method">
    <div class="row">
      <div class="col">
        <div class="pay-method-header">
          <h1>Payment Methods</h1>
          <a @click="buyNow()">Cancel</a>
        </div>

        <br />
        <br />
        <div class="bycredit-main">
          <h3 class="">Add Credit / Debit Card</h3>
          <a @click="goto('/purchase/card-payment')">></a>
        </div>
        <hr class="pay-devider" />
        <div class="byVisa-main">
          <div class="d-flex">
            <img
              src="https://www.pngitem.com/pimgs/m/1-16193_visa-icon-png-black-and-white-transparent-png.png"
              alt="visa"
              width="75px"
            />
            <div class="byVisa-inner-div">
              <h2>Visa</h2>
              <span>**** **** **** 9346</span>
            </div>
          </div>
          <div><a-radio value=""></a-radio></div>
        </div>
        <div class="btn-use-card d-flex">
          <button class="btn ant-btn ant-btn-primary ant-col-12">
            Use Card
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'

import { EVENT_LOGIN_MODAL } from '~/services/Constant'
// import Product from '~/services/API/ProductServices'

export default {
  mixins: [routeHelpers],
  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
  },
  methods: {
    buyNow() {
      if (this.isAuth) {
        // ${product.guid}
        this.goto(`/product/purchase/`)
      } else {
        this.$nuxt.$emit(EVENT_LOGIN_MODAL, true)
      }
    },
  },
}
</script>
