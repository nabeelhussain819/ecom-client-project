<template>
  <div>
    <a-radio-group
      v-if="!pay"
      class="container adModel"
      style="display: block !important"
      @change="change"
    >
      <a-form-model v-if="!product.featured">
        <h1 style="text-align: center; margin: 15px 0">
          Reach More Buyers And Seller Faster!
        </h1>
        <h1>Sell Faster Now</h1>
        <div class="ad_list">
          <a-form-model-item label="">
            <a-col>
              <h1 class="ad_price" style="float: right">$299</h1>

              <a-row>
                <a-radio value="feature_30" class="adType"
                  >Featured ad for 30 Days
                </a-radio>
              </a-row>
              <a-row> Reach Upto 10 times more buyers</a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model v-if="!product.featured">
        <div class="ad_list">
          <a-form-model-item label="">
            <a-col>
              <h1 class="ad_price" style="float: right; color: #9e9e9e">
                $149
              </h1>

              <a-row>
                <a-radio value="feature_7" class="adType"
                  >Featured ad for 7 Days
                </a-radio>
              </a-row>
              <a-row> Reach Upto 10 times more buyers</a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model>
        <div class="ad_list">
          <a-form-model-item label="" v-if="!product.hired">
            <a-col>
              <h1
                class="ad_btm_price"
                style="float: right; color: #9e9e9e; font-size: 32px"
              >
                $99
              </h1>
              <a-row>
                <a-radio value="hire_30" class="adType"
                  >Sales captain for 30 days
                </a-radio>
              </a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model v-if="!product.hired">
        <div class="ad_list">
          <a-form-model-item label="">
            <a-col>
              <h1
                class="ad_btm_price"
                style="float: right; color: #9e9e9e; font-size: 32px"
              >
                $49
              </h1>
              <a-row>
                <a-radio value="hire_7" class="adType"
                  >Sales captain for 7 days
                </a-radio>
              </a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model-item class="ads_button">
        <a-button type="primary" @click="buy"> AVAIL NOW</a-button>
      </a-form-model-item>
    </a-radio-group>
    <div>
      <Stripe v-if="pay" :client-secret="clientSecret" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import StripeService from '~/services/API/StripeService'
import Stripe from '~/components/purchase/Stripe'

export default {
  components: {
    Stripe,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      feature: false,
      choice: null,
      clientSecret: null,
      pay: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    onSubmit(submit, ref) {
      if (!submit) ref.submit()
      // required to trigger validation errors
      ref.confirmParams.return_url =
        window.location.origin +
        (this.feature ? '/product/feature/' : '/product/hire/') +
        this.$route.params.id +
        '?days=' +
        this.choice
      ref.submit()
    },
    async buy() {
      let paymentIntent = {}
      if (this.feature)
        paymentIntent = await StripeService.generateFeatureIntent({
          choice: this.choice,
        })
      else {
        paymentIntent = await StripeService.generateHireIntent({
          choice: this.choice,
        })
      }
      this.clientSecret = paymentIntent.client_secret
      this.pay = true
    },
    skip() {
      this.$emit('close')
    },
    change({ target: { value } }) {
      this.feature = value.includes('feature')
      this.choice = value.split('_')[1]
    },
  },
}
</script>
