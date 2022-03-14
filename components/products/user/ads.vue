<template>
  <div class="py-4 border pl-3 pt-1 pb-0 ant-col ant-col-xs-24 ant-col-sm-24">
    <div>
      <h1 class="heading-ads">My Ads</h1>
      <a-col
        v-for="product in products"
        :key="product.id"
        :xs="24"
        :sm="6"
        class="profile-tile-width pt-4"
      >
        <tile :show-editable="true" :product="product" class="profile-cards" />
        <span v-if="!isEmpty(product)" :image="img"></span>
      </a-col>
    </div>
  </div>
</template>
<script>
import Product from '~/services/API/ProductServices'
import tile from '~/components/products/Tile'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { tile },
  data() {
    return {
      loading: false,
      user: {},
      products: [],
      img: 'https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png',
    }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    isEmpty,
    getProducts() {
      Product.self().then((products) => {
        this.products = products.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.heading-ads {
  font-size: 24px;
  font-weight: 700;
}
.profile-tile-width {
  width: auto;
}
</style>
