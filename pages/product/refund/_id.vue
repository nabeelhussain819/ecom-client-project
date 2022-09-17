<template>
  <a-list
    item-layout="horizontal"
    :loading="loading"
    class="product-detail-list container"
    :data-source="data"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <!-- <a slot="title" class="text-capitalize" href="https://www.antdv.com/">
        {{ item.product.name }}
        </a> -->
        <div slot="description">
          <div class="left container">
            <h1>Purchased Item Details</h1>
            <a-col :xs="24" :sm="17" class="left_product">
              <table class="table-100">
                <tbody>
                  <tr>
                    <td>
                      <img
                        slot="cover"
                        class="product-image"
                        v-if="item.product.cover_image == null"
                        alt="example"
                        :src="'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'"
                      />
                      <img
                        slot="cover"
                        class="product-image"
                        alt="example"
                        v-else
                        :src="item.product.cover_image"
                      />
                      <!-- <image-slider class="tile_img" :images="images" /> -->
                    </td>
                    <td class="td">
                      <h1
                        type="inline "
                        :title="item.buyer.name"
                        class="primary-text product-price"
                      >
                        {{ item.product.name }}
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscin Lorem
                        ipsum dolor sit amet, consectetur adipiscin
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <a-divider />
            </a-col>
          </div>
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import notifications from '~/mixins/notifications'
import { isEmpty } from '~/services/Helpers'
import OrderServices from '~/services/API/OrderServices'
import routeHelpers from '~/mixins/route-helpers'

export default {
  mixins: [notifications, routeHelpers],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: {},
      size: 'large',
      images: [],
      visible: false,
      isSaved: false,
      showPromoteModal: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      OrderServices.index(this.$route.params.id)
        .then((response) => {
          this.data = response
          this.getImages(response)
        })
        .finally(() => (this.loading = false))
    },
    isEmpty,
    handleOk() {
      if (this.isAuth) {
        this.visible = !this.visible
      } else {
      }
    },
    getImages(product) {
      if (!isEmpty(product.media)) {
        console.log(product)
        const tempImage = []
        product.media.map((images) => tempImage.push(images.url))
        this.images = tempImage
        return
      }

      this.images = [
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
      ]
    },
    // getFirstImage(product) {
    //   if (!isEmpty(product.media)) {
    //     return product.media[0].url
    //   } else {
    //     return 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    //   }
    // },
  },
}
</script>
<style scoped>
.sold-product-img {
  text-align: center;
}
</style>
