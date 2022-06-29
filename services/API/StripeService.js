import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}stripe`

function generatePaymentIntent(guid) {
  return request({
    url: baseUrl + `/generate/${guid}`,
  })
}

function generateFeatureIntent(params = {}) {
  return request({
    url: baseUrl + '/feature',
    params,
  })
}

const StripeService = {
  generatePaymentIntent,
  generateFeatureIntent,
}

export default StripeService
