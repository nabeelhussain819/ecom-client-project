<template>
  <div class="container-box ask-main">
    <div class="d-flex">
      <h1>Send a Message</h1>
      <a-button @click="goto('/')">Cancel</a-button>
    </div>
    <!-- slider is not displaying -->
    <image-slider class="" :images="images" />
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
import imageSlider from '~/components/sliders/ImageSlider'
// import { isEmpty } from '~/services/Helpers'

export default {
  mixins: [routeHelpers, imageSlider],
    data() {
      return {
        images: [],
      }
    },
    method: {
      getImages(product) {
        if (!isEmpty(product.media)) {
          const tempImage = []
          product.media.map((product) => tempImage.push(images.url))
          this.images = tempImage
          return []
        }
        return []
      },
    },
}
</script>
