<template>
  <div id="app">
    <vue-image-slider
      :images="images"
      :interval-val="interval"
      :height="height"
      :width="width"
    />
  </div>
</template>

<script>
import VueImageSlider from 'vue-image-slider'

export default {
  components: {
    VueImageSlider,
  },
  props: {
    height: {
      type: Number,
      default: 400,
    },
    width: {
      type: Number,
      default: 400,
    },
    interval: {
      type: Number,
      default: 4000,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imageArray: [
        'https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg',
      ],
    }
  },
}
</script>
