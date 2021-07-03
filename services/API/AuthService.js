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
    url: `${baseApi}forgot-password`,
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

function facebookLogin(data) {
  return request({
    url: `${baseApi}auth/facebook-login`,
    data,
    method: 'POST',
  })
}

function googleLogin(data) {
  return request({
    url: `${baseApi}auth/google-login`,
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
  facebookLogin,
  googleLogin,
}

export default AuthService
