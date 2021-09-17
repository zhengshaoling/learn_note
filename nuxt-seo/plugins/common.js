/*
 * @Author: linglingling
 * @Date: 2021-05-11 15:18:48
 * @LastEditTime: 2021-09-17 14:17:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\plugins\common.js
 */
import Vue from 'vue'
import warmPop from '~/components/common/warmPop.vue'
import zButton from '~/components/common/zButton.vue'


Vue.component('warm-pop', warmPop)
Vue.component('z-button', zButton)

Vue.directive('down', {
  inserted: (el, binding) => {
    el.style.cssText = 'cursor: pointer;color:write;'
    el.addEventListener('click', () => {
      console.log(binding.value)
      let link = document.createElement('a')
      let url = baseDownloadUrl + binding.value
      // 这里是将url转成blob地址，
      fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
        link.href = URL.createObjectURL(blob)
        console.log(link.href)
        link.download = ''
        document.body.appendChild(link)
        link.click()
      })
    })
  }
})



// 图片地址,用于静态文件拼接
if(window.location.host == ""){
  Vue.prototype.baseImgPath = '/img/'
}else{
  Vue.prototype.baseImgPath = '/img/'
}



// 全局注册过滤器
import filters from './filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));