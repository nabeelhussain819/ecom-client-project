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
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    save() {
      console.log(this.product)
    },
  },
}
</script>
