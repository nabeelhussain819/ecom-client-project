<template>
  <div>
    <a-radio-group
      v-if="!pay"
      class="container adModel"
      style="display: block !important"
      @change="change"
    >
      <a-form-model>
        <h1 style="text-align: center; margin: 15px 0">
          Reach More Buyers And Seller Faster!
        </h1>
        <h1>Sell Faster Now</h1>
        <div class="ad_list">
          <a-form-model-item label="">
            <a-col>
              <h1 class="ad_price" style="float: right">$299</h1>

              <a-row>
                <a-radio value="30" class="adType"
                  >Featured ad for 30 Days
                </a-radio>
              </a-row>
              <a-row> Reach Upto 10 times more buyers</a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model>
        <div class="ad_list">
          <a-form-model-item label="">
            <a-col>
              <h1 class="ad_price" style="float: right; color: #9e9e9e">
                $149
              </h1>

              <a-row>
                <a-radio value="7" class="adType"
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
          <a-form-model-item label="">
            <a-col>
              <h1 class="ad_btm_price" style="float: right; color: #9e9e9e">
                $$
              </h1>

              <a-row>
                <a-radio value="3" class="adType"
                  >Sales captain for 30 days
                </a-radio>
              </a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model>
        <div class="ad_list">
          <a-form-model-item label="">
            <a-col>
              <h1 class="ad_btm_price" style="float: right; color: #9e9e9e">
                $$
              </h1>

              <a-row>
                <a-radio value="4" class="adType"
                  >Sales captain for 7 days
                </a-radio>
              </a-row>
            </a-col>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-form-model-item class="ads_button">
        <a-button type="primary" @click="buy"> AVAIL NOW</a-button>
        <a-button type="default" @click="skip"> SKIP</a-button>
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
  data() {
    return {
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
        '/product/feature/' +
        this.$route.params.id +
        '?days=' +
        this.choice
      ref.submit()
    },
    async buy() {
      const paymentIntent = await StripeService.generateFeatureIntent({
        choice: this.choice,
      })
      this.clientSecret = paymentIntent.client_secret
      this.pay = true
    },
    skip() {
      this.$emit('cancel')
    },
    change(e) {
      this.choice = e.target.value
    },
  },
}
</script>
