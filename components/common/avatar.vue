<template>
  <a-avatar
    class="float-left"
    :src="image"
    shape="square"
    icon="user"
    :size="size"
  />
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: null,
    },
  },
}
</script>
