<template>
  <a-card class="tiles-card dark-header" size="small" title="Product">
    <a-skeleton :loading="loading">
      <bread-crumb />
      <a-divider />
      <add-service :is-created="true" :service="service" />
      <a-divider />
      <h2 class="sub-heading">Upload Service Images</h2>
      <a-skeleton :loading="!showUploader">
        <upload :product="service" :f-list="fileList" />
      </a-skeleton>
      <a-button type="" @click="update"> Save </a-button>
    </a-skeleton>
  </a-card>
</template>

<script>
import AddService from '~/components/services/AddService'
import Services from '~/services/API/Services'
import upload from '~/components/services/Upload'
import BreadCrumb from '~/components/ui/BreadCrumb'
import { success } from '~/services/Helpers'
const components = {
  AddService,
  BreadCrumb,
  upload,
}
function data() {
  return {
    loading: true,
    service: [],
    fileList: [],
    showUploader: false,
  }
}

function mounted() {
  this.getService()
}

export default {
  components,
  data,
  mounted,
  methods: {
    getService() {
      Services.get(this.$route.params.id)
        .then((service) => {
          this.service = service
          this.galery(service.guid)
        })
        .finally(() => (this.loading = false))
    },
    update() {
      success(this, { message: 'updated successfully' })
      this.$router.push('/')
    },
    galery(id) {
      Services.images(id).then((fileList) => {
        this.fileList = fileList
        this.showUploader = true
      })
    },
  },
}
</script>
