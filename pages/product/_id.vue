<template>
  <a-skeleton :loading="loading">
    <div class="center-container">
      <a-row :gutter="16">
        <a-col :xs="24" class="border" :sm="18">
          <image-slider :images="images" />
        </a-col>
        <a-col :xs="24" :sm="6"> <rating-avatar /> </a-col>
      </a-row>
      <comments /></div
  ></a-skeleton>
</template>
<script>
import Product from '~/services/API/Product'
import comments from '~/components/comments'
import imageSlider from '~/components/sliders/ImageSlider'

import ratingAvatar from '~/components/products/RatingAvatar'
import { isEmpty } from '~/services/Utilities'

export default {
  props: {
    comments,
    ratingAvatar,
    imageSlider,
  },
  data() {
    return { loading: false, product: {}, images: [] }
  },
  mounted() {
    this.getProduct(this.$route.params.id)
  },
  methods: {
    getProduct(id) {
      this.loading = true
      Product.get(id)
        .then((product) => {
          this.product = product
          this.getImages(product)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getImages(product) {
      if (!isEmpty(product.media)) {
        const tempImage = []
        product.media.map((images) => tempImage.push(images.url))
        this.images = tempImage
        return []
      }
      return []
    },
  },
}
</script>
