<template>
  <a-row :gutter="18" class="py-4">
    <a-col
      v-for="product in products"
      :key="product.id"
      :xs="24"
      :sm="6"
      class="profile-tile-width"
    >
      <tile :show-editable="true" :product="product" class="profile-cards" />
    </a-col>
  </a-row>
</template>
<script>
import Product from '~/services/API/ProductServices'
import tile from '~/components/products/Tile'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { tile },
  data() {
    return { loading: false, user: {}, products: [] }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    isEmpty,
    getProducts() {
      Product.self().then((products) => {
        this.products = products.data
      })
    },
  },
}
</script>
