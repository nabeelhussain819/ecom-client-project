<template>
  <div>
    <a-layout-header class="clearfix header">
      <router-link to="/" class="logo">
        <h1 class="logo">LOGO</h1>
        <!-- <img
          style="border-radius: 100%"
          width="80px"
          src="https://www.creativefabrica.com/wp-content/uploads/2020/08/10/Online-Shop-Logo-Design-Template-Vector-Graphics-4916391-1.jpg"
      /> -->
      </router-link>
      <a-menu
        placeholder=""
        class="header_nav no-hover-nav"
        mode="horizontal"
        :style="{ lineHeight: '40px', cursor: 'pointer' }"
      >
        <category-lookup />
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
        <a-menu-item style="padding-right: 0">
          <div class="msg-box-main">
            <!-- <nuxt-link to="/">Home</nuxt-link> -->
            <button class="btn-msg-box" @click="isShow = !isShow">
              <img
                src="https://icon-library.com/images/pink-messaging-icon/pink-messaging-icon-7.jpg"
                alt="msg-icon"
                width="33px"
              />
            </button>
            <div v-if="!isShow" class="notify-msg-box">
              <a-tabs
                default-active-key="1"
                @change="changeTab"
                class="tabs-header"
              >
                <a-tab-pane key="1" tab="Messages">
                  <a-skeleton :loading="messagesLoading">
                    <a-row>
                      <a-col>
                        <h5 :messages="messages">
                          <div class="box-body">No messages yet.</div>
                        </h5>
                      </a-col>
                    </a-row>
                  </a-skeleton>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Notifications">
                  <a-skeleton :loading="notificationsLoading">
                    <a-row>
                      <a-col>
                        <div class="d-flex notify-list">
                          <div>
                            <img
                              src="https://iconape.com/wp-content/png_logo_vector/avatar-4.png"
                              alt="avatar"
                              class="box-avatar"
                              width="50px"
                            />
                          </div>
                          <div class="cmnt-box">
                            <p class="notify-text d-flex">
                              Robert has accepted your offer
                            </p>
                          </div>
                          <div>
                            <img
                              src="https://cdn.shopify.com/s/files/1/0232/3305/products/state_bicycle_4130_fixed_gear_matte_black_2.jpg"
                              alt="slider-img"
                              class="box-slider"
                              width="50px"
                            />
                          </div>
                        </div>
                      </a-col>
                    </a-row>
                    <!-- <a-row>
                      <a-col>
                        <h5 :notifications="notifications">
                          <div
                            v-for="({ data }, index) in user.notifications"
                            :key="index"
                            class="box-body"
                          >
                            <a :href="data.url">
                              {{ data.message }}
                            </a>
                          </div>
                        </h5>
                      </a-col>
                    </a-row> -->
                  </a-skeleton>
                </a-tab-pane>
              </a-tabs>
              <!-- this is a dummy list (ul), add components in messages and notification respactively. -->
            </div>
          </div>
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
        <a-menu-item v-if="!isAuth" key="2">
          <LoginModal />
        </a-menu-item>

        <a-menu-item v-if="!isAuth" key="3">
          <RegisterModal />
        </a-menu-item>
        <a-sub-menu v-if="isAuth" class="header-menu p-0 d-flex">
          <span slot="title" class="submenu-title-wrapper"
            ><a-avatar :src="user.profile_url" />
            <span class="text-capitalize" :style="{ marginLeft: 16 }">
              {{ user.name }}</span
            >
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-icon type="down" />
            </a>
          </span>
          <a-menu-item
            key="offer"
            class="f-black m-0"
            @click="goto('/user/advertisement')"
            >My Ads
          </a-menu-item>
          <a-menu-item
            key="board"
            class="f-black m-0"
            @click="goto('/user/saved')"
            >Saved Item
          </a-menu-item>
          <a-menu-item
            key="profile"
            class="f-black m-0"
            @click="goto('/user/profile')"
          >
            Profile
          </a-menu-item>
          <a-menu-item
            key="accountn"
            class="f-black m-0"
            @click="goto('/user/account')"
          >
            Account
          </a-menu-item>
          <a-menu-item
            key="accountn"
            class="f-black m-0"
            @click="goto('/user/offers')"
          >
            Offers
          </a-menu-item>
          <a-menu-item key="Logout" class="f-black m-0" @click="logout">
            Logout
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-menu class="mob-nav no-hover-nav d-flex">
      <category-lookup />
      <a-menu-item key="5" class="search-bar search-box-x">
        <a-icon type="search" class="icon_search" />
        <a-input
          id="search-input"
          class="search-input"
          placeholder="Search"
          @pressEnter="search"
          @change="onChange"
        >
        </a-input>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay" class="dropdown">
            <a-menu-item>
              <a-button type="primary" :class="type == 1 && `active`">
                Buying
              </a-button>
            </a-menu-item>
            <a-menu-item>
              <a-button
                type="primary"
                :class="type == 2 && `active`"
                @click="getSearchType(2)"
              >
                Services
              </a-button></a-menu-item
            >
            <a-menu-item>
              <a-button class="go-btn" type="primary" @click="search">
                GO
              </a-button>
            </a-menu-item>
            <a-menu-divider />
          </a-menu>
        </a-dropdown>
      </a-menu-item>
      <a-menu-item style="padding: 0">
        <div class="msg-box-main">
          <button class="btn-msg-box" @click="isShow = !isShow">
            <img
              src="https://icon-library.com/images/pink-messaging-icon/pink-messaging-icon-7.jpg"
              alt="msg-icon"
              width="33px"
            />
          </button>
          <div v-if="!isShow" class="notify-msg-box">
            <a-tabs default-active-key="1" @change="changeTab">
              <a-tab-pane key="1" tab="Messages">
                <a-skeleton :loading="messagesLoading">
                  <a-row>
                    <a-col>
                      <h5 :messages="messages">
                        <div class="box-body">dummy text1</div>
                      </h5>
                    </a-col>
                  </a-row>
                </a-skeleton>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Notifications">
                <a-skeleton :loading="notificationsLoading">
                  <a-row>
                    <a-col>
                      <h5 :notifications="notifications">
                        <div
                          v-for="({ data }, index) in user.notifications"
                          :key="index"
                          class="box-body"
                        >
                          <a :href="data.url">
                            {{ data.message }}
                          </a>
                        </div>
                      </h5>
                    </a-col>
                  </a-row>
                </a-skeleton>
              </a-tab-pane>
            </a-tabs>
            <!-- this is a dummy list (ul), add components in messages and notification respactively. -->
          </div>
        </div>
      </a-menu-item>

      <a-menu-item class="nearby-main">
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
      <a-menu-item v-if="!isAuth" key="2">
        <LoginModal />
      </a-menu-item>

      <a-menu-item v-if="!isAuth" key="3">
        <RegisterModal />
      </a-menu-item>
      <a-sub-menu v-if="isAuth" class="header-menu p-0 d-flex">
        <span slot="title" class="submenu-title-wrapper"
          ><a-avatar :src="user.profile_url" />
          <span class="text-capitalize" :style="{ marginLeft: 16 }">
            {{ user.name }}</span
          >
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <!-- <DownOutlined /> -->
            <!-- <a-icon type="down" /> -->
          </a>
        </span>
        <a-menu-item
          key="offer"
          class="f-black m-0"
          @click="goto('/user/advertisement')"
          >My Ads
        </a-menu-item>
        <a-menu-item
          key="board"
          class="f-black m-0"
          @click="goto('/user/saved')"
          >Saved Item
        </a-menu-item>
        <a-menu-item
          key="profile"
          class="f-black m-0"
          @click="goto('/user/profile')"
        >
          Profile
        </a-menu-item>
        <a-menu-item
          key="accountn"
          class="f-black m-0"
          @click="goto('/user/account')"
        >
          Account
        </a-menu-item>
        <a-menu-item
          key="accountn"
          class="f-black m-0"
          @click="goto('/user/offers')"
        >
          Offers
        </a-menu-item>
        <a-menu-item key="Logout" class="f-black m-0" @click="logout">
          Logout
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
// import { DownOutlined } from '@ant-design/icons-vue'

