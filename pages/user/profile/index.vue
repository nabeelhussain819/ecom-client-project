<template class="profile-banner">
  <div class="center-container">
    <a-row class="profile-row">
      <a-col :xs="24" class="border profile-detail py-4" :sm="6">
        <h1 class="text-center heading-profile">Profile</h1>
        <upload v-if="!isEmpty(user)" :user="user" />
        <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
        <h3 class="join-date text-center text-capitalize">
          Joined November 2022
        </h3>
        <hr class="divider" />
        <span id="profile-icon">
          <a href="#" target="_blank"><div class="icon-email"></div> </a>
          <a href="#" target="_blank"><div class="icon-mob"></div> </a>
          <a href="https://www.facebook.com/" target="_blank"
            ><div class="icon-fb"></div>
          </a>
          <a href="#" target="_blank"><div class="icon-chat"></div> </a>
        </span>
        <hr class="divider" />
        <div class="profile-status px-2">
          <span>Followers </span><span>6</span>
        </div>
        <hr class="divider" />
        <div class="profile-status px-2">
          <span>Following </span><span>9</span>
        </div>

        <hr class="divider" />
        <a-button
          class="btn-follow"
          type="primary"
          style="text-align: center"
          block
          >Follow</a-button
        >
      </a-col>
      <a-col :xs="24" class="" :sm="18">
        <ads />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Utilities'
import upload from '~/components/user/upload'
import ads from '~/components/products/user/ads.vue'
export default {
  components: { ads, upload },
  data() {
    return { loading: false, user: {}, products: [] }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    // this.getProducts()
  },
  methods: {
    isEmpty,
  },
}
</script>

<style scoped lang="scss">
.heading-profile {
  font-size: 24px;
  font-weight: 700;
}
.profile-banner {
  background-image: url('https://www.teahub.io/photos/full/254-2549402_background-facebook-cover-photo-size.jpg');
  background-repeat: no-repeat;
}
.profile-detail {
  width: 260px;
  height: 475px !important;
  padding: 15px;
  .btn-follow {
    margin-top: 20px;
  }
}
.profile-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.save-new {
  margin-left: 20px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 24px;
  font-weight: 700;
  height: 40px;
  width: 40px;
  padding: 0;
}
.profile-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
