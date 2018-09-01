import axios from '@/libs/api.request'

export const login = ({
  adminName,
  password
}) => {
  const data = {
    adminName,
    password
  }
  return axios.request({
    url: '/admin/login',
    data,
    method: 'POST'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'admin/getAdmin',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/admin/logout',
    method: 'post'
  })
}
