<template class="profile-banner">
  <a-skeleton :loading="loading">
    <div class="center-container user-profile">
      <a-row :gutter="18">
        <a-col :xs="24" class="border profile-detail py-4" :sm="6">
          <h1 class="text-center heading-profile">Profile</h1>
          <upload v-if="!isEmpty(user)" :user="user" />
          <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
          <h3 class="join-date text-center text-capitalize">
            Joined November 2022
          </h3>
          <hr />
          <span id="profile-icon">
            <a-button type="" class="icon-email"> </a-button>
            <a-button type="" class="icon-mob"> </a-button>
            <a-button class="icon-fb"></a-button>
            <a-button type="" class="icon-chat"> </a-button>
          </span>
          <hr />
          <span> Followers (6)</span>
          <hr />
          <span> Following (9)</span>
          <hr />
          <a-button
            class="btn-follow"
            type="primary"
            style="text-align: center"
            block
            >Follow</a-button
          >
        </a-col>

        <a-col :xs="24" :sm="16" class="profile-tiles px-3 pt-1 pb-0">
          <editProfile />
          <a-row :gutter="18">
            <a-col
              v-for="product in products"
              :key="product.id"
              :xs="24"
              :sm="6"
              class="profile-tile-width"
            >
              <!-- editabel 'falsed', if needed make 'true'-->
              <tile
                :show-editable="true"
                :product="product"
                class="profile-cards"
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row></div
  ></a-skeleton>
</template>
<script>
import upload from '~/components/user/upload'
import editProfile from '~/components/user/EditProfile'
import Product from '~/services/API/ProductServices'
import tile from '~/components/products/Tile'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { upload, tile, editProfile },
  data() {
    return { loading: false, user: {}, products: [] }
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
<style scoped lang="scss">
.profile-banner {
  background-image: url('https://www.teahub.io/photos/full/254-2549402_background-facebook-cover-photo-size.jpg');
  background-repeat: no-repeat;
  .heading-profile {
    font-size: 27px;
  }
  .profile-detail {
    width: 260px;
    padding: 15px;
    .btn-follow {
      margin-top: 50px;
    }
  }
}
</style>
