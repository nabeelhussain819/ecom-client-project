<template>
  <div class="offers-main container border">
    <h1 class="">My Offers</h1>
    <a-tabs @change="callback" class="offers-tabs">
      <a-tab-pane key="1" tab="Buying"> <Buying /></a-tab-pane>
      <a-tab-pane key="2" tab="Selling"> <Selling /> </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Buying from '~/components/offers/buying'
import Selling from '~/components/offers/selling'
export default {
  components: { Buying, Selling },
  data() {
    return {}
  },
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
