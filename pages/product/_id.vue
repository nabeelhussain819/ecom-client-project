<template>
  <a-skeleton :loading="loading">
    <div class="center-container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="17">
          <image-slider :images="images" />
          <h1 :title="product.name" class="primary-text">
            ${{ product.price }} {{ product.name }}
          </h1>
          <a-divider></a-divider>
          <div>{{ product.categoryDetails }}</div>
          <a-divider></a-divider>
          <h2 class="heading">Description</h2>
          {{ product.description }}

          <h4 class="heading">Attributes</h4>
          <ul v-if="product.category">
            <li
              v-for="attribute in product.category.attributes"
              :key="attribute.id"
            >
              <strong>{{ attribute.name }}: </strong>
              {{
                Array.isArray(values[attribute.id])
                  ? values[attribute.id].join(', ')
                  : values[attribute.id]
              }}
            </li>
          </ul>
        </a-col>
        <a-col :xs="24" :sm="7">
          <owner-detail :product="product" />
          <map-view />
        </a-col>
        <a-col :xs="24">
          <related-category />
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>
<script>
import Product from '~/services/API/ProductServices'
import imageSlider from '~/components/sliders/ImageSlider'
import OwnerDetail from '~/components/products/OwnerDetail'
import mapView from '~/components/maps/MapView'
import RelatedCategory from '~/components/products/RelatedCategory'
import { isEmpty } from '~/services/Utilities'

export default {
  components: {
    OwnerDetail,
    imageSlider,
    mapView,
    RelatedCategory,
  },
  data() {
    return { loading: false, product: {}, images: [], values: {} }
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

          product.products_attributes.map(
            (a) => (this.values[a.attribute_id] = a.value)
          )
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
