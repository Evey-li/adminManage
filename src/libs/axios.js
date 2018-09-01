import Axios from 'axios'
// import baseURL from '_conf/url'
import {
  Message
} from 'iview'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY
} from '@/libs/util'
import { getToken } from './util'

const SUCCESS = 0
const USER_EXIST = 0x10
const PARAM_ERROR = 0x11
const PASSWORD_NOT_MATCH = 0x12
const USER_NOT_LOGIN = 0x13
const USER_NOT_EXIST = 0x14
const SERVER_ERROR = 0x15
const SAME_PARAMS = 0x16
const SAME_USERNAME = 0x17
const NULL_RESULT = 0x18

function getError (code) {
  switch (code) {
    case USER_EXIST:
      return '账户已存在'
    case PARAM_ERROR:
      return '参数错误'
    case PASSWORD_NOT_MATCH:
      return '两次密码不一致'
    case USER_NOT_LOGIN:
      return '用户未登录'
    case USER_NOT_EXIST:
      return '用户不存在'
    case SERVER_ERROR:
      return '服务器错误'
    case SAME_PARAMS:
      return '参数相同'
    case SAME_USERNAME:
      return '已有相同用户名'
    case NULL_RESULT:
      return '无返回结果'
    default:
      return '未知错误'
  }
}

const baseURL = 'http://127.0.0.1:7001'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      if (!config.url.includes('/users')) {
        config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
      }
      // Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let {
        data
      } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }

      if (data.code !== SUCCESS) {
        // 后端服务在个别情况下回报201，待确认
        if (data.code === 401) {
          Cookies.remove(TOKEN_KEY)
          window.location.href = window.location.pathname + '#/login'
          Message.error('未登录，或登录失效，请登录')
        } else {
          if (data.error) Message.error(getError(data.code))
        }
        return false
      }

      return data.result
    }, (error) => {
      Message.error('服务内部错误')
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json; charset=utf-8',
        // 'Content-Type': 'application/html; charset=utf-8',
        // 'content-type': 'application/x-www-form-urlencoded',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
