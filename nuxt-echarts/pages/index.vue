<!--
 * @Author: your name
 * @Date: 2021-04-01 10:27:39
 * @LastEditTime: 2021-09-17 13:40:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\pages\index.vue
-->
<template>
  <div class="container linear-gradient-bg">
    <div class="box">
      <nuxt-link class="txt-white" to="/admin">后台</nuxt-link>
      <nuxt-link class="txt-white" to="/map">地图</nuxt-link>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Index',
    // async asyncData(app) {
      // let url = 'http://10.10.31.60:8088/service/cust/seo/p_getSeoData'
      // let param = {
      //   "title": "众业达商城首页",
      //   "keyword": "description 众业达商城 首页",
      //   "descriptions": "ome page description 众业达商城 首页 seo"
      // }
      // try {
      //   let res = await app.$axios.post(url, param);
      //   const { data, code } = res.data;
      //   if (code == 0) {
      //     return { header: data.data };
      //   }
      // } catch(e) {
      //   console.log('asyncData错误', e)
      // }
    // },
    head() {
      console.log('this.header', this.header)
      return {
        title: this.header.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.header.descriptions
          }, {
            hid: 'keywords',
            name: 'keywords',
            content: this.header.keyword
          }
        ]
      }
    },
    data() {
      return {
        header: {
          title: '标题',
          descriptions: '描述',
          keyword: '关键字'
        }
      }
    },
    created() {

    },
    methods: {
      jumpToAdmin() {
        this.$router.push('/admin')
      }
    }
  }
</script>

<style>
.box {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt-white {
  color: #fff;
  font-size: 18px;
  margin: 5px;
  text-decoration: none;
}
</style>
