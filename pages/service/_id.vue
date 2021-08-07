<template>
  <a-skeleton :loading="loading">
    <div class="center-container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="17">
          <image-slider :images="images" />
          <h1 :title="service.name" class="primary-text">
            ${{ service.price }} {{ service.name }}
          </h1>
          <a-divider></a-divider>
          <div>{{ service.categoryDetails }}</div>
          <a-divider></a-divider>
          <h2 class="heading">Description</h2>
          {{ service.description }}

          <h4 class="heading">Attributes</h4>
          <ul v-if="service.category">
            <li
              v-for="attribute in service.category.attributes"
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
          <owner-detail :service="service" />
          <map-view />
        </a-col>
        <a-col :xs="24">
          <related-category />
        </a-col>
      </a-row></div
  ></a-skeleton>
</template>
<script>
import Services from '~/services/API/Services'
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
    return { loading: false, service: {}, images: [], values: {} }
  },
  mounted() {
    this.getService(this.$route.params.id)
  },
  methods: {
    getService(id) {
      this.loading = true
      Services.get(id)
        .then((service) => {
          this.service = service
          this.getImages(service)

          service.services_attributes.map(
            (a) => (this.values[a.attribute_id] = a.value)
          )
        })
        .finally(() => {
          this.loading = false
        })
    },
    getImages(service) {
      if (!isEmpty(service.media)) {
        const tempImage = []
        service.media.map((images) => tempImage.push(images.url))
        this.images = tempImage
        return []
      }
      return []
    },
  },
}
</script>
