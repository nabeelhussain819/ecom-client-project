<template>
  <div class="transactionHistory-main">
    <div class="sold-purchase-tabs">
      <a-select
        default-value="Sold"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option value="jack"> Purchase </a-select-option>
        <a-select-option value="lucy"> Sold </a-select-option>
      </a-select>
      <!-- <a-tabs default-active-key="1" @change="changeTab">
        <a-tab-pane key="1" tab="sold">
          <a-skeleton :loading="soldLoading">
            <a-row>
              <a-col>
                <h1 :sold="sold"></h1>
              </a-col>
            </a-row>
          </a-skeleton>
        </a-tab-pane>
        <a-tab-pane key="2" tab="purchase">
          <a-skeleton :loading="purchaseLoading">
            <a-row>
              <a-col>
                <h1 :purchase="purchase"></h1>
              </a-col>
            </a-row>
          </a-skeleton>
        </a-tab-pane>
      </a-tabs> -->
      <br />
    </div>
    <a-list
      item-layout="horizontal"
      :loading="loading"
      :data-source="data"
      v-if="data"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <table class="table">
          <tbody>
            <tr>
              <td>
                <img
                  slot="cover"
                  class="image"
                  v-if="item.product.cover_image == null"
                  alt="example"
                  :src="'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'"
                />
                <img
                  slot="cover"
                  class="image"
                  alt="example"
                  v-else
                  :src="item.product.cover_image"
                />
                <!-- <image-slider class="tile_img" :images="images" /> -->
              </td>
              <td class="td">
                <a-button
                  type="inline "
                  :title="item.buyer.name"
                  class="btn-primary"
                  v-if="user.id == item.buyer_id"
                  @click="isNewRequest(item.product.id)"
                >
                  Purchased
                </a-button>
                <a-button
                  type="inline "
                  :title="item.buyer.name"
                  class="btn-sold"
                  v-if="user.id == item.seller_id"
                  @click="isNewRequest(item.product.id)"
                >
                  Sold
                </a-button>
                <br />
                <p>
                  {{ item.product.name }}
                  <br />
                  <b>${{ item.product.price }}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </a-list-item>
    </a-list>
    <div v-if="!data">
      <img
        src="https://icon-library.com/images/delivery-truck-icon-png/delivery-truck-icon-png-18.jpg"
        alt=""
      />
      <h2>No Shipping Transaction</h2>
      <p>When you have a shipping sell or purchase you'll see it here.</p>
    </div>
  </div>
</template>
<script>
import OrderServices from '~/services/API/OrderServices'
export default {
  data() {
    return {
      data: {},
      loading: false,
      purchaseLoading: false,
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  methods: {
    fetch() {
      OrderServices.getUserData()
        .then((response) => {
          this.data = response
        })
        .finally(() => (this.loading = false))
    },
    isNewRequest(data) {
      this.$router.push('/order/product/' + data)
    },
    changeTab(tab) {
      if (tab === 'sold') {
        this.soldLoading = true
      }
    },
  },
}
</script>
