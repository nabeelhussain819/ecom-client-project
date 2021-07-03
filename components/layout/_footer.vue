<template>
  <a-layout-footer class="footer">
    <a-row>
      <a-col>
        <a-space id="space-links" :size="size">
          <p>Explore</p>
          <p>Terms</p>
          <p>Privacy</p>
          <p>Help</p>
          <p>Safe Trade Sports</p>
        </a-space>
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
export default {
  data() {
    return {
      size: 27,
      size2: 27,
    }
  },
}
</script>
