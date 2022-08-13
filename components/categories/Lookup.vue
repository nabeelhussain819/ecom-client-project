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
        <span slot="title">
          <a @click="selectCategory(category.id)">
            <span>{{ category.name }} </span>
          </a>
        </span>
        <sub-menu :key="category.id" :menu-info="category" />
      </a-sub-menu>

      <a-menu-divider />
    </a-menu>
  </a-dropdown>
</template>
<script>
import { Menu } from 'ant-design-vue'
import CategoryServices from '~/services/API/Category'
// import SubMenus from '~/components/categories/SubMenus'

const childMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" />
          <a @click="selectCategory(menuInfo.id)"><span>{{ menuInfo.name }}</span></a>
        </span>
        <template v-for="item in menuInfo.children_recursive">
          <a-menu-item v-if="!item.children_recursive" :key="item.id">
            <a-icon type="pie-chart" />
            <span>{{ item.title }} </span>
          </a-menu-item>
          <sub-menu v-else :key="item.id" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    selectCategory(categoryId) {
      this.search({ category_id: categoryId })
      // this.$router.push({
      //   path: `/${this.type}/search`,
      //   query: { query: this.$route.query.query, category },
      // })
    },
    search(searchParams = {}) {
      const params = {
        ...searchParams,
        query: this.$route.query.query,
        ...this.filters,
      }

      // if (this.$route.query.category) {
      //   params.category_id = this.$route.query.category
      //   params.filters = this.filters
      // }
      this.params = params
      this.$router.push({
        path: '/product/search',
        query: { ...this.params },
      })
    },
  },
}
export default {
  components: {
    'sub-menu': childMenu,
  },
  data() {
    return {
      categories: [],
    }
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
    selectCategory(categoryId) {
      this.search({ category_id: categoryId })
      // this.$router.push({
      //   path: `/${this.type}/search`,
      //   query: { query: this.$route.query.query, category },
      // })
    },
    search(searchParams = {}) {
      const params = {
        ...searchParams,
        query: this.$route.query.query,
        ...this.filters,
      }

      // if (this.$route.query.category) {
      //   params.category_id = this.$route.query.category
      //   params.filters = this.filters
      // }
      this.params = params
      this.$router.push({
        path: '/product/search',
        query: { ...this.params },
      })
    },
  },
}
</script>
