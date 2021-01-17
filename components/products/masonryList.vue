<template>
  <div class="main-container">
    <a-row>
      <div
        ref="grid"
        v-masonry
        transition-duration="3s"
        item-selector=".item"
        class="masonry-container"
      >
        <no-ssr>
          <a-col
            v-for="(item, index) in blocks"
            :key="index"
            v-masonry-tile
            :span="3"
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
          </a-col>
        </no-ssr>
      </div>
    </a-row>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'

// const data = {
//   blocks: { item: 'name' },
// }
export default {
  components: {
    'no-ssr': NoSSR,
  },
  data() {
    return {
      blocks: [
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
      ],
    }
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
}
</script>
