<template>
  <div
    class="msg_container"
    :type="flex"
    justify="space-between"
    wrap
    fill-height
    fill-width
  >
    <div class="message_left">
      <h1 class="msg_heading">Conversation</h1>
      <a-divider />
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

    <div class="message_right">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
        class="avatar_right msg_avatar"
      />
      <a-divider />
      <div class="section_scrollable">
        <a-list :loading="loading" class="comment-list" :data-source="messages">
          <a-list-item slot="renderItem" slot-scope="message">
            <!-- <template slot="actions">
              <span>{{ action }}</span>
            </template> -->
            <p slot="" class="msg_para">
              {{ message.data }}
            </p>
            <a-tooltip
              slot="datetime"
              :title="moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')"
            >
              <span>show date/time</span>
            </a-tooltip>
          </a-list-item>
        </a-list>
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
      window.Echo.channel('messages').listen('MessageReceived', (e) => {
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
<style scoped>
.msg_container {
  max-width: 1200px !important;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  background: rgb(240, 240, 240);
  padding: 10px;
  margin-bottom: 20px;
}

.message_left,
.section_scrollable {
  overflow-y: auto;
  position: relative;
  margin-left: -5px;
}

.message_left {
  width: 25% !important;
  float: left;
  min-height: 500px;
  padding: 5px;
  border-right: 1px solid gainsboro;
  /* background-color:#CCC; */
  overflow-y: auto;
  position: relative;
  margin-left: -5px;
}

.left-inner {
  background-color: gainsboro;
  border-radius: 5px;
  border: 3px solid rgb(196, 196, 196);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.name_message {
  display: flex !important;
  flex-direction: column;
  width: 50%;
  margin-left: 20px;
}

.msg_heading {
  text-align: center;
}

.show_message {
  text-overflow: ellipsis;
  width: 45%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

.message_right {
  padding: 20px;
  float: right;
  width: 75% !important;
  min-height: 500px;
}

.avatar_right {
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
}

.comment-list {
  display: flex;
}

.msg_avatar {
  width: 40px;
  height: auto;
  border-radius: 50px;
}

.msg_text_area > .msg_area {
  width: 100%;
}

.msg_para {
  border-radius: 3px;
  padding: 5px 10px;
  background: #d1d1d1;
}

.msg_text_area {
  /* position: absolute;
  bottom: 0;
  width: 100%; */
}

.msg_text_area {
  display: flex;
  justify-content: space-between;
  bottom: 5px;
}
</style>
