import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import {
  setToken,
  getToken
} from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({
      commit
    }, {
      adminName,
      password
    }) {
      adminName = adminName.trim()
      return new Promise((resolve, reject) => {
        login({
          adminName,
          password
        }).then(res => {
          console.log(res)
          commit('setToken', res.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          // console.log('********************')

          // console.log(res)
          // const data = res.data
          // const data = {
          //   access: ['admin'],
          //   avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
          //   user_id: '14138',
          //   user_name: 'iview_admin'
          // }
          commit('setAvator', res.headImgUrl)
          commit('setUserName', res.adminName)
          commit('setUserId', res._id)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
