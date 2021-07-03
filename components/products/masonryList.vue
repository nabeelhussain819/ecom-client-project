<template>
  <div class="max-w-6xl mx-auto p-4">
    <client-only>
      <masonry
        class="masonry-container"
        :cols="{ default: 7, 1000: 3, 700: 2, 400: 1 }"
        :gutter="2"
      >
        <nuxt-link
          v-for="(item, index) in products"
          :key="index"
          class="product-masonry product-grid"
          :to="item.url"
        >
          <figure>
            <img
              class="img-responsive"
              :alt="item.name"
              :src="item.media[0].url"
            />
          </figure>

          <article class="detail">
            <h5 class="title">{{ item.name }}</h5>
            <p class="prices">$ {{ item.price }}</p>
            <!-- <p class="category">{{ item.categories[0].id }}</p> -->
            <p class="category">{{ item.description }}</p>
          </article>
        </nuxt-link>
      </masonry>
    </client-only>
  </div>
</template>
<script>
import Products from '~/services/API/Product'
export default {
  data() {
    return {
      page: 0,
      limit: 4,
      products: [],
      selectedImage: '',
      images: [],
      visible: false,
      interval: null,
    }
  },
  async fetch() {
    // this.articles = await this.fetchData()
  },
  head: {
    title: 'Home page',
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    created() {},
    fetchData() {
      return Products.all().then((products) => {
        this.products = products.data
      })
    },
  },
}
</script>
