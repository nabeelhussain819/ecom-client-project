<template>
  <div>
    <a-row>
      <add-product v-if="showProductForms" />
      <a-col :xs="24" :span="12">
        <choose-post />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import AddProduct from '~/components/products/AddProduct'
import ChoosePost from '~/components/categories/ChoosePost'

export default {
  components: { AddProduct, ChoosePost },
  data() {
    return {
      showProductForms: false,
    }
  },
}
</script>
