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
        >
          <a-select-option
            v-for="category in categories"
            :key="category.id.toString()"
            >{{ category.name }}
          </a-select-option>
        </a-select>
        <!-- <a-button type="primary" @click="showModal">
        Add New Category
      </a-button> -->
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit"> submit </a-button>
      </a-form-item>

      <!-- <a-modal v-model="visible" title="Add Category" footer width="80%">
      <add-category></add-category>
    </a-modal> -->
    </a-form>
  </a-layout-content>
</template>

<script>
import Product from '~/services/API/Product'
import Category from '~/services/API/Category'

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
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
  components: {},
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, {
        name: 'dynamic_rule',
      }),
      categories: {},
      componentKey: 0,
    }
  },
  mounted() {
    this.getAllCategories()
  },
  methods: {
    getAllCategories() {
      Category.all().then((response) => {
        this.categories = response
        //          this.getAllCategories();
      })
    },
    save(params = {}) {
      Product.save(params).then((response) => {
        this.$emit('onComplete', response)
      })
    },
    showModal() {
      this.visible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.save(values)
          alert('Product Added')
          location.reload()
        }
      })
    },

    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
  },
}
</script>
