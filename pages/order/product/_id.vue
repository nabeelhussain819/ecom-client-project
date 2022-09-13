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
          <div class="left">
            <h1>Purchased Item Detials</h1>
            <a-col :xs="24" :sm="17" class="left_product_detail">
              <table class="table">
                <tbody>
                  <tr>
                    <td>
                      <img
                        slot="cover"
                        class="product-image"
                        alt="example"
                        :src="images"
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
              <table class="table-100">
                <tbody>
                  <tr>
                    <td>order Number</td>
                    <td class="td-100"><p>adas</p></td>
                  </tr>
                  <tr>
                    <td>Invoice Date</td>
                    <td class="td-100">{{ item.created_at }}</td>
                  </tr>
                  <tr>
                    <td>Shipped from</td>
                    <td class="td-100">{{ item.shipping_detail.name }}</td>
                  </tr>
                  <tr>
                    <td>Shipped to</td>
                    <td class="td-100"><p>adas</p></td>
                  </tr>
                </tbody>
              </table>
              <div class="purchase-content">
                <a-divider />
                <table class="table-100">
                  <tbody>
                    <tr>
                      <td><h4>Buyer Name</h4></td>
                      <td class="td-100">
                        <p>
                          {{ item.buyer.name }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td><h4>Payment Method</h4></td>
                      <td class="td-100">{{ item.payment_intent }}</td>
                    </tr>
                  </tbody>
                </table>
                <a-divider />
                <table class="table-100">
                  <tbody>
                    <tr>
                      <td>Item Price</td>
                      <td class="td-100">
                        <p>
                          $
                          {{ item.product.price }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td class="td-100">$7.00 Static</td>
                    </tr>
                    <tr>
                      <td>Sales Tax (Estimated)</td>
                      <td class="td-100">$0.00</td>
                    </tr>
                    <tr>
                      <td><h3>You Pay</h3></td>
                      <td class="td-100">
                        <b>{{ item.product.price }}$ </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a-divider />
                <table class="table-100">
                  <tbody>
                    <tr>
                      <td><h2>Status</h2></td>
                      <td class="td-100">
                        <i>Pending Shipment</i>
                        <a href="https://www.fedex.com/en-us/tracking.html">
                          <p class="primary-text">Track our item?</p>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
// import imageSlider from '~/components/sliders/ImageSlider'

export default {
  // components: {
  //   imageSlider,
  // },
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
