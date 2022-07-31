<template>
  <a-layout-footer class="footer">
    <a-row>
      <a-col>
        <div id="space-links" :size="size">
          <a href="javascript:;">Explore</a>
          <a href="javascript:;">Terms</a>
          <a @click="goto('/user/privacy')">privacy</a>
          <a href="javascript:;">Help</a>
          <a href="javascript:;">Safe Trade Sports</a>
        </div>
      </a-col>
      <a-col>
        <a-space id="space-icon" :size="size2">
          <span class="dot-facebook">
            <a-icon id="facebook" type="facebook" />
          </span>
          <span class="dot-twitter">
            <a-icon type="twitter" />
          </span>
          <span class="dot-linkedin">
            <a-icon type="linkedin" />
          </span>
          <span class="dot-instagram">
            <a-icon type="instagram" />
          </span>
          <span class="dot-youtube">
            <a-icon type="youtube" theme="filled" />
          </span>
          <span class="dot-mail">
            <a-icon id="mail" type="mail" theme="filled" />
          </span>
        </a-space>
      </a-col>
      <a-col>
        <p class="copyright-para">Copyright 2020, dummy logo.com</p>
      </a-col>
    </a-row>
  </a-layout-footer>
</template>

<script>
import routeHelpers from '~/mixins/route-helpers'
// import privacy from '/privacy'

export default {
  components: {
    // privacy,
  },
  mixins: [routeHelpers],

  data() {
    return {
      size: 27,
      size2: 27,
    }
  },
  methods: {},
}
</script>
