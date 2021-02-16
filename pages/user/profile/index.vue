<template>
  <a-skeleton :loading="loading">
    <div class="center-container user-profile">
      <a-row :gutter="18">
        <a-col :xs="24" class="border profile-detail" :sm="6">
          <upload />
          <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
        </a-col>
        <a-col :xs="24" :sm="16">
          <a-row align="center" :gutter="18">
            <a-col
              v-for="product in products"
              :key="product.id"
              :xs="24"
              :sm="6"
            >
              <tile :product="product" />
            </a-col>
          </a-row>
        </a-col>
      </a-row></div
  ></a-skeleton>
</template>
<script>
import upload from '~/components/user/upload'
import Product from '~/services/API/Product'
import tile from '~/components/products/Tile'
export default {
  components: { upload, tile },
  data() {
    return { loading: false, user: {}, products: [] }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    getProducts() {
      Product.self().then((products) => {
        this.products = products.data
      })
    },
    goto(guid) {
      this.$router.push({ path: `/user/product/${guid}` })
    },
  },
}
</script>
<style scoped lang="scss">
.user-profile {
  .profile-detail {
    padding: 15px;
  }
}
</style>
