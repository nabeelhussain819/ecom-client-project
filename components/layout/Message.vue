<template>
  <div
    v-flex
    class="msg_container"
    type="flex"
    justify="space-between"
    wrap
    fill-height
    fill-width
  >
    <div class="message_left">
      <h1 class="msg_heading">Conversation</h1>
      <a-divider />
      <div class="msg_list">
        <div
          v-for="conversation in conversations"
          :key="conversation.id"
          class="left-inner"
          @click="fetchMessages(conversation)"
        >
          <div>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
              class="msg_avatar"
            />
          </div>
          <div class="name_message">
            <a slot="author">{{ conversation.recipient_name }}</a>
            <p slot="" class="show_message">
              {{ conversation.data }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="message_right">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
        class="avatar_right msg_avatar"
      />
      <a-divider />
      <div class="section_scrollable">
        <div class="msg_list">
          <a-list
            :loading="loading"
            class="comment-list"
            :data-source="messages"
          >
            <a-list-item slot="renderItem" slot-scope="message">
              <!-- <template slot="actions">
              <span>{{ action }}</span>
            </template> -->
              <p slot="" class="msg_para">
                {{ message.data }}
              </p>
              <a-tooltip
                slot="datetime"
                :title="
                  moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')
                "
              >
                <span>show date/time</span>
              </a-tooltip>
            </a-list-item>
          </a-list>
        </div>
      </div>

      <div class="msg_text_area">
        <a-form-item class="msg_area">
          <a-textarea
            v-model="messageText"
            :rows="4"
            placeholder="Type Message"
            @pressEnter="sendMessage"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="sendMessage"> Submit</a-button>
        </a-form-item>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import UserServices from '~/services/API/UserServices'
export default {
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
    UserServices.conversations()
      .then((conversations) => {
        this.conversations = conversations
        if (conversations.length > 0) {
          this.fetchMessages(conversations[0])
        }
      })
      .finally(() => (this.loading = false))
  },
  methods: {
    catchEvent() {
      window.Echo.private('messages.1').listen('MessageReceived', (e) => {
        console.log('ad')
        console.log(e)
      })
    },
    fetchMessages(conversation) {
      this.active = conversation
      const loggedInUser = this.$store.getters.getUser
      this.loading = true
      UserServices.messages(
        loggedInUser.id === conversation.sender_id
          ? conversation.recipient_id
          : conversation.sender_id
      )
        .then((res) => (this.messages = res.data))
        .finally(() => (this.loading = false))
    },
    sendMessage() {
      this.loading = true
      UserServices.sendMessage(this.active.recipient_id, {
        message: this.messageText,
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
