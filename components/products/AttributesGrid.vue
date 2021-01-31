<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd"> Add </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template slot="property">
        <a-select>
          <a-select-option
            v-for="category in categoriesAttribute"
            :key="category.id"
          >
            {{ category.attribute.name }}
          </a-select-option>
        </a-select>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import Category from '~/services/API/Category'
import { isEmpty } from '~/services/Helpers'
import ProductAttributesLookp from '~/components/attributes/ProductAttributesLookp'

function data() {
  return {
    dataSource: [],
    count: 2,
    columns: [
      {
        title: 'Property',
        dataIndex: 'attribute_id',
        scopedSlots: { customRender: 'property' },
      },
      {
        title: '',
        dataIndex: 'address',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      },
    ],
    attributes: [],
    unitTypes: [],
    categoriesAttribute: [],
  }
}

const components = {
  ProductAttributesLookp,
}

function updated() {}

const methods = {
  onCellChange(key, dataIndex, value) {
    const dataSource = [...this.dataSource]
    const target = dataSource.find((item) => item.key === key)
    if (target) {
      target[dataIndex] = value
      this.dataSource = dataSource
    }
  },
  onDelete(key) {
    const dataSource = [...this.dataSource]
    this.dataSource = dataSource.filter((item) => item.key !== key)
  },
  handleAdd() {
    const { count, dataSource } = this
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    }
    this.dataSource = [...dataSource, newData]
    this.count = count + 1
  },
  selectCategory(categoryId) {
    const $this = this
    if (!isEmpty(categoryId)) {
      Category.productAttributes(categoryId).then((categories) => {
        $this.categoriesAttribute = categories
      })
    }
  },
  isEmpty,
}

const props = {
  categoryId: {
    type: String,
    default: null,
    required: true,
  },
}

function mounted() {
  this.selectCategory(this.categoryId)
}

const watch = {
  categoryId(next, prev) {
    if (next !== prev) {
      this.categoryId = next
      this.selectCategory(next)
    }
  },
}
export default {
  components,
  props,
  data,
  watch,
  mounted,
  updated,
  methods,
}
</script>
