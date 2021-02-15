<template>
  <a-card hoverable>
    <img slot="cover" alt="example" :src="product.media[0].url" />
    <a-card-meta :title="product.name">
      <template slot="description">${{ product.price }} </template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    setImage() {},
  },
}
</script>
