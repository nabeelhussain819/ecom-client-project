<template>
  <div v-if="showTabs" class="realtedCategory">
    <a-card
      style="width: 100%"
      :tab-list="categories"
      :active-tab-key="currentKey"
      @tabChange="(key) => onTabChange(key)"
    >
      <!-- --card-- -->
      <a-skeleton :loading="productLoad">
        <a-row type="flex" :gutter="[16, 16]" align="top">
          <a-col
            v-for="product in products"
            :key="product.id"
            :xs="{ span: 24 }"
            :sm="{ span: 4 }"
          >
            <tile :product="product" />
          </a-col>
        </a-row>
      </a-skeleton>
      <!-- --- Cards --- -->
    </a-card>
  </div>
</template>

<script>
import Category from '~/services/API/Category'
import Product from '~/services/API/ProductServices'
import Tile from '~/components/products/Tile'
export default {
  components: {
    Tile,
  },
  data() {
    return {
      categories: [],
      showTabs: false,
      currentKey: null,
      products: [],
      productLoad: false,
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    onTabChange(key) {
      this.currentKey = key
      this.loadProducts(key)
    },
    loadProducts(category) {
      this.productLoad = true
      Product.all({ categories: [category] })
        .then((products) => {
          this.products = products.data
        })
        .finally(() => (this.productLoad = false))
    },
    getCategories() {
      Category.tabs().then((categories) => {
        if (categories.length > 0) {
          this.categories = categories
          const firstCategory = categories[0].key
          this.loadProducts(firstCategory)
          this.currentKey = `${firstCategory}`
          this.showTabs = true
        }
      })
    },
  },
}
</script>
