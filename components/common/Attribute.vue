<template>
  <a-form-item>
    <a-input
      v-if="attribute.type === TYPES.TEXT"
      v-decorator="[decorator, { initialValue: defaultValues[attribute.id] }]"
      @pressEnter="(e) => onChange(e.target.value, attribute)"
    />

    <a-checkbox
      v-if="attribute.type === TYPES.CHECKBOX"
      v-decorator="[
        decorator,
        {
          initialValue: defaultValues[attribute.id],
          valuePropName: 'checked',
        },
      ]"
      @change="(e) => onChange(e.target.checked, attribute)"
    />

    <a-select
      v-if="attribute.type === TYPES.SELECT && !filter"
      v-decorator="[decorator, { initialValue: defaultValues[attribute.id] }]"
      :options="
        attribute.options.map((option) => {
          return { value: option, label: option }
        })
      "
      @change="(value) => onChange(value, attribute)"
    />

    <a-checkbox-group
      v-if="
        attribute.type === TYPES.CHECKBOX_GROUP ||
        (filter && attribute.type === TYPES.SELECT)
      "
      v-decorator="[decorator, { initialValue: defaultValues[attribute.id] }]"
      :options="
        attribute.options.map((option) => {
          return { value: option, label: option }
        })
      "
      @change="(value) => onChange(value, attribute)"
    />

    <a-radio-group
      v-if="attribute.type === TYPES.RADIO_GROUP"
      v-decorator="[decorator, { initialValue: defaultValues[attribute.id] }]"
      :options="
        attribute.options.map((option) => {
          return { value: option, label: option }
        })
      "
      @change="(value) => onChange(value, attribute)"
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
    filter: {
      type: Boolean,
      default() {
        return false
      },
    },
    attribute: {
      type: Object,
      default() {
        return {}
      },
    },
    values: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return { TYPES: ATTRIBUTE_TYPES, defaultValues: {} }
  },
  beforeMount() {
    this.values.map((pa) => (this.defaultValues[pa.attribute_id] = pa.value))
  },
  methods: {
    onChange(value, attribute) {
      this.$emit('changed', value, attribute)
    },
  },
}
</script>
