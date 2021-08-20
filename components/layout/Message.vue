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
        <div class="left-inner">
          <div>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
              class="msg_avatar"
            />
          </div>
          <div class="name_message">
            <a slot="author">Han Solo</a>
            <p slot="" class="show_message">
              "Messagesdvdsvv fdsfesfsdv fwfefewf dsfewfc"
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
        <a-list class="comment-list" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- <template slot="actions">
              <span>{{ action }}</span>
            </template> -->
            <p slot="" class="msg_para">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
              nulla? Sequi vitae adipisci eos corrupti repudiandae, voluptas
              laboriosam veniam voluptatum dolorem provident placeat id
              asperiores pariatur quod laborum est? Nesciunt!"
            </p>
            <a-tooltip
              slot="datetime"
              :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')"
            >
              <span>show date/time</span>
            </a-tooltip>
          </a-list-item>
        </a-list>
      </div>
      <div class="msg_text_area">
        <a-form-item class="msg_area">
          <a-textarea
            :rows="4"
            placeholder="Type Message"
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit"> Submit </a-button>
        </a-form-item>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      data: [
        {
          // actions: ['Reply to'],
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days'),
        },
      ],
      moment,
    }
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
.section_scrollable {
  position: relative;
  margin-left: -5px;
}
.msg_list {
  overflow-y: scroll;
  min-height: 410px;
}
.message_left {
  max-height: 500px;
  width: 25% !important;
  float: left;
  min-height: 500px;
  padding: 5px;
  border-right: 1px solid gainsboro;
  /* background-color:#CCC; */
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
  margin-bottom: 3px;
  flex-wrap: wrap;
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
  width: 75%;
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
