import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'ABCD',
  wsHost: '127.0.0.1',
  encrypted: true,
  wsPort: 6001,
  wssPort: 6001,
  enabledTransports: ['ws'],
  disableStats: true,
  forceTLS: false,
  authEndpoint: 'https://127.0.0.1/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  },
})
