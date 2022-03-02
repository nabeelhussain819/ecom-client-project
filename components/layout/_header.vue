<template>
  <div>
    <a-layout-header class="clearfix header">
      <router-link to="/"><img src="#" /></router-link>

      <a-menu
        placeholder="check"
        class="header_nav"
        mode="horizontal"
        :style="{ lineHeight: '40px', float: 'right' }"
      >
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay" class="category-dropdown">
            <a-menu-item key="0" class="menu-category-heading">
              Categories
              <hr />
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title"><span>Electronic Devices</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub2">
              <span slot="title"><span>Electronic Accessories</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub3">
              <span slot="title"><span>TV and Home Appliances</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub4">
              <span slot="title"><span>Health and Beauty</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub5">
              <span slot="title"><span>Electronic Devices</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub6">
              <span slot="title"><span>Electronic Devices</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub7">
              <span slot="title"><span>Electronic Devices</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />

            <a-sub-menu key="sub8">
              <span slot="title"><span>Electronic Devices</span></span>
              <a-menu-item key="3"> Mobile </a-menu-item>
              <a-menu-item key="4"> Option 4 </a-menu-item>
              <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5"> Option 5 </a-menu-item>
                <a-menu-item key="6"> Option 6 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-divider />
          </a-menu>
        </a-dropdown>
        <a-menu-item key="5" class="no-hover-nav search-bar">
          <a-icon type="search" class="icon_search" />
          <a-input
            id="search-input"
            class="search-input"
            placeholder="Search"
            @pressEnter="search"
            @change="onChange"
          >
            <template slot="addonAfter" default-value="buy" style="width: 90px">
              <a-button
                type="primary"
                :class="type == 1 && `active`"
                @click="getSearchType(1)"
              >
                Buying
              </a-button>
              <a-divider type="vertical" />
              <a-button
                type="primary"
                :class="type == 2 && `active`"
                @click="getSearchType(2)"
              >
                Services
              </a-button>
              <a-divider type="vertical" />
              <a-button class="go-btn" type="primary" @click="search">
                GO
              </a-button>
            </template>
          </a-input>
        </a-menu-item>
        <a-menu-item>
          <nuxt-link to="">
            <a-icon type="environment" theme="filled" class="icon_nearby" />
            <span class="nearby_txt">Near by</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="4" class="btn_post">
          <span @click="postHandle">
            <a-icon type="plus" class="plus_icon" />
            <span class="post_txt"> Post Ads</span>
          </span>
        </a-menu-item>
        <a-menu-item key="1">
          <nuxt-link to="/">Home</nuxt-link>
        </a-menu-item>
        <a-menu-item v-if="!isAuth" key="2">
          <LoginModal />
        </a-menu-item>

        <a-menu-item v-if="!isAuth" key="3">
          <RegisterModal />
        </a-menu-item>
        <a-sub-menu v-if="isAuth" class="header-menu">
          <span slot="title" class="submenu-title-wrapper"
            ><a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span class="text-capitalize" :style="{ marginLeft: 16 }">
              {{ user.name }}</span
            >
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-icon type="down" />
            </a>
          </span>
          <a-menu-item key="offer" class="f-black m-0">My Ads</a-menu-item>
          <a-menu-item
            key="board"
            class="f-black m-0"
            @click="goto('/user/saved')"
            >Saved Item</a-menu-item
          >
          <a-menu-item
            key="profile"
            class="f-black m-0"
            @click="goto('/user/profile')"
          >
            Profile
          </a-menu-item>
          <a-menu-item key="accountn" class="f-black m-0">
            Account
          </a-menu-item>
          <a-menu-item key="Logout" class="f-black m-0" @click="logout">
            Logout
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
  </div>
</template>

<script>
import RegisterModal from '~/components/Auth/RegisterModal'
import LoginModal from '~/components/Auth/LoginModal'
import routeHelpers from '~/mixins/route-helpers'
import { EVENT_LOGIN_MODAL } from '~/services/Constant'

export default {
  components: {
    RegisterModal,
    LoginModal,
  },
  mixins: [routeHelpers],
  data() {
    return {
      visible: false,
      type: 1,
      query: '',
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuthorize
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  created() {},
  mounted() {},
  methods: {
    redirectTo(url) {
      this.$router.push({ path: url })
    },
    logout() {
      this.$store.commit('setToken', {
        token: null,
        status: null,
      })
      this.goto('/')
    },
    search() {
      let path = ''
      if (this.type === 1) {
        path = '/product/search'
      } else {
        path = '/service/search'
      }

      this.$router.push({
        path,
        query: { query: this.query },
      })
    },
    onChange(e) {
      this.query = e.target.value
    },
    getSearchType(type) {
      // this will save on vuex level so it will handle globaly without handling indiviualy
      this.type = type
    },
    postHandle() {
      if (this.isAuth) {
        this.goto('/post/choose')
      } else {
        this.$nuxt.$emit(EVENT_LOGIN_MODAL, true)
      }
    },
    handleClick(e) {
      console.log('click ', e)
    },
  },
}
</script>
<style scoped>
@media only screen and (max-width: 480px) {
  .ant-dropdown-link {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
  }
  .no-hover-nav.search-bar {
    margin-top: 20px;
  }
  .icon_search {
    top: 11px;
    color: #000 !important;
  }
}
.ant-dropdown-link > i.anticon.anticon-down {
  font-size: 18px;
}
</style>
