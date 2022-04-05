<template>
  <div class="container container-pay-method">
    <div class="row">
      <div class="col">
        <div class="pay-method-header">
          <h1>Payment Methods</h1>
          <a @click="goto('/purchase/buy')">Cancel</a>
        </div>
        <div class="">
          <h3 for="credit-num">Add Credit / Debit Card</h3>
          <hr />
          <h2>></h2>
        </div>
        <div class="byVisa-main">
          <div class="">
            <img
              src="https://www.pngitem.com/pimgs/m/1-16193_visa-icon-png-black-and-white-transparent-png.png"
              alt="visa"
              width="75px"
            />
            <h2>Visa</h2>
            <span>******-****346</span>
          </div>
          <div><a-radio value=""></a-radio></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [routeHelpers],
}
</script>
