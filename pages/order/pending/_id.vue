<template>
  <a-list
    item-layout="horizontal"
    :loading="loading"
    class="product-detail-list container"
    :data-source="data"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <!-- <a slot="title" class="text-capitalize" href="https://www.antdv.com/">
          {{ item.product.name }}
        </a> -->
        <div slot="description">
          <div class="left">
            <h1>My Offer</h1>
            <a-col :xs="24" :sm="17" class="left_product_detail">
              <image-slider class="product_img_slider" :images="images" />
              <h1
                type="inline "
                :title="item.buyer.name"
                class="primary-text product-price"
              >
                ${{ item.buyer.name }}
              </h1>
              <h2 type="inline" class="product-name">
                {{ item.product.name }}
              </h2>
              <div class="purchase-content">
                <hr />
                <div class="shipping-option">
                  <h2>Shipping to (required)</h2>
                  <a class="btn-add">Add</a>
                  <!-- <pre>{{ shiping_details }}</pre> -->
                </div>
                <hr />
                <div class="payment-method-option">
                  <h2>Payment method (required)</h2>
                </div>
                <hr />
                <div class="item-price-tag">
                  <h2>Item Price</h2>
                  <h2>${{ item.product.price }}</h2>
                </div>
                <div class="shipping-price-tag">
                  <h2>Shipping Price</h2>
                  <h2>$7.00 Static</h2>
                </div>
                <div class="sales-tax-tag">
                  <h2>Sales Tax (Estimated)</h2>
                  <h2>$7.00 Static</h2>
                </div>
                <div class="payed-tag">
                  <h2><b> You Pay</b></h2>
                  <h2>
                    <b>{{ item.product.price }}$ </b>
                  </h2>
                </div>
              </div>
              <div>{{ item.product.categoryDetails }}</div>
              <a-divider />
              <h3 class="heading">Description</h3>
              <p></p>
              <a-divider />
              <h3 class="heading">Pick up Locally</h3>
              <span>lorem ipsum dolor qwerty,quibusdamiure!</span>
              <br />
              <a class="product_view_style">Learn more about pickup</a>
            </a-col>
          </div>
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import notifications from '~/mixins/notifications'
import { isEmpty } from '~/services/Helpers'
import OfferServices from '~/services/API/OfferServices'
import routeHelpers from '~/mixins/route-helpers'
import imageSlider from '~/components/sliders/ImageSlider'

export default {
  components: {
    imageSlider,
  },
  mixins: [notifications, routeHelpers],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: {},
      size: 'large',
      images: [],
      visible: false,
      isSaved: false,
      showPromoteModal: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      OfferServices.index(this.$route.params.id)
        .then((response) => {
          this.data = response
          console.log(response)
          this.getImages(response)
        })
        .finally(() => (this.loading = false))
    },
    isEmpty,
    handleOk() {
      if (this.isAuth) {
        this.visible = !this.visible
      } else {
      }
    },
    getImages(product) {
      if (!isEmpty(product.media)) {
        const tempImage = []
        product.media.map((images) => tempImage.push(images.url))
        this.images = tempImage
        return
      }

      this.images = [
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
      ]
    },
  },
}
</script>
<style scoped>
.sold-product-img {
  text-align: center;
}
</style>
