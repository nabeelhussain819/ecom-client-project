import MessagesServices from '~/services/API/MessagesServices'
export default {
  methods: {
    getCount() {
      return MessagesServices.getcount().then((response) => {
        return response
      })
    },
    loadNotification() {
      this.notificationLoading = true
      return MessagesServices.getNotifications()
        .then((response) => {
          return response
        })
        .finally((this.notificationLoading = false))
    },
  },
}
