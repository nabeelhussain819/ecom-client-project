<template>
  <div>
    <a-card hoverable @click="goto(`/product/${product.guid}`)">
      <img slot="cover" alt="example" :src="product.cover_image" />
      <a-card-meta :title="product.name">
        <template slot="description"
          >$ {{ product.price }}
          <br />
          <span class="loacition" v-html="product.google_address"> </span>
        </template>
      </a-card-meta>
    </a-card>

    <a-button
      type="link"
      v-if="showEditable && product.is_owner"
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
