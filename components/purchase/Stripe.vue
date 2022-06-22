<template>
  <div>
    <stripe-element-payment
      v-if="elementsOptions.clientSecret"
      ref="paymentRef"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
    />
    <button class="btn ant-btn ant-btn-primary ant-btn-lg" @click="pay">
      Confirm Purchase
    </button>
  </div>
</template>

<script>
import { StripeElementPayment } from '@vue-stripe/vue-stripe'
import StripeService from '~/services/API/StripeService'
import { STRIPE_PK } from '~/services/Constant'

export default {
  components: {
    StripeElementPayment,
  },
  props: {
    shippingDetail: Object,
    orderId: Number,
  },
  data() {
    return {
      pk: STRIPE_PK,
      elementsOptions: {
        appearance: {}, // appearance options
      },
      confirmParams: {
        return_url: window.location.origin, // success url
      },
    }
  },
  mounted() {
    this.generatePaymentIntent()
  },
  methods: {
    async generatePaymentIntent() {
      const paymentIntent = await StripeService.generatePaymentIntent(
        this.$route.params.id
      )
      this.elementsOptions.clientSecret = paymentIntent.client_secret
      this.$forceUpdate()
    },
    pay() {
      this.$emit('submit', this.$refs.paymentRef)
    },
  },
}
</script>
