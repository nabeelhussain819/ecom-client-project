import request from '../request'
import { BASE_API } from './../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}services`

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

function get(id, params = {}) {
  return request({
    url: `${baseUrl}/show/${id}`,
    params,
  })
}

function destroy(id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'DELETE',
  })
}

function images(serviceId) {
  return request({
    url: `${baseUrl}/media/${serviceId}`,
    method: 'GET',
  })
}

function removeImage(mediaId) {
  return request({
    url: `${baseUrl}/media/${mediaId}`,
    method: 'DELETE',
  })
}

function self(params = {}) {
  return request({
    url: `${baseUrl}/self`,
    params,
  })
}

function search(params = {}) {
  return request({
    url: `${baseUrl}/search`,
    params: this.$route.query,
  })
}

function uploadImages(serviceId, data) {
  console.log(serviceId, data)
  return request({
    url: `${baseUrl}/upload/${serviceId}`,
    data,
    method: 'POST',
  })
}

const Services = {
  all,
  save,
  update,
  get,
  destroy,
  uploadImages,
  images,
  removeImage,
  self,
  search,
}

export default Services
