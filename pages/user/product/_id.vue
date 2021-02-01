<template>
  <a-skeleton :loading="loading">
    <add-product :is-created="true" :product="product" />
  </a-skeleton>
</template>

<script>
import AddProduct from '~/components/products/AddProduct'
import Product from '~/services/API/Product'
const components = {
  AddProduct,
}
function data() {
  return { loading: true, product: [] }
}

function getProduct($this) {
  Product.get($this.$route.params.id)
    .then((product) => {
      $this.product = product
    })
    .finally(() => ($this.loading = false))
}

const methods = {
  getProduct,
}

function mounted() {
  getProduct(this)
}

export default {
  components,
  data,
  mounted,
  methods,
}
</script>
