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
import OrderServices from '~/services/API/OrderServices'
import StripeService from '~/services/API/StripeService'
import { STRIPE_PK } from '~/services/Constant'

export default {
  components: {
    StripeElementPayment,
  },
  props: {
    shippingDetail: Object,
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
      OrderServices.save({
        shippingDetail: this.shippingDetail,
        product_id: this.$route.params.id,
      })
        .then((order) => {
          this.confirmParams.return_url =
            window.location.origin + '/order/confirm/' + order.id
          this.$refs.paymentRef.submit()
        })
        .catch(() => {})
    },
  },
}
</script>
