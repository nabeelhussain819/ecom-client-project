<template>
  <a-card :loading="loading" hoverable @click="onClick">
    <img slot="cover" :alt="title" :src="image" />
    <a-card-meta :title="title" :align="alignment">
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
    alignment:{
      type:String,
      default:''
    }
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
