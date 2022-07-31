<template>
  <div class="container-box transaction-history">
    <div class="d-flex">
      <h1>Purchase & Sales</h1>
      <a-button @click="goto('/user/account')">Cancel</a-button>
    </div>
    <a-tabs default-active-key="1" @change="changeTab">
      <a-tab-pane key="1" tab="Transactions">
        <a-skeleton :loading="transactionLoading">
          <a-row>
            <a-col>
              <transactionHistory :transaction="transaction" />
            </a-col>
          </a-row>
        </a-skeleton>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Accounts">
        <a-skeleton :loading="accountLoading">
          <a-row>
            <a-col>
              <accountBalance :account="account" />
            </a-col>
          </a-row>
        </a-skeleton>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import transactionHistory from '~/components/Account/transactionHistory'
import accountBalance from '~/components/Account/accountBalance'
import routeHelpers from '~/mixins/route-helpers'

export default {
  components: {
    transactionHistory,
    accountBalance,
  },
  mixins: [routeHelpers],

  data() {
    return {
      loading: false,
      accountLoading: false,
    }
  },
  methods: {
    changeTab(tab) {
      if (tab === 'account') {
        this.accountLoading = true
      }
    },
  },
}
</script>
