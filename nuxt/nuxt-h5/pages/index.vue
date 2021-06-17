<template>
  <div id="Index">
    <!-- 导航部分 -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">
            <strong>LOGO LOGO</strong> <!--            LUOYOU 洛友UI-->
            AI开放平台
          </a>
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#n-nav"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="navbar-collapse" id="n-nav">
          <ul class="nav navbar-nav">
            <li class="nav-list dropdown">
              <a
                class="dropdown-toggle"
                data-toggle="dropdown"
                id="dropdownAIPro"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <span>AI产品</span>
              </a>
              <div
                class="top-tooltip dropdown-menu"
                aria-labelledby="dropdownAIPro"
              >
                <div class="header-dropdown">
                  <div
                    class="dropdown-item"
                    id="dropdown-product"
                    data-height="200"
                  >
                    <div class="dropdown-inner">
                      <div class="product-title">通用类OCR</div>
                      <div class="product-list">
                        <a href="/api/vision/text_recog_ch_en_coordinate"
                          >通用文本识别(中英)</a
                        >
                        <a href="/api/vision/text_recognize_3d1"
                          >通用文本识别(多语言)</a
                        >
                        <a href="/api/demo/table">通用表格识别</a>
                      </div>
                      <div class="product-title">证照类OCR</div>
                      <div class="product-list">
                        <a href="/api/vision/id_card">身份证</a>
                        <a href="/api/vision/social_security_cards">社保卡</a>
                        <a href="/api/vision/family_register">户口本</a>
                        <a href="/api/vision/passport">护照</a>
                        <a href="/api/vision/business_card">名片</a>
                        <a href="/api/vision/bank_card">银行卡</a>
                        <a href="/api/vision/marriage_certificate">结婚证</a>
                        <a href="/api/vision/divorce_certificate">离婚证</a>
                        <a href="/api/vision/property_certificate">房产证</a>
                        <a href="/api/vision/real_estate_certificate"
                          >不动产证</a
                        >
                      </div>
                      <div class="product-title">车辆相关OCR</div>
                      <div class="product-list">
                        <a href="/api/vision/vehicle_license">行驶证</a>
                        <a href="/api/vision/drive_license">驾驶证</a>
                        <a href="/api/vision/vehicle_certificate">车辆合格证</a>
                        <a href="/api/vision/vehicle_registration"
                          >车辆登记证</a
                        >
                      </div>
                      <div class="product-title">公司商铺类OCR</div>
                      <div class="product-list">
                        <a href="/api/vision/shop_ticket">商户小票</a>
                        <a href="/api/vision/tax_certificate">税务登记证</a>
                        <a href="/api/vision/opening_license">开户许可证</a>
                        <a href="/api/vision/business_license">营业执照</a>
                        <a href="/api/vision/organization_certificate"
                          >组织机构代码证</a
                        >
                      </div>
                      <div class="product-title">票据类OCR</div>
                      <div class="product-list">
                        <a href="/api/vision/vat_invoice">增值税发票</a>
                        <a href="/api/vision/vat_roll_invoice">增值税卷票</a>
                        <a href="/api/vision/train_ticket">火车票</a>
                        <a href="/api/vision/air_transport">飞机行程单</a>
                        <a href="/api/vision/taxi_ticket">出租车发票</a>
                        <a href="/api/vision/vehicle_sales_invoice">购车发票</a>
                      </div>
                      <div class="product-title">智能技术</div>
                      <div class="product-list">
                        <a href="/solution/general_receipt_recog">票据机器人</a>
                        <a href="/solution/general_license_recog">证照机器人</a>
                        <a href="/solution/text_config">文本配置机器人</a>
                        <a href="/solution/table_config">表格配置机器人</a>
                        <a href="/text-setting/rect-selection"
                          >框选配置机器人</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="/temp">技术文档</a></li>
          </ul>

          <ul class="navbar-right nav navbar-nav">
            <li><a href="/login">控制台</a></li>
            <li><a href="/login">登录</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- banner部分 -->
    <div class="banner-box">
      <div
        id="myCarousel"
        class="carousel slide banner"
        data-ride="carousel"
        data-interval="5000"
      >
        <!-- 轮播（Carousel）指标 -->
        <!-- <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1" class=""></li>
            <li data-target="#myCarousel" data-slide-to="2" class=""></li>
        </ol>    -->
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
          <div class="item active">
            <img src="/slide1.png" alt="First slide" />
          </div>
          <div class="item">
            <img src="/slide2.png" alt="Second slide" />
          </div>
          <div class="item">
            <img src="/slide3.png" alt="Third slide" />
          </div>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <!-- 左右切换按钮 -->
        <a
          class="carousel-control-prev prev-slide"
          href="#myCarousel"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a
          class="carousel-control-next next-slide"
          href="#myCarousel"
          data-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>

    <div class="section section-product">
      <div class="title">专注于图像文字处理</div>

      <div class="container">
        <div class="col-sm-4">
          <div class="product">
            <div class="top">
              <div class="icon">
                <img
                  src="https://static.intsig.net/dps/img/ai/index/icon-basic.png"
                  alt=""
                />
              </div>
              <div class="name">基础OCR</div>
              <div class="desc">识别准确率高</div>
            </div>
            <div class="nav">
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">通用文本识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">手写文字识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">通用表格识别</div>
              </div>
            </div>
            <div
              class="product-layer"
              data-id="1"
              style="
                background-image: url('https://static.intsig.net/dps/img/ai/index/bg-basic.png');
              "
            >
              <div class="inner">
                <div class="col">
                  <a href="/api/vision/text_recog_ch_en_coordinate" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Universal-Text-Recognition.png"
                      alt=""
                    /><span class="name">通用文本识别(中英)</span></a
                  >
                  <a href="/api/vision/text_recognize_3d1" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Universal-Text-Recognition.png"
                      alt=""
                    /><span class="name">通用文本识别(多语言)</span></a
                  >
                  <a href="/api/demo/table" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Universal-Form-Recognition.png"
                      alt=""
                    /><span class="name">通用表格识别</span></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="product" data-id="1">
            <div class="top">
              <div class="icon">
                <img
                  src="https://static.intsig.net/dps/img/ai/index/icon-card.png"
                  alt=""
                />
              </div>
              <div class="name">证件OCR</div>
              <div class="desc">支持百种以上国内外证件识别</div>
            </div>
            <div class="nav">
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">银行卡识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">身份证识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">护照识别</div>
              </div>
            </div>
            <div
              class="product-layer"
              data-id="1"
              style="
                background-image: url('https://static.intsig.net/dps/img/ai/index/bg-card.png');
              "
            >
              <div class="inner">
                <div class="col">
                  <a href="/api/vision/id_card" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/ID-Card.png"
                      alt=""
                    /><span class="name">身份证</span></a
                  >
                  <a href="/api/vision/social_security_cards" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Social-Security-Card.png"
                      alt=""
                    /><span class="name">社保卡</span></a
                  >
                  <a href="/api/vision/family_register" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Account-Card.png"
                      alt=""
                    /><span class="name">户口本</span></a
                  >
                  <a href="/api/vision/passport" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Passport.png"
                      alt=""
                    /><span class="name">护照</span></a
                  >
                </div>
                <div class="col">
                  <a href="/api/vision/business_card" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Business-Card.png"
                      alt=""
                    /><span class="name">名片</span></a
                  >
                  <a href="/api/vision/bank_card" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Bank-Card.png"
                      alt=""
                    /><span class="name">银行卡</span></a
                  >
                  <a href="/api/vision/marriage_certificate" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Marriage-Certificate.png"
                      alt=""
                    /><span class="name">结婚证</span></a
                  >
                  <a href="/api/vision/property_certificate" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Deed.png"
                      alt=""
                    /><span class="name">房产证</span></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="product">
            <div class="top">
              <div class="icon">
                <img
                  src="https://static.intsig.net/dps/img/ai/index/icon-vehicle.png"
                  alt=""
                />
              </div>
              <div class="name">车辆OCR</div>
              <div class="desc">卡证、票据一站式识别服务</div>
            </div>
            <div class="nav">
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">驾驶证识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">行驶证识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">车辆合格证识别</div>
              </div>
            </div>
            <div
              class="product-layer"
              data-id="1"
              style="
                background-image: url('https://static.intsig.net/dps/img/ai/index/bg-vehicle.png');
              "
            >
              <div class="inner">
                <div class="col">
                  <a href="/api/vision/vehicle_license" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Driving-License.png"
                      alt=""
                    /><span class="name">行驶证</span></a
                  >
                  <a href="/api/vision/drive_license" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Driver_License.png"
                      alt=""
                    /><span class="name">驾驶证</span></a
                  >
                  <a href="/api/vision/vehicle_certificate" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Vehicle-Certificate.png"
                      alt=""
                    /><span class="name">车辆合格证</span></a
                  >
                  <a href="/api/vision/vehicle_registration" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Vehicle-Registration-Certificate.png"
                      alt=""
                    /><span class="name">车辆登记证</span></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="col-sm-4">
          <div class="product">
            <div class="top">
              <div class="icon">
                <img
                  src="https://static.intsig.net/dps/img/ai/index/icon-bill.png"
                  alt=""
                />
              </div>
              <div class="name">财报、票据OCR</div>
              <div class="desc">全字段结构化识别</div>
            </div>
            <div class="nav">
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">增值税发票识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">电子承兑汇票识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">火车票识别</div>
              </div>
            </div>
            <div
              class="product-layer"
              data-id="1"
              style="
                background-image: url('https://static.intsig.net/dps/img/ai/index/bg-bill.png');
              "
            >
              <div class="inner">
                <div class="col">
                  <a href="/api/vision/vat_invoice" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/VAT-invoice.png"
                      alt=""
                    /><span class="name">增值税发票</span></a
                  >
                  <a href="/api/vision/vat_roll_invoice" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/VAT-ticket.png"
                      alt=""
                    /><span class="name">增值税卷票</span></a
                  >
                  <a href="/api/vision/taxi_ticket" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Taxi-ticket.png"
                      alt=""
                    /><span class="name">出租车发票</span></a
                  >
                  <a href="/api/vision/train_ticket" class="item"
                    ><img
                      src="https://static.intsig.net/dps/img/ai/index/Railway-ticket.png"
                      alt=""
                    /><span class="name">火车票</span></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="product">
            <div class="top">
              <div class="icon">
                <img
                  src="https://static.intsig.net/dps/img/ai/index/icon-processing.png"
                  alt=""
                />
              </div>
              <div class="name">图像处理</div>
              <div class="desc">复杂场景，轻松识别</div>
            </div>
            <div class="nav">
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">图像切边</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">图像增强</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">透视变换</div>
              </div>
            </div>
            <div
              class="product-layer"
              data-id="1"
              style="
                background-image: url('https://static.intsig.net/dps/img/ai/index/bg-image-processing.png');
              "
            >
              <div class="inner">
                <div class="col">
                  <div class="item no-link">
                    <img
                      src="https://static.intsig.net/dps/img/ai/index/Trimming.png"
                      alt=""
                    /><span class="name">切边</span>
                  </div>
                  <div class="item no-link">
                    <img
                      src="https://static.intsig.net/dps/img/ai/index/Strengthen.png"
                      alt=""
                    /><span class="name">增强</span>
                  </div>
                  <div class="item no-link">
                    <img
                      src="https://static.intsig.net/dps/img/ai/index/Sharpen.png"
                      alt=""
                    /><span class="name">锐化</span>
                  </div>
                  <div class="item no-link">
                    <img
                      src="https://static.intsig.net/dps/img/ai/index/Perspective-deformation.png"
                      alt=""
                    /><span class="name">透视变换</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="product">
            <div class="top">
              <div class="icon">
                <img
                  src="https://static.intsig.net/dps/img/ai/index/icon-commission.png"
                  alt=""
                />
              </div>
              <div class="name">更多定制</div>
              <div class="desc">自由创建模板，满足更多业务需求</div>
            </div>
            <div class="nav">
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">通用文本识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">手写文字识别</div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="" alt="" />
                </div>
                <div class="name">通用表格识别</div>
              </div>
            </div>
            <div
              class="product-layer"
              id="commission-product-layer"
              data-id="1"
              style="
                background-image: url('https://static.intsig.net/dps/img/ai/index/bg-more-commission.png');
              "
            >
              <div class="text">
                基于专业可靠的图像处理和文字识别技术，客户根据需求可自由配置识别能力的OCR机器人，实现特定版式图片的结构化识别
              </div>
              <a class="consult go-shangqiao-chat" @click="shangqiaoChat">
                在线咨询
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { test } from "~/api/test"; // 业务js
export default {
  name: 'Index',
  // async asyncData(app) {
  //   let url = 'http://10.10.31.60:8088/service/cust/seo/p_getSeoData'
  //   let param = {
  //     "title": "nuxt-h5测试",
  //     "keyword": "description nuxt-h5测试 首页",
  //     "descriptions": "ome page description nuxt-h5测试 首页 seo"
  //   }
  //   // try {
  //   //   let res = await app.$axios.post(url, param);
  //   //   const { data, code } = res.data;
  //   //   if (code == 0) {
  //   //     return { header: data.data };
  //   //   }
  //   // } catch(e) {
  //   //   console.log('asyncData错误', e)
  //   // }
  //
  //
  // },
  // head() {
  //   console.log('this.header', this.header)
  //   return {
  //     title: this.header.title,
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: this.header.descriptions
  //       }, {
  //         hid: 'keywords',
  //         name: 'keywords',
  //         content: this.header.keyword
  //       }
  //     ]
  //   }
  // },async asyncData(app) {
  //   let url = 'http://10.10.31.60:8088/service/cust/seo/p_getSeoData'
  //   let param = {
  //     "title": "nuxt-h5测试",
  //     "keyword": "description nuxt-h5测试 首页",
  //     "descriptions": "ome page description nuxt-h5测试 首页 seo"
  //   }
  //   // try {
  //   //   let res = await app.$axios.post(url, param);
  //   //   const { data, code } = res.data;
  //   //   if (code == 0) {
  //   //     return { header: data.data };
  //   //   }
  //   // } catch(e) {
  //   //   console.log('asyncData错误', e)
  //   // }
  //
  //
  // },
  // head() {
  //   console.log('this.header', this.header)
  //   return {
  //     title: this.header.title,
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: this.header.descriptions
  //       }, {
  //         hid: 'keywords',
  //         name: 'keywords',
  //         content: this.header.keyword
  //       }
  //     ]
  //   }
  // },
  data() {
    return {
      header: {},
    }
  },
  mounted() {
    // var div = document.createElement('div');
    // div.innerHTML = '1';
    // $('.nav')[0].appendChild(div)
  },
  created() {
    // this.testEvent();
    this.testdl()
    // 初始化轮播
  },
  methods: {
    testdl() {
      console.log('head', this.header)
    },
    testEvent() {
      console.log('testEvent')
      // let param = {
      //   "title": "众业达商城 找回密码",
      //   "keyword": "description 众业达商城 找回密码",
      //   "descriptions": "ome page description 众业达商城 找回密码 seo"
      // }
      // let url = 'http://10.88.20.14:50913/api/service/cust/seo/p_getSeoData'
      // try {
      //   let res = await this.$axios.post(url, param);
      //   const { data, code } = res.data;
      //   if (code == 0) {
      //     console.log('test dom', data)
      //     $(".alert").alert()
      //   }
      // } catch(e) {
      //   console.log('asyncData错误', e)
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
// 导航栏背景色重置
.navbar-inverse .navbar-collapse,
.navbar-inverse .navbar-form {
  border-color: rgba(0, 7, 88, 1);
}
.navbar-inverse {
  background-color: rgba(0, 7, 88, 0.8);
  border-color: rgba(0, 7, 88, 1);
}
.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:focus,
.navbar-inverse .navbar-nav > .open > a:hover {
  color: #fff;
  background-color: rgba(0, 7, 88, 0);
}
.navbar-inverse .navbar-nav,
.navbar-inverse .navbar-brand,
.navbar-inverse .navbar-nav > li > a {
  color: #fff;
}
.navbar-inverse .navbar-toggle:focus,
.navbar-inverse .navbar-toggle:hover {
  background-color: rgba(0, 7, 88, 0.6);
}
.navbar-fixed-bottom .navbar-collapse,
.navbar-fixed-top .navbar-collapse {
  max-height: none;
}

a:focus,
a:hover {
  color: #fff;
  text-decoration: underline;
}
.nav > li > a {
  margin-left: 1rem;
}

// 导航栏大窗口的排序方式
@media (min-width: 768px) {
  .navbar-nav {
    display: flex;
    flex-direction: row;
    list-style: none;
  }
  .dropdown-menu {
    min-width: 100vw !important;
    left: -16.25rem !important;
  }
}
// 导航栏小窗口的样式
@media (max-width: 768px) {
  .navbar-inverse .navbar-toggle {
    border-color: rgba(0, 7, 88, 1);
  }
}

// AI产品下拉框样式
.top-tooltip {
  background: rgba(0, 7, 88, 0.8);
  a {
    color: rgba(255, 255, 255, 0.7);
    display: inline-block;
    margin-right: 1.1rem;
    font-size: 0.9rem;
  }
  .dropdown-menu {
    overflow: auto;
    height: 20rem;
    // min-width: 44rem;
    // left: -14rem;
  }
  .dropdown-item:hover {
    color: inherit;
    background: inherit;
  }
  .dropdown-item {
    white-space: initial;
    overflow: auto;
  }
  .dropdown-item .dropdown-inner {
    .product-title {
      font-size: 1rem;
      color: #ffffff;
      letter-spacing: 0;
      margin: 0.5rem;
    }
    .product-list {
      margin: 0.7rem;
      line-height: 2.2rem;
    }
  }
}

.item img {
  width: 100%;
}

.slideBox {
  overflow: hidden;
  position: relative;
}
.slideBox .bd,
.slideBox .bd ul,
.slideBox .bd ul li {
  height: 800px;
  width: 100% !important;
}
.slideBox ul,
.slideBox li {
  padding: 0;
  margin: 0;
}
.slideBox .bd ul {
  background-image: linear-gradient(#0019ac, #000374);
}
.slideBox .bd ul li {
  display: flex;
  align-items: center;
  background-position: center -60px;
}
.slideBox .hd {
  bottom: 40px;
  height: 30px;
  left: 0;
  line-height: 30px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 1;
}
.slideBox .hd ul {
  overflow: hidden;
  zoom: 1;
  width: 100% !important;
}
.slideBox .hd ul li {
  border-radius: 1px;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: inline-block;
  height: 4px;
  width: 60px;
  line-height: 9999px;
  margin: 4px;
  overflow: hidden;
}
.slideBox .hd ul li.on {
  background: rgba(255, 255, 255, 0.9);
}
.slideBox .bd {
  position: relative;
  height: 100%;
  z-index: 0;
}
.slideBox .bd li {
  background-position: center;
  background-repeat: no-repeat;
  zoom: 1;
  vertical-align: middle;
}
.slideBox .bd img {
  height: 100%;
  display: block;
}
#header {
  height: 0 !important;
}
#header .header-bottom {
  background: transparent;
}
#header .header-top {
  background: transparent;
}
#header .hover .header-bottom,
#header .scrolled .header-bottom {
  background-color: #02102a;
}
#header .hover .header-top,
#header .scrolled .header-top {
  background-color: #02102a;
}
.section > .title,
.section-title {
  font-size: 36px;
  padding: 20px 0 50px 0;
  margin-bottom: 20px;
  color: #000000;
  letter-spacing: 1px;
  font-weight: 500;
}
.section-product {
  text-align: center;
  background-color: #f7f8fc;
  padding: 90px 0;
}
.section-product .item {
}
.product {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 2px 4px 18px 0 rgba(0, 13, 113, 0.12);
  padding: 50px 20px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}
