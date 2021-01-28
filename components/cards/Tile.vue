<template>
  <a-card :loading="loading" hoverable @click="onClick">
    <img slot="cover" :alt="title" :src="image" />
    <a-card-meta :title="title">
      <template slot="description">{{ description }} </template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>
