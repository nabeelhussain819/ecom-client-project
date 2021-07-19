<template>
  <div>
    <div>
      <h3>Categories</h3>
      <a-list
        item-layout="horizontal"
        :grid="{ gutter: 0 }"
        :data-source="Object.keys(categories)"
        :split="false"
      >
        <a-list-item slot="renderItem" slot-scope="key">
          <a @click="selectCategory(key)">{{ categories[key] }}</a>
        </a-list-item>
      </a-list>
    </div>

    <a-divider />
    <div>
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="products">
        <a-list-item slot="renderItem" slot-scope="product, index">
          <a-card
            :key="index"
            :title="`Rs. ${product.price}`"
            style="cursor: pointer"
          >
            <p>{{ product.name }}</p>
            <a-row>
              <a-col span="12">
                <div v-html="`${product.google_address}`" />
              </a-col>
              <a-col span="12">
                <div style="float: right">
                  {{ moment(product.created_at).fromNow() }}
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Products from '~/services/API/Product'

export default {
  data() {
    return {
      categories: {},
      products: [],
      moment,
    }
  },
  watch: {
    '$route.query.query': {
      handler() {
        this.search()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectCategory(category) {
      this.$router.push({
        path: '/search',
        query: { query: this.$route.query.query, category },
      })
    },
    search() {
      const params = { query: this.$route.query.query }
      if (this.$route.query.category) {
        params.category_id = this.$route.query.category
      }

      Products.search(params)
        .then(({ categories, products }) => {
          this.categories = categories
          this.products = products
        })
        .catch(() => {})
    },
  },
}
</script>
