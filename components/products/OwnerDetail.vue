<template>
  <div class="owner-detail">
    <rating-avatar :product="product" />
    <a-button class="btn primary" type="primary" :size="size" @click="handleOk">
      Make An Offer
    </a-button>
    <a-button class="btn" :size="size"> Ask</a-button>
    <a-button class="btn btn-secondary" :size="size"> Buy Now</a-button>
    <share-and-save :product="product" />
    <a-modal
      title="Make an Offer"
      :visible="visible"
      @cancel="handleOk"
      @ok="makeOffer"
    >
      <a-input-number v-model="offer" placeholder="Offer" style="width: 100%" />
    </a-modal>
  </div>
</template>
<script>
import ratingAvatar from '~/components/products/RatingAvatar'
import ShareAndSave from '~/components/products/ShareAndSave'
import ProductServices from '~/services/API/ProductServices'
import notifications from '~/mixins/notifications'
export default {
  components: {
    ratingAvatar,
    ShareAndSave,
  },
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
    }
  },
  methods: {
    handleOk() {
      this.visible = !this.visible
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
