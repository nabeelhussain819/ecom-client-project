<template>
  <div class="py-4 border pl-3 pt-1 pb-0 ant-col ant-col-xs-24 ant-col-sm-24">
    <div>
      <h1 class="heading-ads">My Ads</h1>
      <a-tabs default-active-key="1" @change="changeTab">
        <a-tab-pane key="1" tab="Products">
          <a-skeleton :loading="loading">
            <a-col
              v-for="product in products"
              :key="product.id"
              :xs="24"
              :sm="6"
              class="profile-tile-width pt-4"
            >
              <tile
                :show-editable="true"
                :product="product"
                class="profile-cards"
              />
              <span v-if="!isEmpty(product)" :image="img"></span>
            </a-col>
          </a-skeleton>
        </a-tab-pane>
        <a-tab-pane key="service" tab="Services">
          <a-skeleton :loading="serviceLoading">
            <a-row>
              <a-col
                v-for="service in services"
                :key="service.id"
                :xs="24"
                :sm="6"
                :md="4"
              >
                <service-tile
                  :show-editable="true"
                  :service="service"
                  class="profile-cards"
                />
              </a-col>
            </a-row>
          </a-skeleton>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import Product from '~/services/API/ProductServices'
import tile from '~/components/products/Tile'
import { isEmpty } from '~/services/Utilities'
import Services from '~/services/API/Services'
import ServiceTile from '~/components/services/Tile'
export default {
  components: { tile, 'service-tile': ServiceTile },
  data() {
    return {
      loading: false,
      user: {},
      products: [],
      img: 'https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png',
      services: null,
      serviceLoading: false,
    }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    isEmpty,
    getProducts() {
      this.loading = true
      Product.self()
        .then((products) => {
          this.products = products.data
        })
        .finally(() => (this.loading = false))
    },
    changeTab(tab) {
      if (tab === 'service') {
        this.serviceLoading = true
        Services.self()
          .then((response) => {
            this.services = response.data
          })
          .finally(() => (this.serviceLoading = false))
      }
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
