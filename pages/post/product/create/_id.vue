<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <bread-crumb :last-crumb="catgoryName" />
    <a-divider />
    <add-product :product="{}" @getCategoryName="getCategoryName" />
  </a-card>
</template>
<script>
import AddProduct from '~/components/products/AddProduct'
import BreadCrumb from '~/components/ui/BreadCrumb'
const components = {
  'add-product': AddProduct,
  BreadCrumb,
}
export default {
  components,
  data() {
    return {
      catgoryName: null,
    }
  },
  methods: {
    getCategoryName(categoryName) {
      this.catgoryName = categoryName
    },
  },
}
</script>
