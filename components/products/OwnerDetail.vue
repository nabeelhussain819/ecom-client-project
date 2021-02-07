<template>
  <div class="owner-detail">
    <rating-avatar :product="product" />
    <a-button class="btn primary" type="primary" :size="size">
      Make An Offer
    </a-button>
    <a-button class="btn" :size="size"> Ask </a-button>
    <a-button class="btn btn-secondary" :size="size"> Buy Now </a-button>
  </div>
</template>
<script>
import ratingAvatar from '~/components/products/RatingAvatar'
export default {
  components: {
    ratingAvatar,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      size: 'large',
    }
  },
}
</script>
