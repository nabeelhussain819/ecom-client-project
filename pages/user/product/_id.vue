<template>
  <a-card class="tiles-card dark-header" size="small" title="Product">
    <a-skeleton :loading="loading">
      <bread-crumb />
      <a-divider />
      <add-product
        :is-created="true"
        :product="product"
        :file-list="fileList"
        :show-uploader="showUploader"
      />
      <a-divider />
    </a-skeleton>
  </a-card>
</template>

<script>
import AddProduct from '~/components/products/AddProduct'
import Product from '~/services/API/ProductServices'
import upload from '~/components/products/Upload'
import BreadCrumb from '~/components/ui/BreadCrumb'
const components = {
  AddProduct,
  BreadCrumb,
  upload,
}
function data() {
  return {
    loading: true,
    product: [],
    fileList: [],
    showUploader: false,
  }
}

function mounted() {
  this.getProduct()
}

export default {
  components,
  data,
  mounted,
  methods: {
    getProduct() {
      Product.get(this.$route.params.id)
        .then((product) => {
          this.product = product
          this.galery(product.guid)
        })
        .finally(() => (this.loading = false))
    },
    galery(id) {
      Product.images(id).then((fileList) => {
        this.fileList = fileList
        this.showUploader = true
      })
    },
  },
}
</script>
