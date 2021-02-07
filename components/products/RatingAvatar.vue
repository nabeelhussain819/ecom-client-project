<template>
  <a-row :gutter="2">
    <a-col :xs="24" class="border" :sm="6">
      <avatar
        :size="avatarSize"
        image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-col>
    <a-col :xs="24" :sm="18">
      <span>
        <span class="name"> Naveed</span>
        <br />
        <a-rate v-model="rating" allow-half />
        <span class="ant-rate-text">{{ rating }}</span>
      </span></a-col
    >
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      rating: 4.5,
      avatarSize: 60,
    }
  },
}
</script>
