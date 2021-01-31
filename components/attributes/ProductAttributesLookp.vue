<template>
  <a-select @change="handleChange">
    <a-select-option v-for="attribute in attributes" :key="attribute.id">
      {{ attribute.name }}
    </a-select-option>
  </a-select>
</template>

<script>
function handleChange(e) {
  this.$emit('handleChange', e)
}

const methods = {
  handleChange,
}
const mounted = () => {}

const props = {
  attributes: {
    type: Array,
    default: () => [],
  },
  categoryId: {
    type: Number,
    default: null,
    required: true,
  },
}

const data = () => {
  return {
    categories: [],
  }
}

export default {
  props,
  data,
  mounted,
  methods,
}
</script>
