<template>
  <a-carousel :after-change="onChange">
    <div>
      <img
        id="slider-image"
        src="https://cdn.singpromos.com/wp-content/uploads/2020/11/Huawei-26-Nov-2020.jpg"
      />
    </div>
    <div>
      <img
        id="slider-image"
        src="https://www.brandsynario.com/wp-content/uploads/2019/03/S10-Galaxy.jpg"
      />
    </div>
  </a-carousel>
</template>
<script>
export default {
  methods: {
    // onChange(a, b, c) {
    //   console.log(a, b, c)
    // },
  },
}
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 360px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

#slider-image {
  width: 100%;
  height: fit-content;
}
</style>
