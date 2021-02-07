<template>
  <a-skeleton :loading="loading">
    <div class="center-container user-profile">
      <a-row :gutter="18">
        <a-col :xs="24" class="border profile-detail" :sm="6">
          <upload />
          <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
        </a-col>
        <a-col :xs="24" :sm="16">b </a-col>
      </a-row>
    </div></a-skeleton
  >
</template>
<script>
import upload from '~/components/user/upload'
export default {
  components: { upload },
  data() {
    return { loading: false, user: {} }
  },
  mounted() {
    this.user = this.$store.getters.getUser
  },
  methods: {},
}
</script>
<style scoped lang="scss">
.user-profile {
  .profile-detail {
    padding: 15px;
  }
}
</style>
