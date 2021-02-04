<template>
  <a-layout-header class="clearfix">
    <div class="logo" />
    <a-menu
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
      <a-menu-item key="1">
        <nuxt-link to="/">Home</nuxt-link>
      </a-menu-item>
      <a-menu-item v-if="!isAuth" key="2"><LoginModal /></a-menu-item>

      <a-menu-item v-if="!isAuth" key="3"><RegisterModal /></a-menu-item>
      <a-button v-if="isAuth" type="link" @click="logout">Logout</a-button>

      <a-sub-menu class="header-menu">
        <span slot="title" class="submenu-title-wrapper"
          ><a-avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <span :style="{ marginLeft: 16, verticalAlign: 'middle' }"
            >Muhammad Naved</span
          ></span
        >
        <a-menu-item key="offer" class="f-black m-0">My Offer</a-menu-item>
        <a-menu-item key="board" class="f-black m-0">My Board </a-menu-item>
        <a-menu-item key="profile" class="f-black m-0">
          My Profile
        </a-menu-item>
        <a-menu-item key="accoutn" class="f-black m-0">
          My Account
        </a-menu-item>
        <a-menu-item key="Logout" class="f-black m-0" @click="logout">
          Logout
        </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="4">
        <nuxt-link to="/post/choose">
          <a-icon type="plus-circle" />Post
        </nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
import RegisterModal from '~/components/Auth/RegisterModal'
import LoginModal from '~/components/Auth/LoginModal'

export default {
  components: {
    RegisterModal,
    LoginModal,
  },
  data() {
    return {
      visible: false,
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
  },
  created() {},
  methods: {
    logout() {
      this.$store.commit('setToken', {
        token: null,
        status: null,
      })
    },
    // showProductModal() {
    //   this.$nuxt.$emit('showProductModal', true)
    //   this.visible = true
    // },
  },
}
</script>
