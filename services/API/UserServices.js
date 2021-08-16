import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}user/`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function detail(params = {}) {
  return request({
    url: `${baseUrl}detail`,
    params,
  })
}

function upload(data) {
  return request({
    url: `${baseUrl}upload`,
    data,
    method: 'POST',
  })
}

function messages(id, params = {}) {
  return request({
    url: `${baseUrl}${id}/messages`,
    params,
  })
}

const UserService = {
  all,
  detail,
  upload,
  messages,
}

export default UserService
