import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'b3b98bac6133600147ab',
  wsHost: window.location.hostname,
  encrypted: true,
  secret: '2163ec7e9436092ea7a1',
  wsPort: 6001,
  wssPort: 6001,
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  forceTLS: true,
  authEndpoint: 'https://api.flexemarket.com/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  },
})
