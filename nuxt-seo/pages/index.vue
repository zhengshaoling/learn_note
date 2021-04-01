<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-seo
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  async asyncData(app) {
    let url = 'http://10.10.31.60:8088/service/cust/seo/p_getSeoData'
    let param = {
      "title": "众业达商城首页",
      "keyword": "description 众业达商城 首页",
      "descriptions": "ome page description 众业达商城 首页 seo"
    }
    try {
      let res = await app.$axios.post(url, param);
      const { data, code } = res.data;
      if (code == 0) {
        return { header: data.data };
      }
    } catch(e) {
      console.log('asyncData错误', e)
    }


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

    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
