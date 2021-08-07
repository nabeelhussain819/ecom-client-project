<template>
  <a-row class="saveAndshare">
    <a-col :xs="{ span: 2 }" :sm="{ span: 11 }">
      <a-button type="" @click="save" icon="heart"> Save </a-button></a-col
    >
    <a-col :xs="{ span: 2 }"> <a-divider type="vertical" /></a-col>
    <a-col :xs="{ span: 2 }" :sm="{ span: 11 }">
      <a-button type="" icon="share-alt"> Share </a-button></a-col
    >
  </a-row>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    save() {
      ProductServices.saved(this.product.guid, {}).then()
    },
  },
}
</script>
