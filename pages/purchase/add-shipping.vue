<template>
  <div class="container container-shipping">
    <div class="row">
      <div class="col">
        <div class="shipping-header">
          <h1>Add Shipping Info</h1>
          <a @click="buyNow()">Cancel</a>
        </div>
        <a-form :form="form">
          <div>
            <label>Name </label>
            <a-form-item :gutter="5">
              <a-input v-decorator="['username']" type="text" />
            </a-form-item>
          </div>
          <div>
            <label>Street Address </label>
            <a-form-item span="8">
              <a-input v-decorator="['address']" type="text" />
            </a-form-item>
          </div>
          <div class="basic-location">
            <div class="item-city">
              <label>City </label>
              <a-form-item span="8">
                <a-input v-decorator="['city']" type="text" />
              </a-form-item>
            </div>
            <div class="item-state">
              <label>State </label>
              <a-form-item span="8">
                <a-input v-decorator="['state']" type="text" />
              </a-form-item>
            </div>
          </div>
          <div class="item-zip">
            <label>Zip </label>
            <a-input v-decorator="['zip']" type="text" />
          </div>
          <div class="btn-ship">
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
// import routeHelpers from '~/mixins/route-helpers'
// export default {
//   mixins: [routeHelpers],

//   data() {
//     return {
//       formItemLayout: {
//         labelCol: {
//           xs: { span: 24 },
//           sm: { span: 8 },
//         },
//         wrapperCol: {
//           xs: { span: 24 },
//           sm: { span: 16 },
//         },
//       },
//     }
//   },
// }
//
</script>
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
