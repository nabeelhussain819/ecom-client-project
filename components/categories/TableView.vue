<template>
  <div>
    <a-collapse @change="changeActivekey">
      <!-- <a-collapse-panel key="1" header="This is panel header 1">
        <a-collapse default-active-key="4">
          <a-collapse-panel key="4" header="This is panel nest panel">
            <p>{{ text }}</p>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel> -->
      <childCategories :menu-info="categories" />
    </a-collapse>
  </div>
</template>
<script>
import { Menu } from 'ant-design-vue'
const childCategories = {
  template: `
      <a-collapse-panel :key="menuInfo.id" v-bind="$props" :header="menuInfo.id">
        <a-collapse default-active-key="4">
          <a-collapse-panel key="4" header="This is panel nest panel">
            <p>{{ menuInfo.name }}</p>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Array,
      default: () => [],
    },
  },
}
export default {
  components: { childCategories },
  props: { categories: { type: Array, default: () => [] } },
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
    }
  },
  methods: {
    changeActivekey(key) {
      console.log(key)
    },
  },
}
</script>
