import request from '../request'
import { BASE_URL, BASE_API } from './../Constant'

const baseUrl = `${BASE_URL}`
const baseApi = `${BASE_API}`

function register(data) {
  return request({
    url: `${baseApi}auth/register`,
    data,
    method: 'POST',
  })
}

function login(data) {
  return request({
    url: `${baseApi}auth/login`,
    data,
    method: 'POST',
  })
}

// function loginWithSocial(token)
// {
//   return request({
//   url: `${baseApi}login?token=${token}`,
//   method:'POST'
//   });
// }

function logout(data = {}) {
  return request({
    url: `${baseUrl}logout`,
    data,
    method: 'POST',
  })
}

function forgetpassword(data) {
  return request({
    url: `${baseApi}password/create`,
    data,
    method: 'POST',
  })
}

function resetPassword(data) {
  return request({
    url: `${baseApi}password/reset`,
    data,
    method: 'POST',
  })
}
const AuthService = {
  register,
  login,
  logout,
  forgetpassword,
  resetPassword,
}

export default AuthService
