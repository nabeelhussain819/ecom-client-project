<template>
  <a-skeleton :loading="loading">
    <div class="center-container user-profile">
      <a-row :gutter="18">
        <a-col :xs="24" class="border profile-detail" :sm="6">
          <upload />
          <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
        </a-col>
        <a-col :xs="24" :sm="16">
          <a-card
            v-for="product in products"
            :key="product.id"
            hoverable
            style="width: 240px"
          >
            <img slot="cover" alt="example" :src="product.media[0].url" />
            <a-card-meta :title="product.name">
              <template slot="description">
                {{ product.description }}
                <span @click="goto(product.guid)">edit</span>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div></a-skeleton
  >
</template>
<script>
import upload from '~/components/user/upload'
import Product from '~/services/API/Product'
export default {
  components: { upload },
  data() {
    return { loading: false, user: {}, products: [] }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    getProducts() {
      Product.self().then((products) => {
        this.products = products.data
      })
    },
    goto(guid) {
      this.$router.push({ path: `/user/product/${guid}` })
    },
  },
}
</script>
<style scoped lang="scss">
.user-profile {
  .profile-detail {
    padding: 15px;
  }
}
</style>
