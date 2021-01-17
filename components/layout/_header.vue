<template>
  <a-layout-header class="clearfix">
    <div class="logo" />

    <a-menu
      theme="dark"
      class="header_nav"
      mode="horizontal"
      :style="{ lineHeight: '64px', float: right }"
    >
      <a-menu-item key="4" class="no-hover-nav">
        <a-input default-value="Search">
          <a-select slot="addonAfter" default-value="buy" style="width: 90px">
            <a-select-option value="buy"> Buy </a-select-option>
            <a-select-option value="sale"> Sale </a-select-option>
          </a-select>
        </a-input>
      </a-menu-item>
      <a-menu-item key="1">Login</a-menu-item>
      <a-menu-item key="2">Sign Up</a-menu-item>
      <a-menu-item key="3">+Post</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<style scoped>
.header_nav {
  float: right;
}
</style>
