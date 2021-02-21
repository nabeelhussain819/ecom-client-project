<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <bread-crumb />
    <a-divider />
    <add-service :product="{}" />
  </a-card>
</template>
<script>
import AddService from '~/components/services/AddService'
import BreadCrumb from '~/components/ui/BreadCrumb'
const components = {
  AddService,
  BreadCrumb,
}
export default {
  components,
}
</script>
