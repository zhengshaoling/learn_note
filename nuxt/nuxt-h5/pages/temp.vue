<template>
<div id="temp">
    <!-- 导航栏 -->
    <div class="container">
      <div class="row top">
        <div class="col-md-4 col-lg-3 top-item">
          <span>LUOYOU 洛友UI </span>
          <span>AI开放平台</span>
        </div>
        <div class="col-md-6 col-lg-7 top-item" style="justify-content: center;">
      
          <div class="nav-list dropdown">
              <a class="dropdown-toggle item" data-toggle="dropdown" href="#">
                <span>AI产品</span>
              </a>
              <div class="top-tooltip dropdown-menu">
                <div class="header-dropdown">
                  <div class="dropdown-item visible" id="dropdown-product" data-height="200">
                    <div class="dropdown-inner">
                        <div class="product-title">通用类OCR</div>
                        <div class="product-list">
                            <a href="/api/vision/text_recog_ch_en_coordinate">通用文本识别(中英)</a>
                            <a href="/api/vision/text_recognize_3d1">通用文本识别(多语言)</a>
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
                            <a href="/api/vision/real_estate_certificate">不动产证</a>
                        </div>
                        <div class="product-title">车辆相关OCR</div>
                        <div class="product-list">
                            <a href="/api/vision/vehicle_license">行驶证</a>
                            <a href="/api/vision/drive_license">驾驶证</a>
                            <a href="/api/vision/vehicle_certificate">车辆合格证</a>
                            <a href="/api/vision/vehicle_registration">车辆登记证</a>
                        </div>
                        <div class="product-title">公司商铺类OCR</div>
                        <div class="product-list">
                            <a href="/api/vision/shop_ticket">商户小票</a>
                            <a href="/api/vision/tax_certificate">税务登记证</a>
                            <a href="/api/vision/opening_license">开户许可证</a>
                            <a href="/api/vision/business_license">营业执照</a>
                            <a href="/api/vision/organization_certificate">组织机构代码证</a>
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
                            <a href="/text-setting/rect-selection">框选配置机器人</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="nav-list">
            <a class="item" href="/doc/api/general_license_recog/v1.0"><span>技术文档</span></a>
          </div>
          
        </div>
        <div class="col-md-2 col-lg-2 top-item">
          <span>控制台</span>
          <span>登录</span>
        </div>
      </div>
    </div>
    
    <!-- banner部分 -->
    <div class="banner-box">
      <div id="myCarousel" class="carousel slide banner" data-ride="carousel" data-interval="5000">
        <!-- 轮播（Carousel）指标 -->
        <!-- <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1" class=""></li>
            <li data-target="#myCarousel" data-slide-to="2" class=""></li>
        </ol>    -->
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="/slide1.png" alt="First slide">
            </div>
            <div class="item">
                <img src="/slide2.png" alt="Second slide">
            </div>
            <div class="item">
                <img src="/slide3.png" alt="Third slide">
            </div>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <!-- 左右切换按钮 -->
        <a class="carousel-control-prev prev-slide" href="#myCarousel" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next next-slide" href="#myCarousel" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
     <div class="alert alert-success alert-dismissible fade show" role="alert">
    成功！异步请求跨域
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div>
    <div class="row">
      <div class="col-xs-2 col-md-2"><span class="glyphicon glyphicon-queen"></span></div>
      <div class="col-xs-2 col-md-2"><span class="glyphicon glyphicon-pencil"></span></div>
      <div class="col-xs-2 col-md-2"><span class="glyphicon glyphicon-music"></span></div>
      <div class="col-xs-2 col-md-2"><span class="glyphicon glyphicon-star"></span></div>
      <div class="col-xs-2 col-md-2"><span class="glyphicon glyphicon-user"></span></div>
    </div>
    <button type="button" class="btn btn-danger" @click='testEvent'>（危险）Danger</button>
    <a @click="testEvent">测试</a>
  </div>
</div>

</template>
<script>

export default {
    name: 'temp',
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        testEvent() {
            console.log('testEVent temp')
        }
    }
}
</script>
<style lang="scss" scoped>
html {
  font-size: 16px;
}
.nav-list {
  margin-left: 2rem;
}
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: -48rem;
    width: 96rem;
    background: rgba(0,7,88,0.8);
}
.dropdown-item {
  padding: 0.25rem 25rem;
}

.top-tooltip {
  background: rgba(0,7,88,0.8);
  a {
    color: rgba(255,255,255,.7);
    display: inline-block;
    margin-right: 20px;
    font-size: 15px;
  }
  .dropdown-item:hover {
    color: inherit;
    background: inherit;
  }
  .dropdown-item {
      line-height: 2.5rem;
  }
  .dropdown-item .dropdown-inner {
    // width: 96rem;
    margin: auto;
    // padding: 0.15rem;
    .product-title {
      font-size: 1rem;
      color: #ffffff;
      letter-spacing: 0;
    }
    .product-list {
      margin: 0.15rem;
    }
  }
}


.container {
  height: 100%;
  width: 100%;
  .top {
    height: 3.8rem;
    line-height: 3.8rem;
    background: #6d5eed;
    align-items: center;
    .top-item {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      // height: 3.8rem;
      // line-height: 3.8rem;
    }
  }
  
  
}
.banner-box {
  // height: 30rem;
  .banner {
    height: 34rem;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
