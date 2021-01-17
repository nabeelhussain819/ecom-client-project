<template>
  <div class="max-w-6xl mx-auto p-4">
    <client-only>
      <masonry
        class="masonry-container"
        :cols="{ default: 7, 1000: 3, 700: 2, 400: 1 }"
        :gutter="2"
      >
        <div
          v-for="(item, index) in articles"
          :key="index"
          class="product-masonry"
        >
          <figure>
            <img class="img-responsive" :alt="item.name" :src="item.image" />
          </figure>

          <article class="detail">
            <h5 class="title">{{ item.name }}</h5>
            <p class="vendor">{{ item.vendour }}</p>
            <p class="prices">{{ item.prices }}</p>
          </article>
        </div>
      </masonry>
    </client-only>
  </div>
</template>
<script>
export default {
  async fetch() {
    this.articles = await this.fetchData()
  },
  data() {
    return {
      page: 0,
      limit: 4,
      articles: [],
    }
  },
  methods: {
    fetchData() {
      return [
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/73f58ef4af4e68fc80398e0d7c214bdb.jpg',
          vendour: 'Fort Worth,Fx',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          vendour: 'Fort Worth,Fx',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          vendour:
            'Long text Long text Long text Long text Long textLong text Long text Long text Long text Long textLong text Long text Long text Long text Long textLong text Long text Long text Long text Long textLong text Long text Long text Long text Long text ',
          prices: '$45.00',
        },
        {
          name:
            'blue dress for Womenblue dress for Women blue dress for Womenblue dress for Women',
          image:
            'https://static-01.daraz.pk/p/c6a7418673b9b156378b3cb005ab5903.jpg',
          vendour: 'Long text Long text Long text Long text Long text ',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/73f58ef4af4e68fc80398e0d7c214bdb.jpg',
          vendour: 'Fort Worth,Fx',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          vendour: 'Fort Worth,Fx',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          vendour: 'Long text Long text Long text Long text Long text ',
          prices: '$45.00',
        },
        {
          name:
            'blue dress for Womenblue dress for Women blue dress for Womenblue dress for Women',
          image:
            'https://static-01.daraz.pk/p/c6a7418673b9b156378b3cb005ab5903.jpg',
          vendour: 'Long text Long text Long text Long text Long text ',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/73f58ef4af4e68fc80398e0d7c214bdb.jpg',
          vendour: 'Fort Worth,Fx',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          vendour: 'Fort Worth,Fx',
          prices: '$45.00',
        },
        {
          name: 'blue dress for Women',
          image:
            'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          vendour: 'Long text Long text Long text Long text Long text ',
          prices: '$45.00',
        },
        {
          name:
            'blue dress for Womenblue dress for Women blue dress for Womenblue dress for Women',
          image:
            'https://static-01.daraz.pk/p/c6a7418673b9b156378b3cb005ab5903.jpg',
          vendour: 'Long text Long text Long text Long text Long text ',
          prices: '$45.00',
        },
      ]
    },
    infiniteHandler($state) {
      setTimeout(async () => {
        this.page += 1
        const additionalItems = await this.fetchData()

        if (additionalItems.length > 0) {
          this.articles.push(...additionalItems)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 500)
    },
  },
  head: {
    title: 'Regular Nuxt',
  },
}
</script>
