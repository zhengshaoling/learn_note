import axios from 'axios'
const user = {
  state: {
    token: '',
    userInfo: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(account, userInfo.password).then(response => {
          const data = response.Authorization
          commit('SET_TOKEN', data)
          setToken(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     // getUserInfo(state.token)
    //     getUserInfo(state.token).then(response => {
    //       response.vo['roles']=['admin']
    //       if (!response.vo) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.vo
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit("SET_USERINFO", data)
    //       commit('SET_NAME', data.realName || data.nickname)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.title)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    //
    // // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     // 临时退出登录
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resolve()
    //   })
    // },
    //
    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // },
    //
    // // 获取按钮权限
    // getAuthorizedItem({ commit, dispatch }, getAuth) {
    //   return new Promise(resolve => {
    //     commit('SET_GETAUTHOR', getAuth)
    //   })
    // }
  }
}

export default user
