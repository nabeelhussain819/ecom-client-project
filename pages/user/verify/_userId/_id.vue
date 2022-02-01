<template>
  <a-skeleton :loading="loading" active>
    <a-result
      :status="response.status"
      :title="response.title"
      :sub-title="response.sub_title"
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
import notifications from '~/mixins/notifications'
import { EVENT_LOGIN_MODAL } from '~/services/Constant'
export default {
  mixins: [notifications],
  data() {
    return {
      loading: false,
      response: {
        status: null,
        title: null,
        sub_title: null,
      },
    }
  },
  mounted() {
    this.verifytoken()
    this.$nuxt.$emit(EVENT_LOGIN_MODAL, true)
  },
  methods: {
    setStatus(status, title) {
      this.response = {
        status,
        title,
      }
    },
    verifytoken() {
      const params = this.$route.params

      if (!isEmpty(params)) {
        this.loading = true
        AuthServices.verify(params.userId, params.id)
          .then((response) => {
            this.setStatus('success', response.message)
          })
          .catch((e) => {
            this.setStatus('error', e.response.data.message)
          })
          .finally(() => (this.loading = false))
      }
    },
  },
}
</script>
