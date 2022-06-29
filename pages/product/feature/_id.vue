<template>
  <div>Ad Featured</div>
</template>

<script>
import ProductServices from '~/services/API/ProductServices'

export default {
  name: 'Feature Product',
  async mounted() {
    await ProductServices.feature(this.$route.params.id, {
      days: this.$route.query.days,
      payment_intent: this.$route.query.payment_intent,
    })
  },
}
</script>
