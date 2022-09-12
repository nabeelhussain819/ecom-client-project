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
      <a-list
        item-layout="horizontal"
        :loading="loading"
        class="product-detail-list"
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
                    class="product-image"
                    alt="example"
                    :src="images"
                  />
                  <!-- <image-slider class="tile_img" :images="images" /> -->
                </td>
                <td class="td">
                  <h1
                    type="inline "
                    :title="item.buyer.name"
                    class="primary-text product-price"
                  >
                    {{ item.product.name }}
                  </h1>
                </td>
              </tr>
            </tbody>
          </table>
        </a-list-item>
      </a-list>
    </div>
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
import { isEmpty } from '~/services/Helpers'
export default {
  data() {
    return {
      data: {},
      loading: false,
      images: [],
      purchaseLoading: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      OrderServices.getUserData()
        .then((response) => {
          this.data = response
        })
        .finally(() => (this.loading = false))
    },
    changeTab(tab) {
      if (tab === 'sold') {
        this.soldLoading = true
      }
    },
    getImages(data) {
      if (!isEmpty(data.product.media)) {
        const tempImage = []
        data.product.media.map((images) => tempImage.push(images.url))
        this.images = tempImage
        return
      }

      this.images = [
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
      ]
    },
  },
}
</script>
