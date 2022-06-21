import request from '../request'
import { BASE_API } from '../Constant'
const baseUrl = `${BASE_API}stripe`

function generatePaymentIntent(guid) {
  return request({
    url: baseUrl + `/generate/${guid}`,
  })
}

const StripeService = {
  generatePaymentIntent,
}

export default StripeService
