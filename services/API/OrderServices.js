import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}order`

function index(id) {
  return request({
    url: baseUrl + `/${id}`,
    method: 'GET',
  })
}
function getUserData() {
  return request({
    url: `${baseUrl}`,
    method: 'GET',
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
    url: baseUrl + `/${id}`,
    data,
    method: 'PATCH',
  })
}
const OrderServices = {
  save,
  update,
  index,
  getUserData,
}

export default OrderServices
