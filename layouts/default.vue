<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <Header />
    <a-layout-content class="main-container">
      <client-only>
        <Nuxt />
      </client-only>
    </a-layout-content>
    <NewsLetter />
    <Footer />
  </a-layout>
</template>

<script>
import Header from '~/components/layout/_header.vue'
import NewsLetter from '~/components/layout/_newsletter.vue'
import Footer from '~/components/layout/_footer.vue'
const components = {
  Header,
  NewsLetter,
  Footer,
}
export default {
  components,
}
</script>
