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
