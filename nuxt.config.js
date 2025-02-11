export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Eccom',
    mode: 'universal',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['ant-design-vue/dist/antd.css', '@/assets/css/style.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/antd-ui',
    {
      src: '~/plugins/vue-masonry-css',
      mode: 'client',
    },
    { src: '@/plugins/google-maps.js', ssr: false },
    { src: '@/plugins/persistedState.js' },
    { src: '@/plugins/echo.js', ssr: false },
    { src: '@/plugins/vue-stripe.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/laravel-echo',
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  env: {
    baseUrl: process.env.VUE_APP_BASEURL,
    api: process.env.VUE_APP_API_ENDPOINT,
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    grant_type: process.env.VUE_APP_GRANT_TYPE,
    facebook_app_id: process.env.FACEBOOK_APP_ID,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    stripe_pk: process.env.STRIPE_PK,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^vue2-google-maps($|\/)/, 'vue-google-autocomplete'],
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
  },
}

// Command for conventions
// git config core.autocrlf false
// git rm --cached -r .
// git reset --hard
