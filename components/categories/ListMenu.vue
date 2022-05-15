<template>
  <a-skeleton :loading="loading">
    <a-collapse
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
        <template v-if="category.children_recursive">
          <a-collapse
            :bordered="false"
            accordion
            :expand-icon-position="expandIconPosition"
            @change="onChange"
          >
            <a-collapse-panel
              v-for="chilCategory in category.children_recursive"
              :key="chilCategory.id"
              :header="chilCategory.name"
            >
            </a-collapse-panel>
          </a-collapse>
        </template>

        <!-- <pre>   {{ category }}  </pre> -->
      </a-collapse-panel>
    </a-collapse>

    <!-- <tableView :categories="categories"></tableView> -->
  </a-skeleton>
</template>
<script>
import Category from '~/services/API/Category'
import { isEmpty } from '~/services/Helpers'
// import tableView from '~/components/categories/tableView'
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
function onChange(categoryId, c) {
  const category = findSelectedCatgory(this.categories, categoryId)
  const shouldRoute = isEmpty(category.children_recursive)

  if (!isEmpty(categoryId) && shouldRoute) {
    this.$emit('getCategoryId', categoryId)
  }
}
function findChild(categories, catId) {
  return categories.find((category) => category.id === catId)
}
function findSelectedCatgory(categories, categoryId) {
  let category = categories.find((category) => category.id === categoryId)

  if (isEmpty(category)) {
    for (let cat = 0; cat < categories.length; cat++) {
      category = findChild(categories[cat].children_recursive, categoryId)
    }
  }
  return category
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
  // components: { tableView },
}
</script>
