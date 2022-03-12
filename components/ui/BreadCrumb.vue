<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <!-- <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item> -->
    <a-breadcrumb-item>{{ lastCrumb }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
export default {
  props: {
    lastCrumb: {
      type: String,
      default: 'Selected Category',
    },
  },
}
</script>
