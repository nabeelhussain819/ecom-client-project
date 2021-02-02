<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <bread-crumb />
    <a-divider />
    <add-product :product="{}" />
  </a-card>
</template>
<script>
import AddProduct from '~/components/products/AddProduct'
import BreadCrumb from '~/components/ui/BreadCrumb'
const components = {
  AddProduct,
  BreadCrumb,
}
export default { components }
</script>
