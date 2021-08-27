<template>
  <div>
    <a-card
      hoverable
      class="product_card"
      @click="goto(`/product/${product.guid}`)"
    >
      <img
        slot="cover"
        class="tile_img"
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <!-- :src="product.cover_image" -- /> -->
      <a-card-meta :title="product.name">
        <template slot="description"
          >$ {{ product.price }}
          <span class="location" v-html="product.google_address"> </span>
        </template>
      </a-card-meta>
    </a-card>

    <a-button
      v-if="showEditable && product.is_owner"
      type="link"
      @click="goto(`/user/product/${product.guid}`)"
      >edit</a-button
    >
  </div>
</template>

<script>
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [routeHelpers],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    showEditable: { type: Boolean, default: false },
  },
  methods: {
    setImage() {},
    editPage(url) {
      console.log(url)
    },
  },
}
</script>
<style scoped>
.tile_product {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tile_img {
  background-size: cover;
  max-height: 130px !important;
  object-fit: cover;
}
</style>
