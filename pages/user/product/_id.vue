<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <a-skeleton :loading="loading">
      <bread-crumb />
      <a-divider />
      <add-product :is-created="true" :product="product" />
      <a-divider />
      <h2 class="sub-heading">Upload Product Images</h2>
      <upload :product="product" />
    </a-skeleton>
  </a-card>
</template>

<script>
import AddProduct from '~/components/products/AddProduct'
import Product from '~/services/API/Product'
import BreadCrumb from '~/components/ui/BreadCrumb'
const components = {
  AddProduct,
  BreadCrumb,
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
