<template>
  <a-layout-header class="clearfix">
    <div class="logo" />

    <a-menu theme="dark" class="header_nav" mode="horizontal" :style="{ lineHeight: '64px', float: 'right' }">
      <a-menu-item key="5" class="no-hover-nav">
  
        <a-input default-value="Search" id="search">
          <a-select slot="addonAfter" default-value="buy" style="width: 90px">
            <a-select-option value="buy"> Buy </a-select-option>
            <a-select-option value="sale"> Sale </a-select-option>
          </a-select>
        </a-input>
      </a-menu-item>
      <a-menu-item key="1"><nuxt-link to="/">Home</nuxt-link></a-menu-item>
      <a-menu-item key="2">Login</a-menu-item>
      <a-menu-item key="3">Sign Up</a-menu-item>
      <!-- <a-menu-item key="4"><nuxt-link to="/product/posts">Show Your Post</nuxt-link></a-menu-item> -->
      <a-menu-item key="4" @click="showModal">
        <a-icon type="plus-circle" />Post</a-menu-item>
      </a-menu>

    <a-modal v-model="visible" title="Add Category" footer width="80%">
      <add-product></add-product>
    </a-modal>
  </a-layout-header>

</template>

<style scoped>
  .header_nav {
    float: right;
  }
  #search{
    opacity: 0.4rem;
  }
</style>

<script>
  import addProduct from '../products/AddProduct'
  export default {
    components: {
      addProduct
    },
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      showModal() {
        this.visible = true;
      },
    }
  }
</script>