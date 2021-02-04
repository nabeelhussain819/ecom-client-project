<template>
  <div>
    <a-menu-item key="1">
      <nuxt-link to="/">Home</nuxt-link>
    </a-menu-item>
    <a-menu-item v-if="!isAuth" key="2"><LoginModal /></a-menu-item>
    <a-menu-item v-if="isAuth" key="4"
      ><a-button v-if="isAuth" type="link" @click="logout"
        >Logout</a-button
      ></a-menu-item
    >

    <a-menu-item v-if="!isAuth" key="3"><RegisterModal /></a-menu-item>
  </div>
</template>
<script>
import RegisterModal from '~/components/Auth/RegisterModal.vue'
import LoginModal from '~/components/Auth/LoginModal.vue'
export default {
  components: {
    RegisterModal,
    LoginModal,
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
  },
  methods: {
    logout() {
      this.$store.commit('setToken', {
        token: null,
        status: null,
      })
    },
  },
}
</script>
