<template>
  <div class="container-box ask-main">
    <div class="d-flex">
      <h1>Send a Message</h1>
      <a-button @click="goto('/')">Cancel</a-button>
    </div>
    <!-- slider is not displaying -->
    <image-slider class="purchase_img_slider" :images="images" />
    <div class="toSpace">
      <hr />
      <p class="label">Click a Message to send or write your own</p>
      <ul class="msgs-list">
        <li class="msg">General question template</li>
        <li class="msg">General question template</li>
        <li class="msg">General question template</li>
        <li class="msg">General question template</li>
      </ul>
      <span>Send a message</span>
      <textarea
        name="msg"
        class="msg-area"
        rows="3"
        style="width: 100%"
      ></textarea>
      <button type="submit" class="ant-btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import routeHelpers from '~/mixins/route-helpers'
import MessagesServices from '~/services/API/MessagesServices'
// import imageSlider from '~/components/sliders/ImageSlider'
// import Product from '~/services/API/ProductServices'
// import { isEmpty } from '~/services/Utilities'

export default {
  mixins: [routeHelpers],
  data() {
    return {
      data: [],
      conversations: [],
      active: {},
      messages: [],
      messageText: '',
      moment,
      flex: 'flex',
      loading: true,
    }
  },
  mounted() {
    this.catchEvent()
  },
  beforeMount() {
    MessagesServices.conversations()
      .then((conversations) => {
        this.conversations = conversations.data
        if (conversations.data.length > 0) {
          this.fetchMessages(conversations.data[0])
        }
      })
      .finally(() => (this.loading = false))
  },
  methods: {
    catchEvent() {
      const user = this.$store.getters.getUser
      window.Echo.channel(`messages.${user.id}`).listen(
        'MessageReceived',
        (e) => {
          console.log(e)
          this.messages = e
        }
      )
    },
    fetchMessages(conversation) {
      this.active = conversation
      this.loading = true
      MessagesServices.get(conversation.id)
        .then((res) => (this.messages = res.data))
        .finally(() => (this.loading = false))
    },
    sendMessage() {
      this.loading = true
      MessagesServices.saveAssociated(this.active.id, {
        data: this.messageText,
      })
        .then(() => {
          this.fetchMessages(this.active)
          this.messageText = null
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
