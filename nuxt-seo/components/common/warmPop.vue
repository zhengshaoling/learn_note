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
            
            <z-button type="primary" plain @click="close" v-show="isCancle" class="cancle_warm_pop">取消</z-button>
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
<style lang = "scss" >
@import 'assets/style/component/warmPop.css';
</style >
