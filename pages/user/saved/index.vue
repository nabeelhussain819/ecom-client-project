<template>
  <div>
    <a-spin :spinning="loading" class="p-5">
      <a-row :gutter="16" class="save-item-container">
        <h2 class="heading-save">Saved Items</h2>
        <a-col
          v-for="(product, index) in products"
          :key="index"
          :span="3"
          class="saved-item"
        >
          <Tile :product="product" class="saved-imgs" />
          <div class="overlay"></div>
          <div class="button"><a href="#" title="Unsave Item"> Unsave </a></div>
        </a-col>
      </a-row>
      <router-link to="/">
        <a-button type="button" title=" Save new item" class="save-new">
          +</a-button
        >
      </router-link>
    </a-spin>
  </div>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
import Tile from '~/components/products/Tile'
export default {
  components: { Tile },
  data() {
    return {
      products: [],
      loading: true,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      ProductServices.getSaved()
        .then((products) => {
          this.products = products
        })
        .finally((this.loading = false))
    },
  },
}
</script>
<style scoped>
/* .saved-imgs {
  position: absolute;
  width: 500px;
  height: 300px;
  left: 0;
} */
.save-new {
  margin-left: 20px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 24px;
  font-weight: 700;
  height: 40px;
  width: 40px;
  padding: 0;
}
</style>
