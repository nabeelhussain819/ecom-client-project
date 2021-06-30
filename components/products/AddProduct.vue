<template>
  <a-skeleton :loading="false">
    <a-layout-content>
      <h2 class="sub-heading">Include Some Details</h2>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Add Title"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: product.name,
                rules: [
                  { required: true, message: 'Please enter product name' },
                ],
              },
            ]"
            :size="size"
            placeholder="Please Enter Product Name"
          />
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Description"
        >
          <a-textarea
            v-decorator="[
              'description',
              {
                initialValue: product.description,
                rules: [
                  { required: true, message: 'Please enter description' },
                ],
              },
            ]"
            :size="size"
            placeholder="Description"
            :rows="4"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Set a Price"
        >
          <a-input
            v-decorator="[
              'price',
              {
                initialValue: product.price,
                rules: [
                  { required: true, message: 'Please enter product price' },
                ],
              },
            ]"
            type="number"
            :size="size"
            addon-before="USD"
            placeholder="Please Enter Product Price"
          />
        </a-form-item>
        <h2 class="sub-heading">Attributes</h2>

        <a-form-item
          :key="index"
          v-for="(attribute, index) in category.attributes"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :label="attribute.name"
        >
          <a-input
            v-decorator="[
              `attributes[${index}][id]`,
              { initialValue: attribute.id },
            ]"
            hidden
          />
          <attribute
            :decorator="`attributes[${index}][value]`"
            :attribute="attribute"
          />
        </a-form-item>

        <h2 class="sub-heading">Confirm Your Location</h2>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Add location"
        >
          <auto-complete
            v-decorator="[
              'location',
              {
                initialValue: removeHtml(product.location),
                rules: [
                  { required: true, message: 'Please enter your location' },
                ],
              },
            ]"
            @currentLocation="currentLocation"
          />
        </a-form-item>
        <a-form-item class="d-none">
          <a-input
            v-decorator="[
              'longitude',
              {
                initialValue: product.longitude,
              },
            ]"
            hidden
          />
        </a-form-item>
        <a-form-item class="d-none">
          <a-input
            v-decorator="[
              'latitude',
              {
                initialValue: product.latitude,
              },
            ]"
            hidden
          />
        </a-form-item>
        <a-form-item class="d-none">
          <a-input
            v-decorator="[
              'google_address',
              {
                initialValue: product.google_address,
              },
            ]"
            hidden
          />
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            size="large"
            html-type="submit"
          >
            {{ isCreated ? 'Update Post' : 'Post Now' }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </a-skeleton>
</template>

<script>
import Product from '~/services/API/Product'
import Category from '~/services/API/Category'
import AutoComplete from '~/components/google/AutoComplete'
import Attribute from '~/components/common/Attribute'
import { isEmpty, success } from '~/services/Helpers'
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
}

export default {
  components: { AutoComplete, Attribute },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    isCreated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, {
        name: 'dynamic_rule',
      }),
      categories: {},
      visible: false,
      componentKey: 0,
      categoryAttributes: null,
      categoryId: null,
      size: 'large',
      category_id: null,
      errors: '',
      category: {},
    }
  },
  mounted() {
    this.category_id = this.$route.query.category_id
    Category.get(this.category_id || this.product.categories[0].category_id)
      .then((category) => (this.category = category))
      .catch((e) => (this.errors = e.response.data.errors))
  },
  methods: {
    getAllCategories() {
      Category.all().then((response) => {
        this.categories = response.data
      })
    },
    save(params = {}) {
      this.loading = true
      Product.save(params)
        .then((response) => {
          success(this, { message: response.message })
          this.$emit('onComplete', response)
          this.$router.push({
            path: `/user/product/${response.product.guid}`,
          })
        })
        .catch((e) => {
          this.errors = e.response.data.errors
        })
        .finally(() => {
          this.loading = false
        })
    },
    update(params = {}) {
      this.loading = true
      Product.update(this.product.guid, params)
        .then((response) => {
          success(this, { message: response.message })
          this.$emit('update', response)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { ...values, category_id: this.category_id }
          this.isCreated ? this.update(params) : this.save(params)
        }
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    selectCategory(categoryId) {
      this.categoryId = categoryId
    },
    currentLocation(location) {
      this.form.setFieldsValue({
        longitude: location.geometry.location.lng(),
        latitude: location.geometry.location.lat(),
        location: location.adr_address,
        google_address: location.adr_address,
      })
    },
    removeHtml(location) {
      if (!isEmpty(location)) {
        return location.replace(/<[^>]*>?/gm, '')
      }
      return null
    },
  },
}
</script>
