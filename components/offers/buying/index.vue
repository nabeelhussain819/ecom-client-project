<template>
  <a-list item-layout="horizontal" :loading="loading" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <a slot="title" href="https://www.antdv.com/">{{
          item.product.name
        }}</a>
        <div slot="description">
          <a-tag color="pink">
            {{ item.status_name }}
          </a-tag>
        </div>
        <a-avatar slot="avatar" :src="item.productcover_image" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
const data = []
export default {
  data() {
    return {
      data,
      loading: true,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      ProductServices.buyingOffer()
        .then((response) => {
          this.data = response
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
<style></style>
