<template class="">
  <div class="container">
    <a-row class="profile-row">
      <a-col :xs="12" class="profile-detail" :sm="6">
        <h1 class="text-center heading-profile">Rate Seller</h1>
        <img :src="user.profile_url" class="preview-dp" alt="avatar" />
        <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
        <h3 class="join-date text-center text-capitalize">4.7/5.0</h3>
      </a-col>
    </a-row>
    <div class="stars">
      <a-rate allow-half class="ant-rate-star" />
    </div>
    <h2><button v-click="nextPage(id)">Request Refund?</button></h2>
    <p>
      Note: You can claim refund within 48 hours after the parcel has been
      shipped to you
    </p>
    <a-button class="btn-contact" block>Contact Buyer/Seller(chat)</a-button>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Utilities'
export default {
  data() {
    return { loading: false, user: {} }
  },
  props: {
    id: String,
  },
  mounted() {
    this.user = this.$store.getters.getUser
    console.log(this.id)
    // this.getProducts()
  },
  methods: {
    isEmpty,
    nextPage(id) {
      this.$router.push({
        path: `/product/refund/${id}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.btn-contact {
  color: #ec2a8b;
  background-color: #fff;
  border: 1px solid #ec2a8b;
}
.heading-profile {
  font-size: 24px;
  font-weight: 700;
}
.profile-banner {
  background-image: url('https://www.teahub.io/photos/full/254-2549402_background-facebook-cover-photo-size.jpg');
  background-repeat: no-repeat;
}
.stars {
  padding-left: 20%;
  margin-bottom: 90px;
}
.ant-rate-star {
  color: gold;
  font-size: 500%;
  width: 100%;
}
.profile-detail {
  width: 260px;
  height: 316px !important;
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
