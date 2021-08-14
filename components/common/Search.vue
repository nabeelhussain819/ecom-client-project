<template>
  <div class="container">
    <div v-if="$route.query.category === undefined" class="container-main">
      <a-row type="flex" justify="center">
        <a-row>
          <a-col flex="25%" class="card-style main-filter">
            <a-card title="Categories" style="width: 250px">
              <a-list
                item-layout="horizontal"
                :grid="{ gutter: 0 }"
                :data-source="categories"
                :split="false"
              >
                <a-list-item slot="renderItem" slot-scope="category">
                  <a @click="selectCategory(category.id)">{{
                    category.name
                  }}</a>
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
          <a-row flex="25%">
            <a-col style="width: 250px">
              <!-- bottom side select card -->
              <a-select style="width: 250px" placeholder="Pickup Distance">
                <a-select-option value="example1">
                  <a-radio-group v-model="value" @change="onChange">
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
              </a-select>
              <a-select style="width: 250px" placeholder="Price">
                <a-select-option value="example2">
                  <a-radio-group v-model="value2" @change="onChange">
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
              </a-select>
              <!-- select cards types ends -->
            </a-col>
          </a-row>
        </a-row>
        <Content class="product-nav-width">
          <a-col>
            <div class="side_nav">
              <h2>Heading</h2>
              <a-row class="product_nav">
                <Content>
                  <a-menu mode="horizontal" class="nav_style">
                    <a-menu-item key="btn1"> Navigation One </a-menu-item>
                    <a-menu-item key="btn2"> Navigation Two </a-menu-item>
                    <a-menu-item key="btn3">Navigation three</a-menu-item>
                    <a-menu-item key="btn4">Navigation Four</a-menu-item>
                  </a-menu></Content
                >
              </a-row>
            </div>
            <a-row>
              <a-col :span="6">
                <a-card hoverable style="width: auto" class="product_card">
                  <img slot="cover" alt="Brand Img" :src="image" />
                  <a-card-meta title="Card Title">
                    www.example.com
                  </a-card-meta>
                  <p>$45</p>
                  <span>Fort WorthFx</span>
                </a-card>
              </a-col>
              <a-col :span="6">
                <a-card hoverable style="width: auto" class="product_card">
                  <img slot="cover" alt="Brand Img" :src="image" />
                  <a-card-meta title="Card Title">
                    www.example.com
                  </a-card-meta>
                  <p>$45</p>
                  <span>Fort WorthFx</span>
                </a-card>
              </a-col>
              <a-col :span="6">
                <a-card hoverable style="width: auto" class="product_card">
                  <img slot="cover" alt="Brand Img" :src="image" />
                  <a-card-meta title="Card Title">
                    www.example.com
                  </a-card-meta>
                  <p>$45</p>
                  <span>Fort WorthFx</span>
                </a-card>
              </a-col>
              <a-col :span="6">
                <a-card hoverable style="width: auto" class="product_card">
                  <img slot="cover" alt="Brand Img" :src="image" />
                  <a-card-meta title="Card Title">
                    www.example.com
                  </a-card-meta>
                  <p>$45</p>
                  <span>Fort WorthFx</span>
                </a-card>
              </a-col>
            </a-row>
          </a-col>
        </Content>
      </a-row>
    </div>

    <div v-else>
      <h3>Filters</h3>
      <a-list :data-source="categories[0] ? categories[0].attributes : []">
        <a-list-item slot="renderItem" slot-scope="attribute">
          <h4 class="text-capitalize">{{ attribute.name }}</h4>
          <attribute :attribute="attribute" :filter="true" @changed="changed" />
        </a-list-item>
      </a-list>
    </div>
    <a-divider />
    <div>
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="results">
        <a-list-item slot="renderItem" slot-scope="result">
          <a-card
            :key="Search"
            :title="`Rs. ${result.price}`"
            style="cursor: pointer"
            @click="resultsDetails(result.guid)"
          >
            <p>{{ result.name }}</p>
            <a-row>
              <a-col span="12">
                <div v-html="`${result.google_address}`" />
              </a-col>
              <a-col span="12">
                <div style="float: right">
                  {{ moment(result.created_at).fromNow() }}
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Attribute from '~/components/common/Attribute'

export default {
  components: { Attribute },
  props: {
    service: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String,
      default: 'product',
    },
  },
  data() {
    return {
      categories: [],
      results: [],
      filters: {},
      moment,
      // dropdown dummy val
      value: 1,
      value1: 1,
      value2: 1,
      radioStyle: {
        display: 'block',
        height: '35px',
        lineHeight: '35px',
      },
    }
  },
  watch: {
    '$route.query.query': {
      handler() {
        this.search()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectCategory(category) {
      this.$router.push({
        path: `/${this.type}/search`,
        query: { query: this.$route.query.query, category },
      })
    },
    search() {
      const params = { query: this.$route.query.query }
      if (this.$route.query.category) {
        params.category_id = this.$route.query.category
        params.filters = this.filters
      }

      this.service(params)
        .then(({ categories, results }) => {
          this.categories = categories
          this.results = results
        })
        .catch(() => {})
    },
    changed(value, attribute) {
      this.filters = { ...this.filters, [parseInt(attribute.id)]: value }
      this.search()
    },
    resultsDetails(guid) {
      this.$router.push({ path: `/${this.type}/${guid}` })
    },
  },
}
</script>
<style scoped>
.product_card {
  margin: 0px 5px !important;
}
</style>
