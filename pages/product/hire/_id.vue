<template>
  <div class="feature-tag">Captain Hired</div>
</template>

<script>
import ProductServices from '~/services/API/ProductServices'

export default {
  name: 'Hire Captain',
  async mounted() {
    await ProductServices.hire(this.$route.params.id, {
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
