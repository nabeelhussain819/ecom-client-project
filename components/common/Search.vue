<template>
  <div class="container">
    <div v-if="$route.query.category === undefined" class="container-main">
      <a-row type="flex" justify="center">
        <a-row>
          <a-col flex="21%" class="card-style main-filter">
            <a-card title="Categories" style="width: 250px">
              <a-list
                item-layout="horizontal"
                :grid="{ gutter: 0 }"
                :data-source="categories"
                :split="false"
                class="category_name_container"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="category"
                  class="category_name"
                >
                  <a @click="selectCategory(category.id)">
                    <span
                      :class="
                        matchQueryParams(category.id)
                          ? 'high_light_selected_category_name'
                          : ''
                      "
                    >
                      {{ category.name }}
                    </span>
                  </a>
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
          <a-row>
            <a-col style="width: 250px">
              <!-- // dynmaic attr -->
              <!-- <a-list
                :data-source="categories[0] ? categories[0].attributes : []"
              >
                <a-list-item slot="renderItem" slot-scope="attribute">
                  <h4 class="text-capitalize">{{ attribute.name }}</h4>
                  <attribute
                    :attribute="attribute"
                    :filter="true"
                    @changed="changed"
                  />
                </a-list-item>
              </a-list> -->
              <!-- // dynmaic attr -->
              <!-- bottom side select card -->
              <!-- <a-select style="width: 250px" placeholder="Pickup Distance">
                <a-select-option value="example1">
                  <a-radio-group>
                    <a-radio :style="radioStyle" :value="1"> Option A </a-radio>
                    <a-radio :style="radioStyle" :value="2"> Option B </a-radio>
                    <a-radio :style="radioStyle" :value="3"> Option C </a-radio>
                    <a-radio :style="radioStyle" :value="4">
                      More...
                      <a-input
                        v-if="value === 4"
                        :style="{ width: 100, marginLeft: 10 }"
                      />
                    </a-radio>
                  </a-radio-group>
                </a-select-option>
              </a-select> -->
              <a-select
                ref="select"
                style="width: 250px"
                placeholder="Price"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="example2" disabled>
                  <a-radio-group>
                    <a-radio
                      :style="radioStyle"
                      value="1"
                      @click="selectPrice(0, 50)"
                    >
                      Below 50
                    </a-radio>
                    <a-radio
                      :style="radioStyle"
                      value="2"
                      @click="selectPrice(50, 100)"
                    >
                      50-100
                    </a-radio>
                    <a-radio
                      :style="radioStyle"
                      value="3"
                      @click="selectPrice(100, 250)"
                    >
                      100-250
                    </a-radio>
                    <a-radio
                      :style="radioStyle"
                      value="5"
                      @click="selectPrice(250, 1000)"
                    >
                      250 Above
                    </a-radio>
                  </a-radio-group>
                </a-select-option>
              </a-select>
              <!-- select cards types ends -->
            </a-col>
          </a-row>
        </a-row>
        <div class="product-nav-width">
          <a-col>
            <div class="side_nav border p-2">
              <h2>Searched Items</h2>
              <a-row class="product_nav">
                <div>
                  <a-menu mode="horizontal" class="nav_style">
                    <a-menu-item key="btn1"> Trending </a-menu-item>
                    <a-menu-item key="btn2">Closest </a-menu-item>
                    <a-menu-item key="btn3">Popular</a-menu-item>
                    <!-- <a-menu-item key="btn4">Slow/High</a-menu-item> -->
                  </a-menu>
                </div>
              </a-row>
            </div>

            <!-- products -->
            <template>
              <div style="padding: 1px">
                <a-row :gutter="92">
                  <div
                    v-for="(product, index) in products"
                    :span="6"
                    :key="index"
                  >
                    <a-col :span="6" class="mb-2">
                      <Tile :product="product" :goto-link="type" />
                    </a-col>
                  </div>
                </a-row>
              </div>
            </template>
            <!-- // products -->
          </a-col>
        </div>
      </a-row>
    </div>

    <div v-else class="filter_main">
      <h3 class="filter_categ_heading">Filters</h3>
      <a-list :data-source="categories[0] ? categories[0].attributes : []">
        <a-list-item slot="renderItem" slot-scope="attribute">
          <h4 class="text-capitalize">{{ attribute.name }}:</h4>

          <attribute :attribute="attribute" :filter="true" @changed="changed" />
        </a-list-item>
      </a-list>
    </div>
    <a-divider />
  </div>
</template>

<script>
import moment from 'moment'
import Attribute from '~/components/common/Attribute'
import Tile from '~/components/products/Tile'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { Attribute, Tile },
  beforeRouteUpdate(to, from, next) {
    this.fetch(to.query)

    next()
  },
  props: {
    service: {
      type: Function,
      default: () => {},
    },
    gotoLink: { type: String, default: 'product' },
    type: {
      type: String,
      default: 'product',
    },
  },
  data() {
    return {
      categories: [],
      results: [],
      products: [],
      filters: {},
      moment,
      // dropdown dummy val
      value: 1,
      value1: 1,
      value2: 1,
      defaultFilters: {
        active: true,
        // is_sold: false,
      },
      radioStyle: {
        display: 'block',
        height: '35px',
        lineHeight: '35px',
      },
    }
  },
  watch: {
    // '$route.query.query': {
    //   handler() {
    //     this.search()
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  mounted() {
    this.onFetch()
  },
  methods: {
    onFetch(params = {}) {
      params = { ...params, ...this.defaultFilters, active: true }
      this.service(isEmpty(params) ? this.$route.query : params)
        .then(({ categories, results, category }) => {
          this.categories = categories
          this.products = results
        })
        .catch(() => {})
    },
    selectPrice(min, max) {
      this.search({ min_price: min, max_price: max })
      // this.$router.push({
      //   path: `/${this.type}/search`,
      //   query: { query: this.$route.query.query, category },
      // })
    },
    selectCategory(categoryId) {
      this.search({ category_id: categoryId })
      // this.$router.push({
      //   path: `/${this.type}/search`,
      //   query: { query: this.$route.query.query, category },
      // })
    },
    search(searchParams = {}) {
      const params = {
        ...searchParams,
        query: this.$route.query.query,
        ...this.filters,
      }
      this.onFetch()
      // if (this.$route.query.category) {
      //   params.category_id = this.$route.query.category
      //   params.filters = this.filters
      // }
      this.params = params
      this.$router.push({
        path: `/${this.type}/search`,
        query: { ...this.params },
      })
    },
    changed(value, attribute) {
      this.filters = { ...this.filters, [parseInt(attribute.id)]: value }
      this.search()
    },
    resultsDetails(guid) {
      this.$router.push({ path: `/${this.type}/${guid}` })
    },
    matchQueryParams(params) {
      // eslint-disable-next-line eqeqeq
      if (this.$route.query.category_id == params) {
        return true
      }
      return false
    },
  },
}
</script>
<style scoped>
.filter_categ_heading {
  text-align: center;
  font-size: 25px;
}
.filter_main > .ant-spin-container > .ant-list-items {
  width: 100%;
}
.category_name {
  margin: 0px !important;
}
.category_main {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.category_main > span {
  /* margin-bottom: 6px; */
  margin: 5px 10px;
  width: 22%;
}
.high_light_selected_category_name {
  font-weight: bolder;
  color: black;
}
</style>
