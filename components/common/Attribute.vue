<template>
  <a-form-item>
    <a-input v-if="attribute.type === TYPES.TEXT" v-decorator="[decorator]" />

    <a-checkbox
      v-if="attribute.type === TYPES.CHECKBOX"
      v-decorator="[decorator]"
    />

    <a-select
      v-if="attribute.type === TYPES.SELECT"
      v-decorator="[decorator]"
      :options="
        attribute.options.map((option) => {
          return { value: option, label: option }
        })
      "
    />

    <a-checkbox-group
      v-if="attribute.type === TYPES.CHECKBOX_GROUP"
      v-decorator="[decorator]"
      :options="
        attribute.options.map((option) => {
          return { value: option, label: option }
        })
      "
    />

    <a-radio-group
      v-if="attribute.type === TYPES.RADIO_GROUP"
      v-decorator="[decorator]"
      :options="
        attribute.options.map((option) => {
          return { value: option, label: option }
        })
      "
    />
  </a-form-item>
</template>

<script>
import { ATTRIBUTE_TYPES } from '~/services/Constant'

export default {
  name: 'Attribute',
  props: {
    decorator: {
      type: String,
      default() {
        return ''
      },
    },
    attribute: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return { TYPES: ATTRIBUTE_TYPES }
  },
}
</script>
