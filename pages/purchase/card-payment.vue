<template>
  <div class="container card-payment">
    <div class="row">
      <div class="col">
        <div class="byCard-header">
          <h1>Add Card</h1>
        </div>
        <p class="byCard-intro">
          To pay for items through shipping, add a credit or debit card.
          <a href="#" class=""> Learn More</a>
        </p>
        <a-form :form="form">
          <div>
            <label>Name on Card</label>
            <a-form-item>
              <a-input v-decorator="['name']" type="text" />
            </a-form-item>
          </div>
          <div>
            <label>Card Number</label>
            <a-form-item span="8">
              <a-input v-decorator="['card number']" type="text" />
            </a-form-item>
          </div>
          <div class="d-flex card-detail">
            <div class="ant-col-6">
              <label>Valid Thru </label>
              <a-form-item span="4">
                <a-input v-decorator="['date']" type="date" />
              </a-form-item>
            </div>
            <div class="ant-col-6">
              <label>CVV </label>
              <a-form-item span="4">
                <a-input v-decorator="['state']" type="text" />
              </a-form-item>
            </div>
            <div class="ant-col-6">
              <label>Zip </label>
              <a-form-item span="4">
                <a-input v-decorator="['zip']" type="text" />
              </a-form-item>
            </div>
          </div>

          <div class="d-flex">
            <img
              src="https://cdn.pixabay.com/photo/2019/10/06/11/40/lock-4529981_640.png"
              alt="private-info"
              width="40px"
            />
            <p class="m-0 secure-info">
              Your payment information stays private
            </p>
          </div>
          <div class="d-flex mr-5">
            <button class="btn-powered">Powered By <b>Stripe</b></button>
            <span class="mt-5 secure-info"> Trusted By millions </span>
          </div>
          <div class="btn-card-payment mt-5">
            <button
              type="submit"
              class="btn ant-btn ant-btn-primary ant-btn-lg"
            >
              Save
            </button>
          </div>
        </a-form>
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
