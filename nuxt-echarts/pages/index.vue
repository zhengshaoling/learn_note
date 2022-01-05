<!--
 * @Author: 000
-->
<template>
  <div class="container linear-gradient-bg">
    <div class="box">
      <nuxt-link class="txt-white" to="/admin">后台</nuxt-link>
      <nuxt-link class="txt-white" to="/map">地图</nuxt-link>
      <nuxt-link class="txt-white" to="/wms">WMS</nuxt-link>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Index',
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
      navToMap() {
        this.$router.push('/map')
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
