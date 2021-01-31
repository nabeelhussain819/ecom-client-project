<template>
  <a-layout-content>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Product Name"
      >
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please enter product name' }],
            },
          ]"
          placeholder="Please Enter Product Namee"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Product price"
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
              rules: [{ required: true, message: 'Please enter description' }],
            },
          ]"
          placeholder="Description"
          :rows="4"
        />
      </a-form-item>
      <a-form-item label="Category" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'category_id',
            {
              rules: [{ required: true, message: 'Please select a Category' }],
            },
          ]"
          :allow-clear="true"
          :filter-option="filterOption"
          style="width: 100%"
          @change="selectCategory"
        >
          <a-select-option
            v-for="category in categories"
            :key="category.id.toString()"
            >{{ category.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit"> submit </a-button>
      </a-form-item>
      <attribute-grid
        v-if="categoryId !== null"
        :category-id="categoryId"
      ></attribute-grid>
    </a-form>
  </a-layout-content>
</template>

<script>
import Product from '~/services/API/Product'
import Category from '~/services/API/Category'
import AttributeGrid from '~/components/products/AttributesGrid'

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
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
  components: { AttributeGrid },
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
