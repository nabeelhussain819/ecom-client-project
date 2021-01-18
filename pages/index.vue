<template>
  <div class="container">
    <carousel />
    <masonryList />
    </div>
</template>

<script>
import Vue from 'vue'
import masonryList from '~/components/products/masonryList.vue'
import Carousel from '~/components/UI/Carousel.vue'
const components = { masonryList }
export default Vue.extend({
  components: { Carousel }, components })

</script>
