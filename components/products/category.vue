<template>
  <span>
    <span v-for="category in product.categories" :key="category.id">{{
      category.name
    }}</span>
  </span>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
}
</script>
