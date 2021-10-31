<template>
  <div class="container adModel">
    <a-form-model>
      <h1 style="text-align: center; margin: 15px 0px">
        Reach More Buyers And Seller Faster!
      </h1>
      <h1>Sell Faster Now</h1>
      <div class="ad_list">
        <a-form-model-item label="">
          <a-col>
            <h1 class="ad_price" style="float: right">$299</h1>

            <a-row>
              <a-radio value="1" class="adType"
                >Featured ad for 30 Days
              </a-radio>
            </a-row>
            <a-row>
              <a-checkbox value="1">
                Reach Upto 10 times more buyers
              </a-checkbox>
            </a-row>
          </a-col>
        </a-form-model-item>
      </div>
    </a-form-model>
    <a-form-model>
      <div class="ad_list">
        <a-form-model-item label="">
          <a-col>
            <h1 class="ad_price" style="float: right; color: #9e9e9e">$149</h1>

            <a-row>
              <a-radio value="1" class="adType"
                >Featured ad for 7 Days
              </a-radio>
            </a-row>
            <a-row>
              <a-checkbox value="1">
                Reach Upto 10 times more buyers
              </a-checkbox>
            </a-row>
          </a-col>
        </a-form-model-item>
      </div>
    </a-form-model>
    <a-form-model>
      <div class="ad_list">
        <a-form-model-item label="">
          <a-col>
            <h1 class="ad_btm_price" style="float: right; color: #9e9e9e">
              $$
            </h1>

            <a-row>
              <a-radio value="1" class="adType"
                >Sales captain for 30 days
              </a-radio>
            </a-row>
          </a-col>
        </a-form-model-item>
      </div>
    </a-form-model>
    <a-form-model>
      <div class="ad_list">
        <a-form-model-item label="">
          <a-col>
            <h1 class="ad_btm_price" style="float: right; color: #9e9e9e">
              $$
            </h1>

            <a-row>
              <a-radio value="1" class="adType"
                >Sales captain for 7 days
              </a-radio>
            </a-row>
          </a-col>
        </a-form-model-item>
      </div>
    </a-form-model>
    <a-form-model-item class="ads_button">
      <a-button type="primary" @click="onSubmit"> AVAILABLE NOW </a-button>
      <a-button type="default" @click="onSubmit"> SKIP </a-button>
    </a-form-model-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form)
    },
  },
}
</script>
