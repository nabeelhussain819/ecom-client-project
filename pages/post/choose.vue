<template>
  <div>
    <a-row>
      <a-col :xs="24" :span="12">
        <h1 class="post-add-heading">Post Your Ad</h1>
        <choose-post @getPostType="getPostType" />
      </a-col>
    </a-row>
    <!-- temp Ads component -->
  </div>
</template>

<script>
import ChoosePost from '~/components/categories/ChoosePost'

function getPostType(type) {
  this.$router.push({ path: `/post/category/${type}` })
}
const methods = { getPostType }
export default {
  components: { ChoosePost },
  middleware: 'auth',
  data() {
    return {}
  },
  methods,
}
</script>
<style scoped>
.post-add-heading {
  text-align: center;
  margin: 15px 0px;
  font-weight: 700;
  font-size: 23px;
}
</style>
