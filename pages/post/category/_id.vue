<template>
  <a-card class="tiles-card dark-header" size="small" title="Choose A Category">
    <list-menu @getCategoryId="getCategoryId" />
  </a-card>
</template>

<script>
import ListMenu from '~/components/categories/ListMenu'
const components = { ListMenu }
function getCategoryId(categoryId) {
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
