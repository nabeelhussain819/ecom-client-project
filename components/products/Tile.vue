<template>
  <div class="">
    <a-card
      @click="handleGotoLink(product)"
      hoverable
      v-if="insane === false"
      style="width: 220px"
    >
      <template #cover>
        <img
          slot="cover"
          class="tile_img card-image"
          alt="example"
          :src="getFirstImage(product)"
        />
        <figure v-if="product.featured">
          <span class="figure tag tag-featured">FEATURE</span>
        </figure>
        <figure class="img" v-if="product.has_shipping">
          <span class="img1"></span>
        </figure>
      </template>
      <a-card-meta :title="product.name">
        <template slot="description"
          ><span class="price-tag">$ {{ product.price }}</span>
          <span
            class="location d-inline"
            v-html="product.google_address"
          ></span>
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
  data() {
    return {
      user: {},
      insane: true,
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.checkOrder(this.product)
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
    checkOrder(product) {
      if (this.isAuth) {
        if (product.order) {
          if (product.order.buyer_id === this.user.id) {
            this.insane = true
          } else {
            this.insane = false
          }
        } else {
          this.insane = false
        }
      } else {
        this.insane = false
      }
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
  height: 160px !important;
  object-fit: cover;
  max-width: 100%;
}
.price-tag {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.product-title {
  line-height: 20px;
}
</style>
