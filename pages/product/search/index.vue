<template>
  <search :service="search" />
</template>

<script>
import Search from '~/components/common/Search'
import Products from '~/services/API/ProductServices'

export default {
  components: { Search },
  data() {
    return { search: Products.search }
  },
}
</script>
