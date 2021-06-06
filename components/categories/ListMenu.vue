<template>
  <a-skeleton :loading="loading">
    <a-collapse
      default-active-key="1"
      :bordered="false"
      accordion
      :expand-icon-position="expandIconPosition"
      @change="onChange"
    >
      <a-collapse-panel
        v-for="category in categories"
        :key="category.id"
        :header="category.name"
      >
        <!-- <p>{{ text }}</p> -->
      </a-collapse-panel>
      <!-- <a-collapse-panel
        key="2"
        header="This is panel header 2"
        :disabled="false"
      >
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3">
        <p>{{ text }}</p>
      </a-collapse-panel> -->
    </a-collapse>
  </a-skeleton>
</template>
<script>
import Category from '~/services/API/Category'
import { isEmpty } from '~/services/Helpers'
function data() {
  return {
    accordion: false,
    disabled: true,
    loading: false,
    expandIconPosition: 'right',
    categories: [],
    text: '',
  }
}
function getAllCategories() {
  this.loading = true
  Category.all({ type: this.$route.params.id })
    .then((response) => {
      this.categories = response
    })
    .finally(() => {
      this.loading = false
    })
}
function onChange(categoryId) {
  if (!isEmpty(categoryId)) {
    this.$emit('getCategoryId', categoryId)
  }
}
const methods = {
  getAllCategories,
  onChange,
}

function mounted() {
  this.getAllCategories()
}
export default {
  data,
  mounted,
  methods,
}
</script>
