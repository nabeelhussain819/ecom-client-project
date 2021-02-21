<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <list-menu @getCategoryId="getCategoryId" />
  </a-card>
</template>

<script>
import ListMenu from '~/components/categories/ListMenu'
const components = { ListMenu }
function getCategoryId(categoryId) {
  if (this.$route.params.id === '2') {
    this.$router.push({
      path: `/post/service/create/${categoryId}`,
      // query: { category_id: categoryId },
    })
    return true
  }
  this.$router.push({
    path: `/post/product/create/${categoryId}`,
    query: { category_id: categoryId },
  })
  this.showProduct = true
}

const methods = {
  getCategoryId,
}

export default { components, methods }
</script>
