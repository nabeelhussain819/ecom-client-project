<template>
  <div>
    <a-button v-if="!showChose" class="editable-add-btn" @click="getPostType()">
      Back
    </a-button>

    <a-row>
      <a-col :xs="24" :span="12">
        <product v-if="showProduct" />
      </a-col>

      <a-col v-if="showChose" :xs="24" :span="12">
        <choose-post @getPostType="getPostType" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import AddProduct from '~/components/products/AddProduct'
import Product from '~/components/products'
import ChoosePost from '~/components/categories/ChoosePost'
import { PRODUCT_ID, CATEGORY_ID } from '~/services/Constant'

function offAllDiv() {
  this.showCategory = false
  this.showChose = false
  this.showProduct = false
}
function getPostType(type) {
  this.offAllDiv()
  switch (type) {
    case PRODUCT_ID:
      this.showProduct = true
      break
    case CATEGORY_ID:
      this.showCategory = true
      break
    default:
      this.showChose = true
  }
}
const methods = {
  getPostType,
  offAllDiv,
}
export default {
  components: { AddProduct, ChoosePost, Product },
  data() {
    return {
      showCategory: false,
      showChose: true,
      showProduct: false,
    }
  },
  methods,
}
</script>
