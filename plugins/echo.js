import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'abcdef',
  cluster: 'mt1',
  wsHost: 'web-api.letsdeploy.us',
  encrypted: true,
  wsPort: 6001,
  wssPort: 6001,
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  forceTLS: true,
  authEndpoint: 'http://web-api.letsdeploy.us/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  },
})
