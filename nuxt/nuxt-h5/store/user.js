/*
 * @Author: shaoling
 * @Date: 2021-06-17 15:59:41
 * @LastEditTime: 2021-06-17 20:59:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-h5\store\user.js
 */

export const state = () => ({
        token: '', // getToken(),
        userInfo: '',
})
export const mutations = {
        SET_TOKEN: (state, token) => {
                state.token = token
        },
        SET_USERINFO: (state, userInfo) => {
                state.userInfo = userInfo
        }
}

export const actions = {
        loginByPhone({commit}, userInfo) {
                commit('SET_USERINFO', data)
        }
}
      
       
     