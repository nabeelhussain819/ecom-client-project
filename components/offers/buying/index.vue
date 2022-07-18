<template>
  <a-list
    item-layout="horizontal"
    :loading="loading"
    :data-source="data"
    class="buy-offer-main"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <div slot="description">
          <b>Robert</b> has

          <a-tag>
            <span> {{ item.status_name }}</span>
          </a-tag>
          <div>
            <button class="">Confirm Purchase</button>
          </div>
        </div>
        <div slot="title">
          <span>your offer of $$$ for</span>

          <a slot="title" :href="'/product/purchase/' + item.product.guid">
            {{ item.product.name }}</a
          >
        </div>
        <a-avatar
          slot="avatar"
          :src="item.productcover_image"
          class="offer-avatar"
        />
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
