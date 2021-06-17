/*
 * @Author: shaoling
 * @Date: 2021-06-17 15:58:50
 * @LastEditTime: 2021-06-17 16:08:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-h5\store\getters.js
 */
const getters = {
        device: state => state.app.device,
        userInfo: state => state.user.userInfo
      }

export default getters
