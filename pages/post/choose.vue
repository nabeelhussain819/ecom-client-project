<template>
  <a-col :xs="24" :span="12">
    <choose-post @getPostType="getPostType" />
  </a-col>
</template>

<script>
import ChoosePost from '~/components/categories/ChoosePost'

function getPostType(type) {
  this.$router.push({ path: `/post/category/${type}` })
}
const methods = { getPostType }
export default {
  components: { ChoosePost },

  data() {
    return {}
  },
  methods,
}
</script>
