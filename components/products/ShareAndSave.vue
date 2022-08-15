<template>
  <a-row class="saveAndshare">
    <a-col :xs="{ span: 2 }" :sm="{ span: 11 }">
      <a-button @click="save(!isSaved)">
        <span v-if="isSaved">
          <a-icon theme="filled" type="heart" /> Unsave
        </span>
        <span v-else> <a-icon type="heart" /> Save </span>
      </a-button></a-col
    >
    <a-col :xs="{ span: 2 }"> <a-divider type="vertical" /></a-col>
    <a-col :xs="{ span: 2 }" :sm="{ span: 11 }">
      <!-- <a v-bind:href="product.google_address" icon="share-alt">
        Share
      </a> -->
      <a-button type="" @click="sendToast" icon="share-alt"> Share</a-button>
    </a-col>
  </a-row>
</template>
<script>
import ProductServices from '~/services/API/ProductServices'
import { success } from '~/services/Helpers/notifications'

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isSaved: false,
    }
  },
  mounted() {
    this.isSaved = this.product.isSaved
  },
  methods: {
    save(isSaved) {
      this.isSaved = isSaved
      ProductServices.saved(this.product.guid, {}).then()
    },
    sendToast() {
      success(this, { message: `URL Copied!` })
    },
  },
}
</script>
