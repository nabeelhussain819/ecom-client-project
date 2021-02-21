<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <bread-crumb />
    <a-divider />
    <add-item :product="{}" />
  </a-card>
</template>
<script>
import AddItem from '~/components/services/AddService'
import BreadCrumb from '~/components/ui/BreadCrumb'
const components = {
  AddItem,
  BreadCrumb,
}
export default { components }
</script>
