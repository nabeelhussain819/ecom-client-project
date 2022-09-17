import MessagesServices from '~/services/API/MessagesServices'
export default {
  methods: {
    getCount() {
      return MessagesServices.getcount().then((response) => {
        return response
      })
    },
    
  },
}
