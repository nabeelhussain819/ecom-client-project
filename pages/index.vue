<template>
  <div class="container">
    <carousel />
    <masonry-list />
  </div>
</template>

<script>
import Vue from 'vue'
import MasonryList from '~/components/products/masonryList.vue'
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
