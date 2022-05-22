<template>
  <div>
    <!-- <a-form :form="form" @submit="handleSubmit"> -->
    <a-form-item>
      {{ product.shipping_size_id }}
      <!-- <pre> {{ product }}</pre> -->
      <a-radio-group
        v-decorator="[
          'shipping_size_id',
          {
            initialValue: product.shipping_size_id,
            rules: [{ required: true, message: 'Please enter product price' }],
            valuePropName: 'radio',
          },
        ]"
        :default-value="product.shipping_size_id"
      >
        <a-radio
          v-for="shipping in shippings"
          :key="shipping.id"
          class="shiping-radio"
          :value="shipping.id"
        >
          {{ shipping.name }}
          {{ shipping.description }}
        </a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- <a-form-item
      ><a-button
        html-type="submit"
        :loading="loading"
        type="primary"
        size="large"
      >
        Post
      </a-button></a-form-item
    > -->
    <!-- </a-form> -->
  </div>
</template>
<script>
export default {
  props: { product: { type: Object, default: () => ({}) } },
  data() {
    return {
      shippings: [
        { id: 1, name: 'X-small', description: '80z(1/2lb)' },
        { id: 2, name: 'Small', description: '80z(1/2lb)' },
        { id: 3, name: 'Medium', description: '80z(1/2lb)' },
        { id: 4, name: 'Large', description: '80z(1/2lb)' },
      ],
      form: this.$form.createForm(this, {
        name: 'shipping_details',
      }),
      loading: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    },
  },
}
</script>
<style scoped>
.shiping-radio {
  border: 1px solid red;
}
</style>
