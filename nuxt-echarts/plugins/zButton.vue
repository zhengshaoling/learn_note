<template>
  <button type="button"
          class="z-btn"
          :class="{'is-full':full}"
          :style="stylesOuter"
          @click="handleClick($event)"
          :disabled="disabled">
    <span class="z-btn-inner"
          :class="btnCls"
          :style="stylesInner">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "popupWindow",
  props: {
    link: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    // 默认按标准的字号，除了size为small的按钮，在ods有12px的字体，则设置fontSize为small
    fontSize: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: ''
    },
    color: {
      type: Number,
      default: null,
    },
    plain: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    special: {
      type: Boolean,
      default: false
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Number,
      default: 0
    },
    newTarget: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  },
  computed: {
    btnCls() {
      // type 类型 primary/important/warning/info/text
      // size 尺寸 small/默认不配置
      // plain 朴素按钮
      const btnCls = [
        this.type ? `z-btn-${this.type}` : ``,
        this.size ? `z-btn-${this.size}` : ``,
        this.color ? `color${this.color}` : ``,
        this.fontSize ? `font-size-${this.fontSize}` : ``,
        {
          'is-plain': this.plain
        },
        {
          'is-special': this.special
        },
        // {
        //   'is-full': this.full
        // },
        {
          'is-disabled': this.disabled
        },
        {
          'is-autoWidth': this.autoWidth
        }
      ]
      return btnCls;
    },
    stylesInner() {
      let oStyle = {}
      if (this.minWidth) {
        oStyle['minWidth'] = this.minWidth + 'px'
      }
      return Object.keys(oStyle).length ? oStyle : ''
    },
    stylesOuter() {
      let oStyle = {}
      if (this.margin) {
        oStyle['margin'] = this.margin
      }
      return Object.keys(oStyle).length ? oStyle : ''
    }
  },
  methods: {
    handleClick($event) {
      if (this.$listeners["click"]) {
        this.$emit("click", $event);
      } else if (this.link) {
        if (this.newTarget) {
          window.open(this.link);
        } else {
          window.location.href = this.link;
        }
      }
    }
  }
};

