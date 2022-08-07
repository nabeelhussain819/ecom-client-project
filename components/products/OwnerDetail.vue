<template>
  <a-skeleton :loading="isEmpty(product)">
    <div class="owner-detail">
      <div v-if="!product.is_sold">
        <rating-avatar :product="product" />
        <div v-if="!product.is_owner">
          <a-button
            class="btn primary"
            type="primary"
            :size="size"
            @click="handleOk"
          >
            Make An Offer
          </a-button>
          <a-button class="btn" :size="size" @click="goto('/product/ask')">
            Ask
          </a-button>
          <a-button
            class="btn btn-secondary"
            :size="size"
            @click="buyNow(product)"
            v-if="product.has_shipping"
          >
            Buy Now
          </a-button>
          <share-and-save :product="product" />
        </div>
        <div v-else>
          <a-button
            v-if="!product.featured && !product.hired"
            class="btn"
            type="primary"
            :size="size"
            @click="handlePromoteModal(true)"
          >
            Promote
          </a-button>
        </div>
        <a-modal
          title="Make an Offer"
          :visible="visible"
          @cancel="handleOk"
          @ok="makeOffer"
          class="offer-model"
        >
          <a-input-number
            v-model="offer"
            placeholder="Offer"
            style="width: 100%"
          />
        </a-modal>
        <a-modal
          title=""
          :width="1200"
          :footer="null"
          :visible="showPromoteModal"
          @cancel="handlePromoteModal(false)"
          @click="handlePromoteModal(true)"
        >
          <ads :product="product" />
        </a-modal>
      </div>
      <div v-else>
        <!-- <a-row :gutter="2">
          <a-col :xs="24" :sm="4">
            <a-avatar :size="avatarSize" :src="product.user.profile_url" />
          </a-col>
          <a-col :xs="24" :sm="18">
            <span>
              <span class="name"> {{ product.user.name }}</span>
              <br />
              <a-rate v-model="rating" allow-half />
              <span class="ant-rate-text">{{ rating }}</span>
            </span></a-col
          >
        </a-row> -->
        <div class="sold-product-img" style="text-align: center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVEstOO0Jy-dIT9ruP_RLZOd9puscUTE-Vg&usqp=CAU"
            alt="sold"
            width="80px"
          />
        </div>
        <hr />
        <a-row class="saveAndshare">
          <a-col :xs="{ span: 2 }" :sm="{ span: 11 }">
            <a-button @click="save(!isSaved)">
              <span v-if="isSaved">
                <a-icon theme="filled" type="heart" /> Unsave
              </span>
              <span v-else> <a-icon type="heart" /> Save </span>
            </a-button>
          </a-col>
          <a-col :xs="{ span: 2 }">
            <a-divider type="vertical" />
          </a-col>
          <a-col :xs="{ span: 2 }" :sm="{ span: 11 }">
            <a-button type="" icon="share-alt"> Share</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-skeleton>
</template>
<script>
import ratingAvatar from '~/components/products/RatingAvatar'
import ShareAndSave from '~/components/products/ShareAndSave'
import ProductServices from '~/services/API/ProductServices'
import notifications from '~/mixins/notifications'
import ads from '~/components/products/Ads'
import { isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'

import { EVENT_LOGIN_MODAL } from '~/services/Constant'

export default {
  components: { ads, ratingAvatar, ShareAndSave },
  mixins: [notifications, routeHelpers],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      size: 'large',
      visible: false,
      isSaved: false,
      offer: this.product.price,
      showPromoteModal: false,
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
  },
  mounted() {
    this.isSaved = this.product.isSaved
    if (this.product.hired && window.LiveChatWidget)
      window.LiveChatWidget.call('maximize')
  },
  beforeDestroy() {
    if (window.LiveChatWidget) window.LiveChatWidget.call('hide')
  },
  methods: {
    isEmpty,
    handleOk() {
      if (this.isAuth) {
        this.visible = !this.visible
      } else {
      }
    },
    buyNow(product) {
      if (this.isAuth) {
        this.goto(`/product/purchase/${product.guid}`)
      } else {
        this.$nuxt.$emit(EVENT_LOGIN_MODAL, true)
      }
    },
    handlePromoteModal(show) {
      this.showPromoteModal = show
    },
    makeOffer() {
      ProductServices.offer(this.product.guid, {
        offer: this.offer,
      })
        .then((res) => this.handleOk())
        .catch(this.error)
    },
    save(isSaved) {
      this.isSaved = isSaved
      ProductServices.saved(this.product.guid, {}).then()
    },
  },
}
</script>
<style scoped>
.sold-product-img {
  text-align: center;
}
</style>
