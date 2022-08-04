import request from '../request'
import { BASE_API } from './../Constant'

const baseUrl = `${BASE_API}offer`

function index(id) {
  return request({
    url: baseUrl + `/${id}`,
    method: 'post',
  })
}
function status(id, data) {
  return request({
    url: `${baseUrl}/status/${id}`,
    data,
    method: 'post',
  })
}

const OfferServices = {
  status,
  index,
}

export default OfferServices
