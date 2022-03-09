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
            <a href="#" target="_blank"><div class="icon-email"></div> </a>
            <a href="#" target="_blank"><div class="icon-mob"></div> </a>
            <a href="https://www.facebook.com/" target="_blank"
              ><div class="icon-fb"></div>
            </a>
            <a href="#" target="_blank"><div class="icon-chat"></div> </a>
          </span>
          <hr />
          <div class="profile-status px-2">
            <span>Followers </span><span>6</span>
          </div>
          <hr />
          <div class="profile-status px-2">
            <span>Following </span><span>9</span>
          </div>

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
          <editProfile class="p-3 edit-profile-form" />
          <hr />
        </a-col>
      </a-row></div
  ></a-skeleton>
</template>
<script>
import upload from '~/components/user/upload'
import editProfile from '~/components/user/EditProfile'
import Product from '~/services/API/ProductServices'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { upload, editProfile },
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
//some
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
.profile-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit-profile-form {
  width: 50%;
  margin: auto;
}
@media only screen and (max-width: 768px) {
  .edit-profile-form {
    width: 70%;
    margin: auto;
  }
}
</style>
