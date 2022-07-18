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
    <img
      src="https://icon-library.com/images/delivery-truck-icon-png/delivery-truck-icon-png-18.jpg"
      alt=""
    />
    <h2>No Shipping Transaction</h2>
    <p>When you have a shipping sell or purchase you'll see it here.</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      purchaseLoading: false,
    }
  },
  methods: {
    changeTab(tab) {
      if (tab === 'sold') {
        this.soldLoading = true
      }
    },
  },
}
</script>
