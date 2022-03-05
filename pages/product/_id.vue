<template>
  <a-skeleton :loading="loading">
    <div class="center-container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="17" class="left_product_detail">
          <image-slider class="product_img_slider" :images="images" />
          <h1
            type="inline "
            :title="product.name"
            class="primary-text product-price"
          >
            ${{ product.price }}
          </h1>
          <h2 type="inline" class="product-name">{{ product.name }}</h2>
          <div class="local_address">
            <span slot="renderItem" slot-scope="">
              <span class="address"
                >Address
                <a-icon
                  type="environment"
                  theme="filled"
                  class="product_view_style"
                />
                (near by)
              </span>
              <div>
                20/2/2020 ago in
                <span class="product_view_style"> {{ product.name }}</span>
              </div>
            </span>
          </div>
          <div>{{ product.categoryDetails }}</div>
          <a-divider />
          <h3 class="heading">Description</h3>
          {{ product.description }}
          <a-divider />
          <h3 class="heading">Pick up Locally</h3>
          <span
            >lorem ipsum dolor qwerty, repellendus officiis earum sint quibusdam
            iure!</span
          >
          <br />
          <a class="product_view_style">Learn more about pickup</a>
          <a-descriptions
            v-if="product.category"
            title="Properties"
            class="pt-3"
          >
            <!-- removed bordered above -->
            <a-descriptions-item
              v-for="attribute in product.category.attributes"
              :key="attribute.id"
              :label="attribute.name"
            >
              {{
                Array.isArray(values[attribute.id])
                  ? values[attribute.id].join(', ')
                  : values[attribute.id]
              }}</a-descriptions-item
            >
          </a-descriptions>
        </a-col>
        <a-col :xs="24" :sm="7" class="right_product_detail">
          <owner-detail :product="product" />
          <map-view
            v-if="product"
            :lat="product.latitude"
            :lng="product.longitude"
          />
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
        return
      }
      console.log('product', product)
      this.images = [
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
      ]
    },
  },
}
</script>
<style scoped>
.product-price {
  display: inline-block;
  font-size: 28px;
  font-weight: 700;
}
.product_img_slider {
  margin-bottom: 20px;
}
.product-name {
  display: inline-block;
}
.product_view_style {
  color: #ec2a8b;
}
</style>