</script>
<style lang="scss">
  $color-main:#19b0b0;
  $color-main-bg:#28CCCC;
  $color-btn-disabled:rgba(40, 204, 204, .4);
  $color-main-rgba:rgba(25, 176, 176, .34);
  $color-red-main:rgb(233, 70, 55);
  $color-yellow:rgba(228, 139, 0, 1);
  $color-blue-s:rgba(40, 204, 204, 1);
  $color-blue-ss:rgba(74, 214, 214, 1);
  $color-bg-layer:rgba(85, 85, 85, .9);
  $color-txt:rgb(253, 153, 153);
  $color-txt-s:rgb(51, 51, 51);
  $color-txt-ss:rgb(102, 102, 102);
  $color-txt-sss:rgb(153, 153, 153);
  $color-background-main:rgb(240, 244, 245);
  $color-background-s:rgb(247, 251, 252);
  $color-row-line:rgb(204, 204, 204);
  $color-row-line-s:rgb(229, 229, 229);
  $color-col-line:rgb(229, 229, 229);
  $color-button-border:#e5e5e5;
  $color-button-txt:rgba(25, 176, 176, 1);
  $color-button-bg-s:rgba(117, 226, 226, 1);
  $color-button-bg-ss:rgba(47, 205, 205, 1);
  $color-button-main-border:rgba(25, 176, 176, .5);
  $color-button-main-txt:rgba(25, 176, 176, 1);
  $color-button-main-bg-left:rgba(115, 226, 226, 1);
  $color-button-main-bg-right:rgba(40, 204, 204, 1);
  $color-button-yellow-border:rgba(228, 139, 0, .5);
  $color-button-yellow-txt:rgba(228, 139, 0, 1);
  $color-button-yellow-txt-hover:rgba(192, 90, 0, 1);
  $color-button-yellow-bg-top:rgba(255, 220, 65, 1);
  $color-button-yellow-bg-bottom:rgba(255, 208, 0, 1);
  $color-button-red-border:rgba(244, 162, 155, .5);
  $color-button-red-txt:rgba(233, 70, 55, 1);
  $color-button-grey-border:rgba(204, 204, 204, .5);
  $color-button-grey-txt:rgba(102, 102, 102, 1);
  $color-lineargradient-top:rgba(115, 226, 226, 1);
  $color-lineargradient-bottom:rgba(40, 204, 204, 1);
  $color-lineargradient-red-top:#f2a09b;
  $color-lineargradient-red-bottom:#e94637;



  @mixin btn-linear-gradient {
    background-image: linear-gradient(-22deg, $color-lineargradient-bottom 0%, $color-lineargradient-top 100%);
  }

  @mixin btn-linear-gradient-yellow {
    background: linear-gradient(-40deg, #FFD000 0%, #FFDC41 100%);
  }

  @mixin btn-linear-gradient-yellow-form {
    background-image: linear-gradient(-90deg, #FFD200, #F7B924);
  }

  @mixin btn-linear-gradient-red {
    background: linear-gradient(-22deg, #E94637 0%, #F2A09B 100%);
  }

  .z-btn {
    position: relative;
    display: inline-block;
    width: auto;
    padding: 0;
    margin: 0;
    border: none;
    vertical-align: middle;
    outline: none;
    background: none;

    &.is-full {
      width: 100%;

      .z-btn-inner {
        width: 100%;
      }
    }

    .z-btn-inner {
      cursor: pointer;
      position: relative;
      display: inline-flex;
      min-width: 94px;
      height: 32px;
      padding: 0 12px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 4px;
      color: #666;
      font-size: 14px;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: ease .3s;
      vertical-align: middle;
      text-decoration: none;
      border: none;
      outline: none;
      white-space: nowrap;
      background: none;
      z-index: 0;

      .inner {
        position: relative;
        display: inline-flex;
        align-items: center;
        line-height: 1em;
        z-index: 1;
      }

      [class^='icon'] {
        position: relative;
        display: inline-block;
        margin-right: 4px;
        font-size: 16px;
        text-align: center;
      }

      &:before {
        position: absolute;
        content: '';
        border-radius: 100%;
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        z-index: 0;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        background-size: 100% 100%;
        transition: width .3s ease 0s, padding .3s ease 0s, transform .3s ease 0s, opacity .3s ease 0s;
        @include btn-linear-gradient;
        z-index: -1;

      }

      &:after {
        opacity: 1;
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: 1px solid $color-button-border;
        border-radius: 4px;
        box-sizing: border-box;
        transition: ease .3s;
        z-index: -2;
      }

      &:not(.is-disabled):not(.z-btn-info):hover {
        color: #fff;

        &:before {
          width: calc(100% + 10px);
          padding-top: calc(100% + 10px);
        }

        &:after {}

      }


      &.z-btn-big {
        height: 36px;
        padding: 0 24px;
      }


      &.z-btn-medium {
        height: 28px;
        line-height: 28px;
        padding: 0 18px;

        .iconfont {
          font-size: 14px;
        }
      }

      &.z-btn-small {
        min-width: auto;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;

        .iconfont {
          font-size: 12px;
        }
      }

      &.z-btn-primary {
        color: #fff;
        @include btn-linear-gradient;


        &:before {
          -webkit-box-shadow: inset 0 0 60px 0 hsla(0, 0%, 100%, .5);
          box-shadow: inset 0 0 60px 0 hsla(0, 0%, 100%, .5);
        }

        &:after {
          opacity: 0;
          border-color: $color-button-main-border;
        }

        &.is-plain {
          color: $color-button-txt;
        }
      }

      &.z-btn-important {
        color: #C05A00;
        @include btn-linear-gradient-yellow;

        &:before {
          background: none;
          -webkit-box-shadow: inset 0 0 60px 0 hsla(0, 0%, 100%, .5);
          box-shadow: inset 0 0 60px 0 hsla(0, 0%, 100%, .5);
        }

        &:after {
          opacity: 0;
          border-color: rgba(228, 139, 0, .5);
        }


        &:hover {
          color: #C05A00 !important;
        }

        &.is-plain {
          color: #E48B00;

          &:before {
            @include btn-linear-gradient-yellow;
          }
        }
      }

      &.z-btn-warning {
        color: #fff;
        @include btn-linear-gradient-red;

        &:before {
          background: none;
          -webkit-box-shadow: inset 0 0 60px 0 hsla(0, 0%, 100%, .5);
          box-shadow: inset 0 0 60px 0 hsla(0, 0%, 100%, .5);
        }

        &:after {
          opacity: 0;
          border-color: #E5E5E5;
        }


        &.is-plain {
          color: #666;

          &:before {
            @include btn-linear-gradient-red;
            box-shadow: none;
          }


          &:not(.is-disabled):hover {
            color: #fff;
          }




        }


      }

      &.z-btn-info {
        color: #999;

        &:before {
          display: none;
        }

        &:after {
          border-color: #e5e5e5;
        }

        &.is-plain {}
      }


      &.is-autoWidth {
        min-width: auto;
      }


      &.z-btn-text {
        color: #999;

        &.color2 {
          color: #666;
        }

        &.color3 {
          color: #333;
        }


        &:before {
          @include btn-linear-gradient;
        }

        &:after {
          opacity: 0;
        }

        &.font-size-small {
          font-size: 12px;
        }

        &.is-plain {
          color: #999;

          &.color2 {
            color: #666;
          }

          &.color3 {
            color: #333;
          }

          &.is-special {
            color: #19B0B0;
          }

          &:before {
            background: none;
          }

          &:after {
            opacity: 0;
          }


          &:not(.is-disabled):hover {
            color: #19B0B0;
          }
        }

        &:hover {
          // color: #fff;

          &:before {}

          &:after {
            opacity: 0;
          }

          &.is-special {
            text-decoration: underline;
          }

        }

      }

      &.is-plain {
        color: #999;
        background: none !important;

        &:before {
          box-shadow: none !important;
        }

        &:after {
          opacity: 1;
        }

        &:hover {
          &:after {
            opacity: 0;
          }

          &.is-disabled:not(.z-btn-text):after {
            opacity: 1;
          }

        }
      }


      &.is-disabled {
        cursor: not-allowed;
        opacity: .4;
      }

    }

    .el-loading-mask {
      margin: 0 !important;

      .el-loading-spinner {
        height: 100%;
        left: 0;
        top: 0;
        margin: 0;

        .circular {
          width: 100% !important;
          height: 100% !important;
          left: 0 !important;
          top: 0 !important;
          margin: 0 !important;
        }
      }
    }
}

</style>
