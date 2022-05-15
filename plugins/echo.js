import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'ABCD',
  cluster: 'mt1',
  wsHost: 'web-api.letsdeploy.us',
  wsPort: 6001,
  wssPort: 6001,
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  encrypted: false,
  forceTLS: true,
  authEndpoint: 'https://web-api.letsdeploy.us/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  },
})
