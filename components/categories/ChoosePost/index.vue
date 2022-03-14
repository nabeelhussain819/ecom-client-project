<template>
  <div>
    <a-row
      type="flex"
      justify="space-around"
      align="middle"
      class="dark-header"
      :gutter="{ xs: 15, md: 14 }"
    >
      <a-col>
        <a-card class="tiles-card" size="small" title="Choose A Category">
          <a-col :xs="24" :md="12">
            <tile
              :image="product_img"
              title="Sell Item"
              alignment="middle"
              class="tile_hover pt-2"
              @click="chooseCategory(PRODUCT_ID)"
            />
          </a-col>
          <a-col :xs="24" :md="12">
            <tile
              :image="category_img"
              title="Provide Services"
              alignment="middle"
              class="tile_hover"
              @click="chooseCategory(CATEGORY_ID)"
            />
          </a-col>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Tile from '~/components/cards/Tile'
import { PRODUCT_ID, CATEGORY_ID } from '~/services/Constant'
export default {
  components: { Tile },
  data() {
    return {
      loading: false,
      showProduct: false,
      PRODUCT_ID,
      CATEGORY_ID,
      product_img:
        'https://www.pngplay.com/wp-content/uploads/7/Online-Shopping-PNG-Images-HD.png',
      category_img:
        'https://media-exp1.licdn.com/dms/image/C511BAQHBopfaAwjBqw/company-background_10000/0/1563452711438?e=2147483647&v=beta&t=ezhm5Xglv-Ycjrnx-zc2BD0eN2cRP9i7C2QCQhv3fSM',
    }
  },
  methods: {
    chooseCategory(type) {
      this.$emit('getPostType', type)
    },
  },
}
</script>
<style scoped>
.tile_hover:hover {
  background-color: #ffd1d8e0;
}
</style>
