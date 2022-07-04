<template class="account-banner">
  <a-skeleton :loading="loading">
    <div class="center-container user-profile">
      <a-row :gutter="18" class="account-form-row">
        <a-col :xs="24" class="border profile-detail pt-4 px-0" :sm="6">
          <h1 class="text-center heading-profile">Account Settings</h1>
          <br />
          <upload
            v-if="!isEmpty(user)"
            :user="user"
            @afterUpload="afterUpload"
          />
          <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
          <span class="account-rating">
            <a-rate v-model="rating" allow-half />
            <span class="ant-rate-text">{{ rating }}</span>
          </span>
          <br />
          <hr />
          <br />
          <a-menu
            mode="inline"
            class="menu-account-settings"
            :default-selected-keys="['1']"
          >
            <a-menu-item key="1"> Account Settings </a-menu-item>
            <a-menu-item key="2" @click="goto('./account/transaction-history')">
              Transaction History
            </a-menu-item>
            <a-menu-item key="3"> Payment Methods </a-menu-item>
            <a-menu-item key="4"> Deposit Account </a-menu-item>
          </a-menu>
          <!-- <a-select
            label-in-value
            :default-value="{ key: 'Account Settings' }"
            class="account-setting-menu"
            @change="handleChange"
          >
            <a-select-option value="1"> Transaction History </a-select-option>
            <a-select-option value="2"> Payment Methods </a-select-option>
            <a-select-option value="3"> Deposit Account </a-select-option>
          </a-select> -->
          <!-- <hr class="devider" />
          <div class="profile-status px-2">
            <span>Followers </span><span>6</span>
          </div>
          <hr class="devider" />
          <div class="profile-status px-2">
            <span>Following </span><span>9</span>
          </div>

          <hr class="devider" />
          <a-button
            class="btn-follow"
            type="primary"
            style="text-align: center"
            block
            >Follow</a-button
          > -->
        </a-col>

        <a-col :xs="24" :sm="16" class="profile-tiles">
          <editProfile class="p-3 edit-profile-form" />
          <!-- <hr /> -->
        </a-col>
      </a-row>
    </div></a-skeleton
  >
</template>
<script>
import upload from '~/components/user/upload'
import editProfile from '~/components/user/EditProfile'
import Product from '~/services/API/ProductServices'
import { isEmpty } from '~/services/Utilities'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'

export default {
  components: { editProfile, upload },
  mixins: [userDetail, routeHelpers],
  data() {
    return {
      loading: false,
      user: {},
      products: [],
      rating: 4.5,
    }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    handleChange(value) {
      console.log(value) // account setting values in dropdown
    },
    afterUpload() {
      this.getUserDetails()
    },
    isEmpty,
    getProducts() {
      Product.self().then((products) => {
        this.products = products.data
      })
    },
  },
}
</script>
