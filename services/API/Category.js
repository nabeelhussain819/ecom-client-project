import request from '~/services/request'
import { BASE_API } from '~/services/Constant'

const baseUrl = `${BASE_API}categories`

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

function productAttributes(categoryId, params = {}) {
  return request({
    url: `${baseUrl}/product-attributes/${categoryId}`,
    params,
  })
}

const Category = {
  all,
  save,
  productAttributes,
}

export default Category
