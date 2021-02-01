<template>
  <a-skeleton :loading="false">
    <a-layout-content>
      <bread-crumb />
      <a-divider />
      <h2 class="sub-heading">Confrim Your Location</h2>
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
          label="Price"
        >
          <a-input
            v-decorator="[
              'price',
              {
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
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Description"
        >
          <a-textarea
            v-decorator="[
              'description',
              {
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

        <a-divider />
        <upload />
        <a-divider />
        <h2 class="sub-heading">Confrim Your Location</h2>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Add location"
        >
          <auto-complete
            v-decorator="[
              'location',
              {
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
                initialValue: null,
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
                initialValue: null,
              },
            ]"
            hidden
          />
        </a-form-item>
        <a-form-item class="d-none">
          <a-input
            v-decorator="[
              'google_location',
              {
                initialValue: null,
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
            Post Now
          </a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </a-skeleton>
</template>

<script>
import Product from '~/services/API/Product'
import Category from '~/services/API/Category'
import Upload from '~/components/products/Upload'
import BreadCrumb from '~/components/ui/BreadCrumb'
import AutoComplete from '~/components/google/AutoComplete'
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
  components: { BreadCrumb, Upload, AutoComplete },
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
    }
  },
  mounted() {
    this.category_id = this.$route.query.category_id
  },
  methods: {
    getAllCategories() {
      Category.all().then((response) => {
        this.categories = response
      })
    },
    save(params = {}) {
      this.loading = true
      Product.save(params)
        .then((response) => {
          this.$emit('onComplete', response)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          this.save({ ...values, category_id: this.category_id })
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
        google_location: location.adr_address,
      })
    },
  },
}
</script>
