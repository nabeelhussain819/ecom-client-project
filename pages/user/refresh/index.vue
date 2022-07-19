<template>
  <div>Refreshing onboading url. Please wait...</div>
</template>

<script>
import UserServices from '~/services/API/UserServices'

export default {
  data() {
    return { loading: false, user: this.$store.getters.getUser, products: [] }
  },
  mounted() {
    UserServices.refreshOnboadingUrl(this.user.id)
      .then((url) => {
        window.location = url
      })
      .catch(() => {})
  },
}
</script>
