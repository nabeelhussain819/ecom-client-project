<template>
  <div class="container-box ask-main">
    <div class="d-flex">
      <h1>Send a Message</h1>
      <a-button @click="goto('/')">Cancel</a-button>
    </div>
    <!-- slider is not displaying -->
    <image-slider class="purchase_img_slider" :images="images" />
    <div class="toSpace">
      <hr />
      <p class="label">Click a Message to send or write your own</p>
      <ul class="msgs-list">
        <li class="msg">General question template</li>
        <li class="msg">General question template</li>
        <li class="msg">General question template</li>
        <li class="msg">General question template</li>
      </ul>
      <span>Send a message</span>
      <textarea
        name="msg"
        class="msg-area"
        rows="3"
        style="width: 100%"
      ></textarea>
      <button type="submit" class="ant-btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
// import imageSlider from '~/components/sliders/ImageSlider'
// import Product from '~/services/API/ProductServices'
// import { isEmpty } from '~/services/Utilities'

export default {
  mixins: [routeHelpers],
  //   data() {
  //     return { loading: false, product: {}, images: [], values: {} }
  //   },
  //   mounted() {
  //     // this.getProduct(this.$route.params.id)
  //   },
  //   method: {
  //     getProduct(id) {
  //       this.loading = true
  //       Product.get(id)
  //         .then((product) => {
  //           this.product = product
  //           this.getImages(product)

  //           product.products_attributes.map(
  //             (a) => (this.values[a.attribute_id] = a.value)
  //           )
  //         })
  //         .finally(() => {
  //           this.loading = false
  //         })
  //     },
  //     getImages(product) {
  //       if (!isEmpty(product.media)) {
  //         const tempImage = []
  //         product.media.map((images) => tempImage.push(images.url))
  //         this.images = tempImage
  //         return
  //       }

  //       this.images = [
  //         'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
  //       ]
  //     },
  //   },
}
</script>
