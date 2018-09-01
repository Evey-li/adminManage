import axios from '@/libs/api.request'

export function getTableUser () {
  return axios.request({
    url: '/admin/getTableUser',
    method: 'get'
  })
}
export function getTableDemand () {
  return axios.request({
    url: '/admin/getTableDemand',
    method: 'get'
  })
}
export function getTablePhoto () {
  return axios.request({
    url: '/admin/getTablePhoto',
    method: 'get'
  })
}
export function groupByCategory () {
  return axios.request({
    url: '/admin/groupByCategory',
    method: 'get'
  })
}
export function getInforCardData () {
  return axios.request({
    url: '/admin/getInforCardData',
    method: 'get'
  })
}
export function getDemandBySeason () {
  return axios.request({
    url: '/admin/getDemandBySeason',
    method: 'get'
  })
}
export function getCategory(){
  return axios.request({
    url:'/admin/getCategory',
    method:'get'
  })
}
