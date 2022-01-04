<!--
 * @Author: linglingling
 * @LastEditTime: 2021-09-17 17:33:53
 * @FilePath: \nuxt-seo\layouts\error.vue
-->
<!--
 * @Author: linglingling
-->
<template>
  <div class="error_box">
    <img :src="`${baseImgPath}404.png`" alt />
    <p class="tips1">sorry暂时未找到您查找的页面</p>
    <p class="tips2">
      <span id="secTime">{{count_down}}</span>
      <a id="secA" @click="navToHome">秒后自动跳转到主页</a>
    </p>
  </div>
</template>

<script>
export default {
  props: ["error"],
  // layout: "empty",
  data() {
    return {
      count_down: 4,
      timer: null
    };
  },
  mounted() {
    // 隐藏错误页跳转问题
    this.timer = setInterval(() => this.count_down--, 1000);
  },
  methods: {
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    navToHome() {
      window.location.href = '/'
    }
  },
  beforeDestroy() {
    this.clearTimer();
  },
  watch: {
    count_down() {
      if (this.count_down <= 0) {
        this.clearTimer();
        this.navToHome();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.error_box {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 100vw;
    height: 75vh;
    object-fit: contain;
  }
}
.tips1 {
  font-size: 1.5rem;
  color: #484848;
  font-weight: bold;
}
.tips2 {
  font-size: 1.2rem;
}
span {
  color: rgb(0, 152, 239);
}
// img {
//   display: inline-block;
//   margin-bottom: 30px;
// }
</style>
