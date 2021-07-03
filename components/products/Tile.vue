<template>
  <a-card hoverable @click="goto(product.guid)">
    <img slot="cover" alt="example" :src="product.cover_image" />
    <a-card-meta :title="product.name">
      <template slot="description">$ {{ product.price }} </template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setImage() {},
    goto(guid) {
      this.$router.push({ path: `/product/${guid}` })
    },
  },
}
</script>
