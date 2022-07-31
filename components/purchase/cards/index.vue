<template>
  <div class="container container-pay-method">
    <div class="row">
      <div class="col">
        <div class="pay-method-header">
          <h1>Payment Methods</h1>
          <a-button type="link">Cancel</a-button>
        </div>

        <br />
        <br />
        <div class="bycredit-main" @click="handleCardForm(true)">
          <h3 class="">Add Credit / Debit Card</h3>
          <a @click="goto('')">></a>
        </div>
        <hr class="pay-devider" />
        <savedcardList />
      </div>
    </div>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import savedcardList from '~/components/purchase/cards/SaveList'
// import Product from '~/services/API/ProductServices'

export default {
  components: {
    savedcardList,
  },
  mixins: [routeHelpers],
  data() {
    return {
      showCardForm: false,
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
  },
  methods: {
    cancel(show) {
      this.$emit('cancel', show)
    },
    handleCardForm(show) {
      this.showCardForm = show
    },
  },
}
</script>
