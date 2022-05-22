<template>
  <div class="container container-buy-now">
    <h1>Confirm Purchase</h1>
    <a-row :gutter="16">
      <a-col :xs="24" :sm="24" class="">
        <div class="d-flex buy-slider-detail">
          <image-slider class="purchase_img_slider" :images="images" />
          <h2
            type="inline "
            :title="product.name"
            class="primary-text buy-price"
          >
            {{ product.name }}
          </h2>
        </div>
        <div class="purchase-content">
          <hr />
          <div class="shipping-option">
            <h2>Shipping to (required)</h2>
            <a class="btn-add" @click="goto('/purchase/add-shipping/')">Add</a>
          </div>
          <hr />
          <div class="payment-method-option">
            <h2>Payment method (required)</h2>
            <a class="btn-add" @click="showCardDetailModal(true)">Add</a>
          </div>
          <hr />
          <div class="item-price-tag">
            <h2>Item Price</h2>
            <h2>${{ product.price }}</h2>
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
              <b>{{ product.price }}$ </b>
            </h2>
          </div>
          <div class="protect-payment-main">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5NEy1Is3DEFYZM5YW4kcbRrTILo9ddmyJisQrqws5ylSUlNagQA5OaKQ6cN7BdvHRDw&usqp=CAU"
                width="100px"
              />
            </div>
            <div>
              <h2>2-Days Purchase Protection</h2>
              <p>
                Items shipped through FlexEmarket come with a 2-day purchase
                protection. <a href="javascript:;"> Learn more </a>
              </p>
            </div>
          </div>
        </div>
        <div class="confirm-purchase-main" style="text-align: center">
          <button class="btn ant-btn ant-btn-primary ant-btn-lg">
            Confirm Purchase
          </button>
          <div>
            <p class="label-confirm-purchase">
              By tapping "Confirm Purchase", you agree to the FlexEmarket
              <a href="javascript:;"> Term of Service</a>
            </p>
          </div>
        </div>
      </a-col></a-row
    >

    <a-modal
      :visible="cardModal"
      :width="900"
      title="Visa Card Detail"
      @cancel="showCardDetailModal(false)"
    >
      <VisaCard @cancel="showCardDetailModal" />
    </a-modal>
  </div>
</template>
<script>
import imageSlider from '~/components/sliders/ImageSlider'
import { isEmpty } from '~/services/Utilities'
import Product from '~/services/API/ProductServices'
import routeHelpers from '~/mixins/route-helpers'
import VisaCard from '~/components/purchase/cards'
export default {
  components: {
    imageSlider,
    VisaCard,
  },
  mixins: [routeHelpers],
  data() {
    return {
      loading: false,
      product: {},
      images: [],
      values: {},
      cardModal: false,
    }
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

      this.images = [
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
      ]
    },
    showCardDetailModal(show) {
      this.cardModal = show
    },
  },
}
</script>