.product .top .name {
  font-size: 20px;
  font-weight: bold;
  padding: 5px 0;
}
.product .top .desc {
  color: #000000;
  opacity: 0.3;
  font-size: 16px;
}
.product .nav {
  display: none;
}
.product .nav .item {
  flex: 1;
  color: #898989;
}
.product .nav .item .name {
  font-size: 12px;
}
.product .top .icon {
  height: 60px;
  margin-bottom: 22px;
}
.product .top .icon img {
  width: 60px;
}
.product-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 500px;
  transition: 0.3s;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px;
}
.product-layer.visible {
  top: 0;
  left: 0;
}
.product-layer .inner {
  display: flex;
}
.product-layer .inner .col {
  flex: 1;
}
.product-layer .inner .col .item {
  display: block;
  text-align: left;
  padding: 17px 0 15px 15px;
  color: #ffffff;
  cursor: pointer;
  border-left: 3px solid transparent;
  font-size: 15px;
}
.product-layer .inner .col .item.no-link {
  cursor: default;
}
.product-layer .inner .col .item:hover {
  border-left: 3px solid #ffffff;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.product-layer .inner .col .item img {
  height: 26px;
  margin-right: 10px;
  position: relative;
  top: -2px;
}
#commission-product-layer {
  color: #ffffff;
  display: flex;
  padding: 0 40px;
  flex-direction: column;
  justify-content: center;
}
#commission-product-layer .text {
  color: #ffffff;
  margin-bottom: 20px;
  text-align: left;
  border-radius: 8px;
  font-size: 15px;
}
#commission-product-layer .consult {
  padding: 10px 0;
  background: #ffffff;
  border-radius: 8px;
  color: #0091ff;
  letter-spacing: 0;
  font-size: 16px;
}
.section-solution {
  background-color: #000000;
  padding: 90px 0;
  text-align: center;
  color: #ffffff;
}
.section-solution .container {
  width: 1400px !important;
}
@media (max-width: 1400px) {
  .section-solution .container {
    width: 1200px !important;
  }
}
.section-solution > .title {
  color: #ffffff;
}
.section-solution .name {
  padding: 20px 0;
  font-size: 17px;
}
.section-solution .slide {
  width: 100%;
  display: flex;
  position: relative;
}
.section-solution .slide .main {
  width: 100%;
  overflow: hidden;
}
.section-solution .slide .main .inner {
  width: calc(351px * 9);
  transition: 0.8s;
}
.section-solution .slide .left,
.section-solution .slide .right {
  cursor: pointer;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.15);
  width: 40px;
  border-right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 1;
}
.section-solution .slide .left {
  left: 0;
}
.section-solution .slide .right {
  right: 0;
}
.section-solution .slide .item {
  width: 350px;
  height: 530px;
  background-color: #1b1b1b;
  float: left;
  border-right: 1px solid #000000;
  flex-direction: column;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.section-solution .slide .item:last-child {
  border-right: 0;
}
.section-solution .slide .item img {
  width: 70px;
}
.section-solution .slide .item .solution-layer {
  transition: 0.3s;
  background-color: rgba(0, 0, 0, 0.7);
}
.section-solution .slide .item .solution-layer-1 {
  position: absolute;
  top: -530px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.section-solution .slide .item .solution-layer-1.visible {
  top: 0;
}
.section-solution .slide .item .solution-layer-2 {
  position: absolute;
  top: 530px;
  left: 0;
  width: 100%;
  height: 100%;
  color: #ffffff;
  padding: 0 40px;
}
.section-solution .slide .item .solution-layer-2.visible {
  top: 0;
}
.section-solution .slide .item .solution-layer-2 .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: rgb(0, 8, 85);
}
.section-solution .slide .item .solution-layer-2 .text {
  position: relative;
  z-index: 1;
  margin-top: 180px;
  margin-bottom: 40px;
  text-align: left;
  min-height: 80px;
  font-size: 16px;
  line-height: 1.6;
}
.section-solution .slide .item .solution-layer-2 .detail {
  border: 2px solid #007aff;
  color: #ffffff;
  border-radius: 8px;
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 8px 0;
  display: block;
  font-size: 18px;
}
.section-customer {
  padding: 80px 0 100px 0;
}
.section-customer .title {
  padding-bottom: 20px;
}
.main-customer .list span {
  vertical-align: middle;
  text-align: center;
  float: left;
  height: 114px;
  border: 1px solid #f8f8f8;
  line-height: 114px;
  display: inline-block;
  background-repeat: no-repeat;
}
.main-customer .list span.index_kehu_01 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -13px;
}
.main-customer .list span.index_kehu_02 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -127px;
}
.main-customer .list span.index_kehu_03 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -241px;
}
.main-customer .list span.index_kehu_04 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -355px;
}
.main-customer .list span.index_kehu_05 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -469px;
}
.main-customer .list span.index_kehu_06 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -583px;
}
.main-customer .list span.index_kehu_07 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -697px;
}
.main-customer .list span.index_kehu_08 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -811px;
}
.main-customer .list span.index_kehu_09 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -925px;
}
.main-customer .list span.index_kehu_10 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1039px;
}
.main-customer .list span.index_kehu_11 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1153px;
}
.main-customer .list span.index_kehu_12 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1267px;
}
.main-customer .list span.index_kehu_13 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1381px;
}
.main-customer .list span.index_kehu_14 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1495px;
}
.main-customer .list span.index_kehu_15 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1609px;
}
.main-customer .list span.index_kehu_16 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1723px;
}
.main-customer .list span.index_kehu_17 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1837px;
}
.main-customer .list span.index_kehu_18 {
  background-image: url(/dps/img/intcloud/site/index_kehu_20210409.png);
  background-position: center -1951px;
}
</style>
