<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <add-product />
  </a-card>
</template>
<script>
import AddProduct from '~/components/products/AddProduct'
const components = {
  AddProduct,
}
export default { components }
</script>
