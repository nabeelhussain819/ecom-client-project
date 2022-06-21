import request from '../request'
import { BASE_API } from '../Constant'
// @todo this file name should be product service
const baseUrl = `${BASE_API}order`

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
}

export default OrderServices