import RegisterModal from '~/components/Auth/RegisterModal'
import LoginModal from '~/components/Auth/LoginModal'
import routeHelpers from '~/mixins/route-helpers'
import categoryLookup from '~/components/categories/Lookup'
import { EVENT_LOGIN_MODAL } from '~/services/Constant'

export default {
  name: 'ToggleDiv',
  components: {
    // DownOutlined,

    RegisterModal,
    LoginModal,
    categoryLookup,
  },
  mixins: [routeHelpers],
  props: {
    msg: String,
  },
  data() {
    return {
      visible: false,
      type: 1,
      show: false,
      query: '',
      isShow: true,
      loading: false,
      purchaseLoading: false,
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
    changeTab(tab) {
      if (tab === 'notifications') {
        this.notificationsLoading = true
      }
    },
    toggle() {
      this.show = !this.show
    },
    logout() {
      localStorage.clear()
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
.logo {
  font-size: 23px;
  color: #fff;
  font-weight: 700;
}

@media only screen and (max-width: 480px) {
  .ant-dropdown-link {
    position: absolute;
    left: 0;
    margin-right: 0 !important;
    /* right: 0; */
    color: #000;
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

.header-menu > .ant-menu-submenu-title {
  padding: 0px !important;
}

.ant-dropdown-link > i.anticon.anticon-down {
  font-size: 15px;
}

.no-hover-nav.search-bar {
  padding: 0px !important;
  margin-left: 5px;
  margin-right: 5px;
}

/* ################################ */
/* @media screen and (max-width: 786px) {
  #menuExpand {
    display: none !important;
  }
}
.toggle-menu > .ant-menu-submenu-title {
  width: 132px;
}
.toggle-menu > ul {
  border-radius: 5px;
  flex-direction: column;
  background: aliceblue;
  width: fit-content;
  position: absolute;
  margin: auto;
  z-index: 98;
  right: 0;
  margin-right: 41px;
} */
</style>
