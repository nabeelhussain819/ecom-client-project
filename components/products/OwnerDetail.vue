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
          <a-button class="btn" :size="size"> Ask</a-button>
          <a-button class="btn btn-secondary" :size="size"> Buy Now</a-button>
          <share-and-save :product="product" />
        </div>
        <div v-else>
          <a-button
            class="btn"
            type="primary"
            @click="handlePromoteModal(true)"
            :size="size"
          >
            Promote</a-button
          >
        </div>
        <a-modal
          title="Make an Offer"
          :visible="visible"
          @cancel="handleOk"
          @ok="makeOffer"
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
          :visible="showPromoteModal"
          @cancel="handlePromoteModal(false)"
          @click="handlePromoteModal(true)"
          ><ads
        /></a-modal>
      </div>
      <div v-else>
        <a-row :gutter="2">
          <a-col :xs="24" :sm="4">
            <a-avatar
              :size="avatarSize"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-col>
          <a-col :xs="24" :sm="18">
            <span>
              <span class="name"> {{ product.user.name }}</span>
              <br />
              <a-rate v-model="rating" allow-half />
              <span class="ant-rate-text">{{ rating }}</span>
            </span></a-col
          >
        </a-row>
        Sold
        <hr />
        <a-col class="saveAndshare">
          <a-button @click="save(!isSaved)">
            <span v-if="isSaved">
              <a-icon theme="filled" type="heart" /> Unsave
            </span>
            <span v-else> <a-icon type="heart" /> Save </span>
          </a-button></a-col
        >
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
export default {
  components: { ads, ratingAvatar, ShareAndSave },
  mixins: [notifications],
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
  mounted() {
    this.isSaved = this.product.isSaved
  },
  methods: {
    isEmpty,
    handleOk() {
      this.visible = !this.visible
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
