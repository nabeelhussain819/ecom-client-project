<template>
  <div>Order Confirmed</div>
</template>

<script>
import OrderServices from '~/services/API/OrderServices'

export default {
  name: 'Order Confirm',
  mounted() {
    OrderServices.update(this.$route.params.id, {
      payment_intent: this.$route.query.payment_intent,
      status: 'PAID',
    })
      .then(() => {})
      .catch(() => {})
  },
}
</script>
