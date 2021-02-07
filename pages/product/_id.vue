<template>
  <a-skeleton :loading="loading">
    <div class="center-container">
      <a-row :gutter="16">
        <a-col :xs="24" class="border" :sm="18"> </a-col>
        <a-col :xs="24" :sm="6"> <rating-avatar /> </a-col>
      </a-row>
      <comments />
    </div>
    {{ product.name }}</a-skeleton
  >
</template>
<script>
import Product from '~/services/API/Product'
import comments from '~/components/comments'
import ratingAvatar from '~/components/products/RatingAvatar'

export default {
  props: {
    comments,
    ratingAvatar,
  },
  data() {
    return { loading: false, product: {} }
  },
  mounted() {
    this.getProduct(this.$route.params.id)
  },
  methods: {
    getProduct(id) {
      this.loading = true
      Product.get(id)
        .then((product) => {
          this.product = product
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
