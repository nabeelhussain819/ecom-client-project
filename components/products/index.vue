<template>
  <a-row
    type="flex"
    justify="space-around"
    align="middle"
    class="dark-header"
    :gutter="{ xs: 15, md: 14 }"
  >
    <a-col :xs="24" :md="8">
      <list-menu @getCategoryId="getCategoryId" />
    </a-col>
    <a-col v-if="showProduct" :xs="24" :md="16">
      <add-product />
    </a-col>
  </a-row>
</template>
<script>
import AddProduct from '~/components/products/AddProduct'
import ListMenu from '~/components/categories/ListMenu'
function data() {
  return { showProduct: false }
}
const components = {
  AddProduct,
  ListMenu,
}
function getCategoryId() {
  this.showProduct = true
}

const methods = {
  getCategoryId,
}

export default {
  components,
  data,
  methods,
}
</script>
