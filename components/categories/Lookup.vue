<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      <label>Categories</label>

      <a-icon type="down" />
    </a>
    <a-menu
      v-if="categories.length > 0"
      slot="overlay"
      class="category-dropdown"
    >
      <a-menu-item key="0" class="menu-category-heading">
        Categories

        <hr />
      </a-menu-item>
      <a-sub-menu v-for="category in categories" :key="category.id">
        <span slot="title"
          ><span>{{ category.name }}</span></span
        >
        <a-sub-menu
          v-for="child in category.childs"
          :key="child.id"
          :title="child.name"
        >
          <!-- <a-menu-item key="5"> Option 5 </a-menu-item> -->
          <!--   <a-menu-item key="6"> Option 6 </a-menu-item> -->
        </a-sub-menu>
      </a-sub-menu>

      <a-menu-divider />
    </a-menu>
  </a-dropdown>
</template>
<script>
import CategoryServices from '~/services/API/Category'
// import SubMenus from '~/components/categories/SubMenus'
export default {
  components: {
    // SubMenus,
  },
  data() {
    return {
      categories: [],
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      CategoryServices.all({ type: 1 })
        .then((response) => {
          this.categories = response
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
