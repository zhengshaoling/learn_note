<template>
    <div class="pop" v-if="pop" v-cloak  @mousewheel.prevent>
    <div class="warm_mask" v-bind:style="{'z-index': zIndex }"></div>
    <div class="popMain" v-bind:style="{width: popWid + 'px','z-index': zIndex+1 }">
        <img :src="`${baseImgPath}center/close.png`" alt="" class="popClose" @click="close" v-show="closeImg">
        <div class="popTitlBox" v-bind:style="{marginTop: icon>0?27:53 + 'px' }">
            <img :src="`${baseImgPath}center/popImg.png`" alt="popWarn" class="popWarn" v-if="icon == 0">
            <img :src="`${baseImgPath}center/yes.png`" alt="popWarn" class="popWarn" v-if="icon == 1">
            <img :src="`${baseImgPath}center/msg.png`" alt="popWarn" class="popWarn" v-if="icon == 2">
            <p class="popTitl" :class="{xl_leftAlign:widthT>400?true:false}" id="xldemo1">{{title}}</p>
            <p class="xl_leftAlign popTitl">{{leftTitle}}</p>
        </div>
        <slot name="content"></slot>
        <div class="popBtn_warm_pop popBtn" v-cloak>
            <slot name="btn"></slot>

            <el-button type="primary" plain @click="close" v-show="isCancle" class="cancle_warm_pop">取消</el-button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "warmPop",
    props: {
        pop: {
            type: Boolean,
            default: false
        },
        isCancle: {
            type: Boolean,
            default: false
        },
        closeImg: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Number,
            default: -1
        },
        popWid: {
            type: Number
        },
        title:{
            type:String,
            default:'',
        },
        leftTitle:{
            type:String,
            default:''
        },
        zIndex:{
            type:Number,
            default:996
        }
    },
    data: function () {
        return { widthT:'',}
    },
    mounted: function () { },
    computed: {
    },
    watch:{
        pop(newVal){
            // debugger
            if(newVal){
                this.$nextTick(()=>{
                    this.widthT = document.getElementById("xldemo1").offsetWidth;
                    console.log('this.widthT: ' + this.widthT);
                })
                return
            }

            //xxxx
            this.widthT = 0;
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .warm_mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: red;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
  }

  .popMain {
    background-color: #ffffff;
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 51%;
    transform: translateX(-51%) translateY(-50%);
    padding-right: 58px;
    padding-left: 58px;
    padding-bottom: 50px;
    min-width: 310px;
  }

  .popClose {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 997;
    cursor: pointer;
  }

  .popTitlBox {
    width: 100%;
    text-align: center;
    margin-top: 29px;
  }

  .popWarn {
    width: 63px;
    height: 63px;
    margin-bottom: 12px;
  }

  .popTitl {
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    line-height: 27px;

    word-break: break-all;
    text-align: center;
  }
  .xl_leftAlign{
    max-width: 400px;
    text-align: left !important;
  }
  .popBtn_warm_pop {
    width: 100%;
    text-align: center;
    margin-top: 38px;
  }

  .popBtn_warm_pop button {
    margin: 0 6px;
  }

  .popBtn div:hover {
    background-image: linear-gradient(-22deg, #28cccc 0%, #73e2e2 100%);
    color: #fff;
    border: solid 1px #fff;
  }
  .popBtn div a:hover{
    color: #fff;
  }
  .xl_cancle_btn{
    border:1px solid rgba(229,229,229,1) !important;
    color:rgba(153,153,153,1) !important;
  }
  .xl_cancle_btn:hover{
    border:1px solid rgba(229,229,229,1) !important;
    color:rgba(153,153,153,1) !important;
    background-image: none !important;
    background-color: none !important;
  }
</style >
