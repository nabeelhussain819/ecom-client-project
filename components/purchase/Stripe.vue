<template>
  <div>
    <stripe-element-payment
      v-if="elementsOptions.clientSecret"
      ref="paymentRef"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
      @element-change="change"
      class="stripe-pay-main"
    />
    <button class="btn ant-btn ant-btn-primary ant-btn-lg" @click="pay">
      Confirm Purchase
    </button>
  </div>
</template>

<script>
import { STRIPE_PK } from '~/services/Constant'

export default {
  props: {
    clientSecret: String,
  },
  data() {
    return {
      submit: false,
      pk: STRIPE_PK,
      elementsOptions: {
        appearance: {},
        clientSecret: this.clientSecret,
      },
      confirmParams: {
        return_url: window.location.origin, // success url
      },
    }
  },
  methods: {
    pay() {
      this.$emit('submit', this.submit, this.$refs.paymentRef)
    },
    change({ empty, complete }) {
      if (!empty && complete) this.submit = true
    },
  },
}
</script>
