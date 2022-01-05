<template>
        <div class="perspective">
                <div class="card">
                        <div class="simple-txt-box">
                                <div class="simple-txt-top">{{simpleTxt.title1}}</div>
                                <div class="simple-txt-bottom">{{simpleTxt.num1}}</div>
                        </div>
                        <div class="simple-txt-box2">
                                <div class="simple-txt-top2">{{simpleTxt.title2}}</div>
                                <div class="simple-txt-bottom2">{{simpleTxt.num2}}</div>
                        </div>
                </div>
        </div>
</template>
<script>
export default {
        name: 'simpleTxt',
        data() {
                return {
                        simpleTxt: {
                                title1: '标题1',
                                num1: '12,332.00',
                                title2: '标题2',
                                num2: '234,999.23'
                        }
                }
        },
}
</script>
<style lang="scss" scoped>
@charset "utf-8";
.perspective {
        perspective: 800px;
}
.card {
        width: 212px;
        height: 88px;
        transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        transform-style: preserve-3d;
        // animation: mymove 20s infinite cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
        animation-name: mymove;
        animation-duration: 20s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        animation-delay: 0s;
}
@keyframes mymove {
        0% { transform: rotateY(0deg); } 
        41% { transform: rotateY(0deg); } 
        50% { transform: rotateY(180deg);}
        90% { transform: rotateY(180deg); }
        99% { transform: rotateY(0deg); }
        100% {}
}
.simple-txt-box {
        z-index: 5;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
}
.simple-txt-box2 {
    transform: rotateY(180deg)    
}

.simple-txt-box, .simple-txt-box2 {
        background-color: #091223;
        box-shadow: inset 0px 0px 59px 0px rgba(14, 62, 184, 0.2);
        border-radius: 9px;
        width: 206px;
        height: 81px;
        margin: 3px;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
}
.simple-txt-top, .simple-txt-top2 {
	font-size: 30px;
	font-weight: bold;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #00e4ff;
        word-break: break-all;
        width: 100%;
        text-align: center;
}
.simple-txt-bottom, .simple-txt-bottom2 {
        width: 123px;
        height: 19px;
        background-image: linear-gradient(90deg, #006ae1 0%, #16b7ff 100%), linear-gradient( #4895fc, #4895fc);
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #ffffff;
        margin-top: 8px;
        text-align: center;
        line-height: 19px;
        border-radius: 4px;
}


</style>