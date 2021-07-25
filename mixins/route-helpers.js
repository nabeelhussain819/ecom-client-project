export default {
  methods: {
    goto(url) {
      this.$router.push({ path: url })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
