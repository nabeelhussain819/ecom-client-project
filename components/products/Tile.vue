<template>
  <div>
    <a-card hoverable class="product_card" @click="handleGotoLink(product)">
      <img
        slot="cover"
        class="tile_img card-image"
        alt="example"
        :src="getFirstImage(product)"
      />
      <figure v-if="product.featured" class="figure tag tag-featured"></figure>
      <figure class="img" v-if="product.has_shipping">
        <span class="img1"></span>
      </figure>
      <a-card-meta :title="product.name" class="product-title">
        <template slot="description"
          ><span class="price-tag"
            >$ {{ product.price }}
            <a-tag v-if="!product.active" color="red">inactive </a-tag>
          </span>
          <br v-if="!product.active" />
          <span class="location d-inline" v-html="product.google_address">
          </span>
        </template>
      </a-card-meta>
    </a-card>
    <a-button
      v-if="showEditable && product.is_owner"
      class="btn"
      type="primary"
      @click="goto(`/user/product/${product.guid}`)"
      >edit</a-button
    >
  </div>
</template>

<script>
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Utilities'
export default {
  mixins: [routeHelpers],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    showEditable: { type: Boolean, default: false },
    gotoLink: { type: String, default: 'product' },
  },
  methods: {
    getFirstImage(product) {
      if (!isEmpty(product.media)) {
        return product.media[0].url
      }
      return 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    editPage(url) {
      console.log(url)
    },
    handleGotoLink(entity) {
      return this.goto(`/${this.gotoLink}/${entity.guid}`)
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
  height: 145px !important;
  object-fit: cover;
  max-width: 100%;
}
.price-tag {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.product-title {
  line-height: 24px;
}
</style>
