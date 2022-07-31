<template>
  <div class="feature-tag">Ad Featured</div>
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
<style scoped>
.feature-tag {
  display: inline-block;
  padding: 2px 5px;
  background: #cee741;
  /* color: #fff; */
  font-weight: bold;
  border-radius: 7px;
}
</style>
