<template>
  <a-list item-layout="horizontal" :loading="loading" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <a slot="title" href="https://www.antdv.com/">{{
          item.product.name
        }}</a>
        <div slot="description">
          <a-button type="primary" @click="status(item.guid, true)"
            >Accept</a-button
          >
          <a-button type="danger" @click="status(item.guid, false)"
            >Reject</a-button
          >
        </div>
        <a-avatar slot="avatar" :src="item.productcover_image" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
import OfferServices from '~/services/API/OfferServices'
import notifications from '~/mixins/notifications'
const data = []
export default {
  mixins: [notifications],
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
      ProductServices.sellingOffer()
        .then((response) => {
          this.data = response
        })
        .finally(() => (this.loading = false))
    },
    status(guid, respond) {
      this.loading = true
      OfferServices.status(guid, { status: respond })
        .then((response) => {
          this.success(response.message)
        })
        .finally((e) => {
          this.loading = false
          this.error(e)
        })
    },
  },
}
</script>
<style></style>
