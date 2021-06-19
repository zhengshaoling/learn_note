<template>
  <div id="Index" class="container">
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      成功！异步请求跨域
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div>
      <div class="row">
        <div class="col-xs-6 col-md-3"><span class="glyphicon glyphicon-queen"></span></div>
        <div class="col-xs-6 col-md-3"><span class="glyphicon glyphicon-pencil"></span></div>
        <div class="col-xs-6 col-md-3"><span class="glyphicon glyphicon-music"></span></div>
        <div class="col-xs-6 col-md-3"><span class="glyphicon glyphicon-star"></span></div>
        <div class="col-xs-6 col-md-3"><span class="glyphicon glyphicon-user"></span></div>
      </div>
      <button type="button" class="btn btn-danger" @click='testEvent'>（危险）Danger</button>
      <a @click="testEvent">测试</a>
    </div>

  </div>

</template>

<script>
// import { test } from "~/api/test"; // 业务js
export default {
  name: 'Index',
  async asyncData(app) {
    let url = 'http://10.10.31.60:8088/service/cust/seo/p_getSeoData'
    let param = {
      "title": "nuxt-h5测试",
      "keyword": "description nuxt-h5测试 首页",
      "descriptions": "ome page description nuxt-h5测试 首页 seo"
    }
    // try {
      // let res = await app.$axios.post(url, param);
      // const { data, code } = res.data;
      // if (code == 0) {
      //   return { header: data.data };
      // }
    // } catch(e) {
    //   console.log('asyncData错误', e)
    // }
  },
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
      header: {}
    }
  },
  created() {
    // this.testEvent();
    // this.testdl();
  },
  methods: {
    testdl() {
      console.log('head', this.header);
    },
    async testEvent() {
      console.log('testEvent')
      let param = {
        "title": "众业达商城 找回密码",
        "keyword": "description 众业达商城 找回密码",
        "descriptions": "ome page description 众业达商城 找回密码 seo"
      }
      let url = 'http://192.168.31.112:50913/api/service/cust/seo/p_getSeoData'
      try {
        let res = await this.$axios.post(url, param);
        const { data, code } = res.data;
        if (code == 0) {
          console.log('test dom', data)
          $(".alert").alert()
        }
      } catch(e) {
        console.log('asyncData错误', e)
      }
    }
  }

}
</script>

<style>
.container {
  height: 100%;
  width: 100%;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 1rem;
  color: #35495e;
  letter-spacing: 0.01rem;
}

.subtitle {
  font-weight: 300;
  font-size: 0.42rem;
  color: #526488;
  word-spacing: 0.05rem;
  padding-bottom: 0.15rem;
}

.links {
  padding-top: 0.15rem;
}
</style>
