<template>
  <a-row :gutter="2">
    <a-col :xs="24" :sm="6">
      <a-avatar :size="avatarSize" :src="product.user.profile_url" />
    </a-col>
    <a-col :xs="24" :sm="18">
      <span>
        <span class="name"> {{ product.user.name }}</span>
        <br />
        <a-rate v-model="rating" allow-half />
        <span class="ant-rate-text">{{ rating }}</span>
      </span></a-col
    >
  </a-row>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      rating: 4.5,
      avatarSize: 60,
    }
  },
}
</script>
