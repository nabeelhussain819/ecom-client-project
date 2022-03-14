<template>
  <div>
    <a-card hoverable class="product_card" @click="handleGotoLink(product)">
      <img
        slot="cover"
        class="tile_img"
        alt="example"
        :src="getFirstImage(service)"
      />
      <!-- :src="product.cover_image" -- /> -->
      <a-card-meta :title="service.name" class="product-title">
        <template slot="description"
          ><span class="price-tag">$ {{ service.price }} </span><br />
          <span class="location d-inline" v-html="service.google_address">
          </span>
        </template>
      </a-card-meta>
    </a-card>
    <a-button
      v-if="showEditable && service.is_owner"
      class="btn"
      type="primary"
      @click="goto(`/user/services/${service.guid}`)"
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
    service: {
      type: Object,
      default: () => {},
    },
    showEditable: { type: Boolean, default: false },
    gotoLink: { type: String, default: 'service' },
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
  max-height: 130px !important;
  object-fit: cover;
}
.price-tag {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.product-title {
  line-height: 24px;
}
</style>
