import request from '../request'
import { BASE_API } from './../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}message`

function all(params = {}) {
  return request({
    url: baseUrl,
    params,
  })
}

function save(data) {
  return request({
    url: baseUrl,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  return request({
    url: `${baseUrl}/${id}`,
    data,
    method: 'PATCH',
  })
}

function destroy(id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'DELETE',
  })
}

function get(id, params = {}) {
  return request({
    url: `${baseUrl}/${id}`,
    params,
  })
}

function conversations(params = {}) {
  return request({
    url: `${baseUrl}/conversations`,
    params,
  })
}

function saveAssociated(id, data) {
  return request({
    url: `${baseUrl}/saveAssociated/${id}`,
    data,
    method: 'POST',
  })
}

function getcount() {
  return request({
    url: `${baseUrl}/getCount`,
    method: 'get',
  })
}

function getNotifications() {
  return request({
    url: `${baseUrl}/getNotifications`,
    method: 'get',
  })
}

const MessagesServices = {
  get,
  conversations,
  all,
  save,
  update,
  destroy,
  saveAssociated,
  getcount,
  getNotifications,
}

export default MessagesServices
