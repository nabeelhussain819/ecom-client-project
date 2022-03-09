<template>
  <div class="py-4 border px-3 pt-1 pb-0 ant-col ant-col-xs-24 ant-col-sm-16">
    <a-col
      v-for="product in products"
      :key="product.id"
      :xs="24"
      :sm="6"
      class="profile-tile-width"
    >
      <tile :show-editable="true" :product="product" class="profile-cards" />
    </a-col>
  </div>
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
