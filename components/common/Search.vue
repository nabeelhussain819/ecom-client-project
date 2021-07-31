<template>
  <div>
    <div v-if="$route.query.category === undefined">
      <h3>Categories</h3>
      <a-list
        item-layout="horizontal"
        :grid="{ gutter: 0 }"
        :data-source="categories"
        :split="false"
      >
        <a-list-item slot="renderItem" slot-scope="category">
          <a @click="selectCategory(category.id)">{{ category.name }}</a>
        </a-list-item>
      </a-list>
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
