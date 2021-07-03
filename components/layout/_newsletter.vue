<template>
  <div>
    <a-layout-footer class="footer-newsletter">
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        :gutter="{ xs: 15, md: 14 }"
      >
        <a-col :span="5">
          <h2>Join Our NewsLetter Now</h2>
          <p>Register now to get updates on promotions</p>
        </a-col>
        <a-col :span="5">
          <a-input-search placeholder="Enter Email" size="large">
            <a-button
              slot="enterButton"
              style="color: white; background-color: #000"
            >
              Submit
            </a-button>
          </a-input-search>
        </a-col>
      </a-row>
    </a-layout-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
