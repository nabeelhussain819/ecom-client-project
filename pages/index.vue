<template>
  <div class="container">
    <masonry-list />
  </div>
</template>

<script>
import Vue from 'vue'
import MasonryList from '~/components/products/masonryList'
import Carousel from '~/components/ui/Carousel'
const components = { MasonryList, Carousel }
function showProductModal() {}

function data() {
  return {}
}

const method = { showProductModal }
export default Vue.extend({
  components,
  method,
  data,
  created() {
    // this.$nuxt.$on('showProductModal', (a, b) => {
    //   $this.visible = true
    // })
  },
})
</script>
