<template>
  <a-list item-layout="horizontal" :loading="loading" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <a slot="title" href="https://www.antdv.com/">{{
          item.product.name
        }}</a>
        <div slot="description">
          <div v-if="isNewRequest(item)">
            <a-button type="primary" @click="status(item.guid, true)"
              >Accept</a-button
            >
            <a-button type="danger" @click="status(item.guid, false)"
              >Reject</a-button
            >
          </div>
          <a-tag v-else color="pink">{{ item.status_name }}</a-tag>
          made an offer of ${{ item.price }} on {{ item.product.name }}

          <img width="200" :src="item.product.cover_image" />
        </div>

        <a-avatar slot="avatar" :src="item.requester.profile_url" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
import OfferServices from '~/services/API/OfferServices'
import notifications from '~/mixins/notifications'
import { OFFERS_STATUS } from '~/services/Constant/index'
const data = []
export default {
  mixins: [notifications],
  data() {
    return {
      data,
      loading: true,
      statuses: OFFERS_STATUS,
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
          this.fetch()
          this.success(response.message)
        })
        .finally((e) => {
          this.loading = false
          this.error(e)
        })
    },
    isNewRequest(offer) {
      return offer.status_name === this.statuses.new.name
    },
  },
}
</script>
<style></style>
