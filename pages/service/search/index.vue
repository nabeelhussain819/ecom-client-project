<template>
  <search :service="search" type="service" />
</template>

<script>
import Search from '~/components/common/Search'
import Services from '~/services/API/Services'

export default {
  components: { Search },
  data() {
    return { search: Services.search }
  },
}
</script>
