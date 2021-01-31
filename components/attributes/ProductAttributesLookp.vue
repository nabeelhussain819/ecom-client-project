<template>
  <a-select @change="handleChange">
    <a-select-option v-for="attribute in attributes" :key="attribute.id">
      {{ attribute.id }}
    </a-select-option>
  </a-select>
</template>

<script>
function handleChange(e) {
  this.$emit('handleChange', e)
}

const props = {
  categoryId: {
    type: String,
    default: null,
  },
  attributes: {
    type: Array,
    default: () => [],
    required: true,
  },
}

const methods = {
  handleChange,
}
const mounted = () => {}

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
