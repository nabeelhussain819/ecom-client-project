<template>
  <a-layout-content>
    <bread-crumb />
    <a-divider />
    <h2 class="sub-heading">Include Some Details</h2>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Add Title">
        <a-input v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please enter product name' }],
            },
          ]" :size="size" placeholder="Please Enter Product Namee" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Add Price">
        <a-input v-decorator="[
            'price',
            {
              rules: [
                { required: true, message: 'Please enter product price' },
              ],
            },
          ]" :size="size" addon-before="USD" placeholder="Please Enter Product Price" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Description">
        <a-textarea v-decorator="[
            'description',
            {
              rules: [{ required: true, message: 'Please enter description' }],
            },
          ]" :size="size" placeholder="Description" :rows="4" />
      </a-form-item>
      <h2 class="sub-heading">Upload Photos</h2>
      <a-divider />
      <Upload />
      <a-divider />
      <h2 class="sub-heading">Choose Location</h2>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
        label="Current Location">
        <a-input v-decorator="[
            'current_location',
            {
              rules: [{ required: true, message: 'Current Location' }],
            },
          ]" placeholder="Current Location" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Select State">
        <a-select v-decorator="['state',{ rules: [{ required: true, message: 'State Required' }]}]">
          <a-select-option value="buy"> State </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="large" html-type="submit">
          Post Now
        </a-button>
      </a-form-item>
    </a-form>
  </a-layout-content>
</template>

<script>
  import Product from '~/services/API/Product'
  import Category from '~/services/API/Category'
  import Upload from '~/components/products/Upload'
  import BreadCrumb from '~/components/ui/BreadCrumb'
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
    components: {
      BreadCrumb,
      Upload
    },
    data() {
      return {
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
      }
    },
    mounted() {
      this.getAllCategories()
    },
    methods: {
      getAllCategories() {
        Category.all().then((response) => {
          this.categories = response
        })
      },
      save(params = {}) {
        Product.save(params).then((response) => {
          this.$emit('onComplete', response)
        })
      },
      handleSubmit(e) {
        e.preventDefault()

        this.form.validateFields((err, values) => {
          if (!err) {
            this.save(values)
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
    },
  }

</script>
