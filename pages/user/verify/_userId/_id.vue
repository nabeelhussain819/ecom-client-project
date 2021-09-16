<template>
  <a-skeleton :loading="loading" active>
    <a-result
      status="error"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <!-- <template #extra>
        <a-button key="console" type="primary"> Go Console </a-button>
        <a-button key="buy"> Buy Again </a-button>
      </template> -->
    </a-result>
  </a-skeleton>
</template>
<script>
import { isEmpty } from '~/services/Helpers'
import AuthServices from '~/services/API/AuthService'
import notifcations from '~/mixins/notifications'
export default {
  mixins: [notifcations],
  data() {
    return {
      loading: false,
    }
  },

  mounted() {
    this.verifytoken()
  },
  methods: {
    verifytoken() {
      const params = this.$route.params

      if (!isEmpty(params)) {
        AuthServices.verify(params.userId, params.id)
          .then((response) => {
            console.log('response', response)
          })
          .catch(this.error)
      }
    },
  },
}
</script>
