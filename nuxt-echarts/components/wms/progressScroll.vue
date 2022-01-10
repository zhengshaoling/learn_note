<template>
        <div class="progress">
                <div class="caption"> 
                        <div class="caption-item">
                                <div class="color-box green-box"></div><span class="light">完成</span>
                        </div>
                        <div class="caption-item">
                                <div class="color-box blue-box"></div><span class="light">未完成</span>
                        </div>
                </div> 
                <div class="left-box">
                        <div v-for="i in 4" :key="i" class="row">
                                <div class="row-title light">
                                        收货
                                      <span class="title-span">100.00%</span>  
                                </div>
                                <div class="row-bar">
                                        <div class="row-inner-bar"></div>
                                </div>
                                <div class="row-num">100.00%</div>
                        </div>
                       
                </div>
                <div class="right-box">
                        <div class="swiper-box">
                                <div v-for="item in 8" :key="item" class="swiper-list">
                                        <div class="right-title">北京物流仓</div>
                                        <div v-for="i in 4" :key="i" class="row">
                                                <div class="row-title light">
                                                        收货
                                                        <span class="title-span">100.00%</span>  
                                                </div>
                                                <div class="row-bar">
                                                        <div class="row-inner-bar" style="width: "></div>
                                                </div>
                                                <div class="row-num">100.00%</div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
        
</template>
<script>
export default {
        name: 'progressScroll',
        data() {
              return {

              }  
        }
}
</script>
<style lang="scss" scoped>
.progress {
        overflow: hidden;
}
.left-box {
        width: 390px;
        position: relative;
        display: inline-block;
        top: -30px;
}

.caption {
        display: flex;
        align-items: baseline; 
        justify-content: flex-start; 
        margin-left: 30px;
}
.caption .caption-item {
        display: flex;
        align-items: center;
        width: 65px;
        font-size: 14px;
        margin: 5px;
        
}
.caption .caption-item .color-box{
        width: 16px;
        height: 10px;
        margin-right: 5px;
}
.caption .caption-item .green-box{
        background-color: #00d3f6;
}
.caption .caption-item .blue-box{
        background-color: #0070d0;
}
.row{
    width:100%;
    height:20px;
    margin-top: 10px;
}
.row-title{
    width: 28%;
    height: 20px;
    border: 0px solid black;
    float: left;
    text-align: right;
    font-size: 13px;
    white-space:nowrap;
    overflow:hidden;
    -o-text-overflow:ellipsis;
       text-overflow:ellipsis;

}
.title-span {
        margin-left: 5px;
        width: 60px;
        text-align: right;
        display: inline-block;
        color: rgb(0, 211, 246);
}
.row-bar{
    width: 50%;
    height: 15px;
    float: left;
    border: 1px solid #19568d;
    background: rgba(6,14,25,0.29);
    margin-top: 1px ;
    -webkit-border-radius: 5.555556rem;
       -moz-border-radius: 5.555556rem;
            border-radius: 5.555556rem;
    margin-left: 1%;

}			
.row-inner-bar{
    height: 11px;
    -webkit-border-radius: 5.555556rem;
       -moz-border-radius: 5.555556rem;
            border-radius: 5.555556rem;
    border: 1px solid;
    margin-top: 1px;
    background: rgb(0, 211, 246); 
    border-color: rgb(0, 211, 246); 
    width: 80%;
}			
.row-num{
        color: rgb(0, 131, 244); 
        font-size: 14px;
        width: 15%;
        height: 20px;
        float: left;
        border: 0px solid red;
        text-align: left;
        margin-left: 8px;
        white-space:nowrap;
        overflow:hidden;
        -o-text-overflow:ellipsis;
        text-overflow:ellipsis;
}
.right-box {
        position: relative;
        width: 430px;  
        overflow: hidden;
        display: inline-block;
        margin-left: 20px;
}
.swiper-box {
        position: relative;
        top: 0px;
        height: 170px;
        width: 3440px;
        transition: all 0.5s;
        animation: swiper 80s linear infinite;
        display: flex;
        align-items: center;
        flex-direction: row;
}
.right-title {
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 35px;
        color: #fff;
        background-color: rgba(2,25,80,70%);
        border-radius: 10px 10px 0 0;
}
.swiper-list {
        width: 430px;
        height: 170px;
        position: relative;
        background: #060f30;
        border-radius: 10px;
  
}
@keyframes swiper {
        0%  { transform: translate(0,0); } 
        12% { transform: translate(0,0); } 
        
        12.5% { transform: translate(-430px,0); }
        24% { transform: translate(-430px,0); }

        24.5% { transform: translate(-860px,0); }
        36% { transform: translate(-860px,0); }

        36.5% { transform: translate(-1290px,0); }
        48% { transform: translate(-1290px,0); }

        48.5% { transform: translate(-1720px,0); }
        60% { transform: translate(-1720px,0); }
        
        60.5% { transform: translate(-2150px,0); }
        72% { transform: translate(-2150px,0); }

        72.5% { transform: translate(-2580px,0); }
        86% { transform: translate(-2580px,0); }

        86.5% { transform: translate(-3010px,0); }  
        98% { transform: translate(-3010px,0); }

        98.5% { transform: translate(-3010px,0); }
        100% { transform: translate(0,0); }
}		
</style>