<template>
  <div>
    <a-spin :spinning="loading" class="p-5">
      <a-row :gutter="16">
        <h2>Saved Items</h2>
        <a-col
          v-for="(product, index) in products"
          :key="index"
          :span="3"
          class="tile-width"
        >
          <Tile :product="product"
        /></a-col>
      </a-row>
    </a-spin>
  </div>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
import Tile from '~/components/products/Tile'
export default {
  components: { Tile },
  data() {
    return {
      products: [],
      loading: true,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      ProductServices.getSaved()
        .then((products) => {
          this.products = products
        })
        .finally((this.loading = false))
    },
  },
}
</script>
