<template>
  <div class="detail-slider">
    <VueSlickCarousel
      v-if="images.length > 0"
      :arrows="true"
      :adaptive-height="true"
      :dots="true"
    >
      <img
        v-for="image in images"
        :key="image"
        class="img-fluid"
        :src="image"
      />
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: { VueSlickCarousel },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
