<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <Header />
    <a-layout-content>
      <Nuxt />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Header from '~/components/layout/_header.vue'
const components = { Header }
export default { components }
</script>
