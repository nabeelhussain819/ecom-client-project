<template>
  <div class="owner-detail">
    <div v-if="!product.is_sold">
      <div v-if="!product.is_owner">
        <rating-avatar :product="product" />
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
    <div v-else>Sold</div>
  </div>
</template>
<script>
import ratingAvatar from '~/components/products/RatingAvatar'
import ShareAndSave from '~/components/products/ShareAndSave'
import ProductServices from '~/services/API/ProductServices'
import notifications from '~/mixins/notifications'
import ads from '~/components/products/Ads'
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
      offer: this.product.price,
      showPromoteModal: false,
    }
  },
  methods: {
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
  },
}
</script>
