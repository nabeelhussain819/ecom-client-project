<template>
  <div class="container">
    <carousel />
    <masonry-list />
    <a-modal
      v-model="visible"
      title="Add Products"
      destroy-on-close
      footer
      width="80%"
    >
      <add-product></add-product>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import addProduct from '~/components/products/AddProduct'
import masonryList from '~/components/products/masonryList.vue'
import Carousel from '~/components/UI/Carousel.vue'
const components = { masonryList, Carousel, addProduct }
function showProductModal() {}

function data() {
  return { visible: false }
}

const method = { showProductModal }
export default Vue.extend({
  components,
  method,
  data,
  created() {
    const $this = this
    this.$nuxt.$on('showProductModal', (a, b) => {
      $this.visible = true
      console.log(a, b)
    })
  },
})
</script>
