<template>
  <a-skeleton :loading="loading">
    <div class="center-container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="18">
          <image-slider :images="images" />
          <h1 :title="product.name" class="primary-text">
            ${{ product.price }} {{ product.name }}
          </h1>

          <a-divider></a-divider>
          <h2 class="heading">Description</h2>
          {{ product.description }}
        </a-col>
        <a-col :xs="24" :sm="6"> <owner-detail :product="product" /> </a-col>
      </a-row>
      <a-divider></a-divider>
      <h2 class="heading">Add Comment</h2>
      <comments /></div
  ></a-skeleton>
</template>
<script>
import Product from '~/services/API/Product'
import comments from '~/components/comments'
import imageSlider from '~/components/sliders/ImageSlider'
import OwnerDetail from '~/components/products/OwnerDetail'
import { isEmpty } from '~/services/Utilities'

export default {
  components: {
    comments,
    OwnerDetail,
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
