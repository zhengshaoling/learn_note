/*
 * @Author: linglingling
 * @Date: 2021-05-11 15:18:48
 * @LastEditTime: 2021-09-17 10:30:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\plugins\common.js
 */
import Vue from 'vue'
import warmPop from '~/components/common/warmPop.vue'
import zButton from '~/components/common/zButton.vue'


Vue.component('warm-pop', warmPop)
Vue.component('z-button', zButton)

// 图片地址,用于静态文件拼接
if(window.location.host == ""){
  Vue.prototype.baseImgPath = '/img/'
}else{
  Vue.prototype.baseImgPath = '/img/'
}



// 全局注册过滤器
import filters from './filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));