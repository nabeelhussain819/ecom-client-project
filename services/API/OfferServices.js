import request from '../request'
import { BASE_API } from './../Constant'

const baseUrl = `${BASE_API}offer`

function status(id, data) {
  return request({
    url: `${baseUrl}/status/${id}`,
    data,
    method: 'post',
  })
}

const OfferServices = {
  status,
}

export default OfferServices
