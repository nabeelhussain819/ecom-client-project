<template>
  <div>
    <a-sub-menu v-for="category in categories" :key="category.id">
      <span slot="title"
        ><span>{{ category.name }}</span></span
      >
      <a-sub-menu
        v-for="childCat in category.child"
        :key="childCat.id"
        :title="childCat.name"
      >
        <SubMenus />
      </a-sub-menu>
    </a-sub-menu>
  </div>
</template>

<script>
import SubMenus from '~/components/categories/SubMenus'
export default {
  components: {
    SubMenus,
  },
  props: {
    categories: { type: Array, required: true },
  },
}
</script>
