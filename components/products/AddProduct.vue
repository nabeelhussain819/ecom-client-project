<template>
  <a-skeleton :loading="false">
    <!-- <a-steps :current="step"> -->
    <a-steps :current="step" @change="changeStep">
      <a-step title="Details" />
      <a-step title="Image" />
      <a-step title="Price" />
      <a-step v-if="product.has_shipping || has_shiping" title="Shipping" />
    </a-steps>
    <a-layout-content>
      <div v-if="step === 0">
        <h2 class="sub-heading">Include Some Details</h2>
        <a-form :form="form">
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
          <h2 class="sub-heading">Attributes</h2>

          <a-form-item
            v-for="(attribute, index) in category.attributes"
            :key="index"
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
              :values="product.products_attributes"
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
              :location="removeHtml(product.location)"
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
          <a-form-item
            v-if="isCreated"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Sold"
          >
            <a-switch
              v-decorator="[
                'is_sold',
                {
                  initialValue: product.is_sold,

                  valuePropName: 'checked',
                },
              ]"
              :size="size"
              placeholder="Please Enter Product Switch"
            />
          </a-form-item>
        </a-form>
      </div>
      <div v-if="step === 1">
        <h2 class="sub-heading">Upload Product Images</h2>
        <a-skeleton :loading="!showUploader">
          <upload :product="product" :f-list="fileList" />
        </a-skeleton>
      </div>
      <a-form v-if="step === 2" :form="form">
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
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Has Shipping"
        >
          <a-switch
            v-decorator="[
              'has_shipping',
              {
                initialValue: product.has_shipping,
                rules: [
                  { required: true, message: 'Please enter product price' },
                ],
              },
            ]"
            type="number"
            :size="size"
            addon-before="USD"
            placeholder="Please Enter Product Price"
            v-on="showShiping"
            @change="handleShipping"
          />
        </a-form-item>
      </a-form>
      <div v-if="step === 3">
        <a-form :form="form"><Shiping :product="product" /></a-form>
      </div>
      <a-button
        :loading="loading"
        type="primary"
        size="large"
        @click="handleSubmit"
      >
        Next
      </a-button>
      <a-button
        v-if="step > 0"
        size="large"
        style="margin-left: 2px"
        @click="step--"
      >
        Previous
      </a-button>
    </a-layout-content>
  </a-skeleton>
</template>

<script>
import Product from '~/services/API/ProductServices'
import Category from '~/services/API/Category'
import AutoComplete from '~/components/google/AutoComplete'
import upload from '~/components/products/Upload'
import Attribute from '~/components/common/Attribute'
import Shiping from '~/components/products/shipping/Form'
import { isEmpty } from '~/services/Helpers'
import notifications from '~/mixins/notifications'

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
  components: { AutoComplete, Attribute, upload, Shiping },
  mixins: [notifications],
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
    fileList: {
      type: Array,
      default() {
        return []
      },
    },
    showUploader: {
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
      step: 3, // for tetsing
      has_shiping: false,
    }
  },
  mounted() {
    this.paramNavigate()

    this.category_id = this.$route.query.category_id
    if (this.product.category_id) {
      this.category = this.product.category

      this.$emit('getCategoryName', this.category.name)
      // this.step = 2
    } else {
      Category.get(this.category_id)
        .then((category) => {
          this.category = category

          this.$emit('getCategoryName', category.name)
        })
        .catch((e) => (this.errors = e.response.data.errors))
    }
  },
  methods: {
    showShiping(a, b) {
      console.log(a, b)
    },
    gotoStep(step) {
      this.step = parseInt(step)
    },
    paramNavigate() {
      const params = this.$route.query
      if (!isEmpty(params.step)) {
        this.gotoStep(params.step)
      }
    },
    getAllCategories() {
      Category.all().then((response) => {
        this.categories = response.data
      })
    },
    save(params = {}) {
      this.loading = true
      Product.save(params)
        .then((response) => {
          this.$emit('onComplete', response)
          this.success(response.message)
          this.$router.push({
            path: `/user/product/${response.product.guid}`,
          })
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
    update(params = {}) {
      this.loading = true
      Product.update(this.product.guid, params)
        .then((response) => {
          this.success(response.message)
          this.$emit('update', response)
          // if (this.step === 2) {
          //   this.$router.push({ path: '/' })
          // }
          this.step++
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
    handleSubmit(e) {
      e.preventDefault()

      if (this.step === 1) this.step++
      else {
        this.form.validateFields((err, values) => {
          if (!err) {
            const params = { ...values, category_id: this.category_id }
            this.isCreated ? this.update(params) : this.save(params)
          }
        })
      }
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
    handleShipping(isTrue) {
      this.has_shiping = isTrue
    },
    changeStep(step) {
      this.step = step
    },
  },
}
</script>
