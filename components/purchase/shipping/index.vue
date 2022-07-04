<template>
  <div class="container container-shipping">
    <a-form
      :form="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col">
          <div class="shipping-header">
            <h1>Add Shipping Info</h1>
            <a>Cancel</a>
          </div>
          <div>
            <label>Name </label>
            <a-form-item :gutter="5">
              <a-input v-decorator="['shipping[name]']" type="text" />
            </a-form-item>
          </div>
          <div>
            <label>Street Address </label>
            <a-form-item span="8">
              <a-input v-decorator="['shipping[street_address]']" type="text" />
            </a-form-item>
          </div>
          <div class="basic-location">
            <div class="item-city">
              <label>City </label>
              <a-form-item span="8">
                <a-input v-decorator="['shipping[state]']" type="text" />
              </a-form-item>
            </div>
            <div class="item-state">
              <label>State </label>
              <a-form-item span="8">
                <a-input v-decorator="['shipping[city]']" type="text" />
              </a-form-item>
            </div>
          </div>
          <div class="item-zip">
            <label>Zip </label>
            <a-form-item span="8">
              <a-input v-decorator="['shipping[zip]']" type="text" />
            </a-form-item>
          </div>
          <div class="btn-ship">
            <a-button
              html-type="submit"
              type="primary"
              class="btn ant-btn ant-btn-primary ant-btn-lg"
            >
              Save</a-button
            >
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import { EVENT_LOGIN_MODAL } from '~/services/Constant'
// import Product from '~/services/API/ProductServices'

export default {
  mixins: [routeHelpers],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'shippingDetail' }),
    }
  },
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
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.$emit('cancel', false)
          this.$emit('getShipingDetail', values)
        }
      })
    },
  },
}
</script>
