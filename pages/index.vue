<template>
  <div class="container"><masonryList /></div>
</template>

<script>
import Vue from 'vue'
import masonryList from '~/components/products/masonryList.vue'
const components = { masonryList }
export default Vue.extend({ components })
</script>
