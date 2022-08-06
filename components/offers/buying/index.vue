<template>
  <a-list
    item-layout="horizontal"
    :loading="loading"
    :data-source="data"
    class="buy-offer-main"
  >
    <a-list-item slot="renderItem" slot-scope="item" v-if="isNewRequest(item)">
      <a-list-item-meta>
        <div slot="description">
          <b>You</b>

          <a-tag>
            <span>made an offer</span>
          </a-tag>
          <div>
            <button class="btn-warning" @click="pending(item)">
              Offer Pending
            </button>
          </div>
        </div>
        <div slot="title">
          <span>of ${{ item.price }} for</span>
          <a slot="title" :href="'/product/purchase/' + item.product.guid">
            "{{ item.product.name }}"</a
          >
          <span>to {{ item.user.name }}.</span>
        </div>
        <a-avatar
          slot="avatar"
          :src="item.productcover_image"
          class="offer-avatar"
        />
        <a-span class="product-image right">
          <img width="200" :src="item.product.cover_image" />
          <a-span>
            {{ item.created_at }}
          </a-span>
        </a-span>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item slot="renderItem" slot-scope="item" v-else>
      <a-list-item-meta>
        <div slot="description">
          <b>{{ item.user.name }}</b>
          <span>has</span>
          <a-tag>
            <span>{{ item.status_name }}</span>
          </a-tag>
          <div>
            <button v-if="item.status_name === 'Rejected'" class="btn-danger">
              Offer Again
            </button>
            <a-button v-else class="btn btn-secondary" @click="buyNow(item)">
              Confirm Purchase
            </a-button>
          </div>
        </div>
        <div slot="title">
          <span>your offer of</span>
          <a slot="title" :href="'/product/purchase/' + item.product.guid">
            {{ item.product.name }}</a
          >
          <span v-if="item.status_name === 'Rejected'">
            click to offer again
          </span>
          <span v-else>on confirm purchase below to purchase item</span>
        </div>
        <a-avatar
          slot="avatar"
          :src="item.productcover_image"
          class="offer-avatar"
        />
        <a-span class="product-image right">
          <img width="200" :src="item.product.cover_image" />
          <a-span>
            {{ item.created_at }}
          </a-span>
        </a-span>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
import { OFFERS_STATUS } from '~/services/Constant/index'
const data = []
export default {
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
      ProductServices.buyingOffer()
        .then((response) => {
          this.data = response
        })
        .finally(() => (this.loading = false))
    },
    isNewRequest(offer) {
      return offer.status_name === this.statuses.new.name
    },
    buyNow(product) {
      this.$router.push(`/product/purchase/${product.product.guid} `)
    },
    pending(product) {
      this.$router.push(`/order/pending/${product.id} `)
    },
  },
}
</script>
<style scoped>
.ant-list-item-meta {
  align-items: center;
}
.ant-list-item-meta-content {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.offer-avatar {
  border-radius: 0 !important;
  height: 45px;
  width: 45px;
}
</style>
