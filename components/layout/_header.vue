<template>
  <a-layout-header class="clearfix">
    <div class="logo" />
    <a-menu
      theme="dark"
      class="header_nav"
      mode="horizontal"
      :style="{ lineHeight: '64px', float: 'right' }"
    >
      <a-menu-item key="5" class="no-hover-nav">
        <a-input id="search" default-value="Search">
          <a-select slot="addonAfter" default-value="buy" style="width: 90px">
            <a-select-option value="buy"> Buy </a-select-option>
            <a-select-option value="sale"> Sale </a-select-option>
          </a-select>
        </a-input>
      </a-menu-item>
      <a-menu-item key="1"><nuxt-link to="/">Home</nuxt-link></a-menu-item>
      <a-menu-item key="2">Login</a-menu-item>
      <a-menu-item key="3">Sign Up</a-menu-item>
      <!-- <a-menu-item key="4"><nuxt-link to="/products/posts">Show Your Post</nuxt-link></a-menu-item> -->
      <a-menu-item key="4">
        <nuxt-link to="/post/choose">
          <a-icon type="plus-circle" />Post
        </nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
    }
  },
  created() {},
  methods: {
    // showProductModal() {
    //   this.$nuxt.$emit('showProductModal', true)
    //   this.visible = true
    // },
  },
}
</script>
