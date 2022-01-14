<template>
        <div class="part-box" :style="{width: width, height: height }" :class="customClass">        
                <div :class="['top-title', title ? 'title-before' : '']">{{title}}</div>                        
                <div class="left-top"></div>
                <div class="right-top"></div>
                <div class="left-bottom"></div>
                <div class="right-bottom"></div>
                <slot name="main" />
        </div>
</template>
<script>
export default {
    name: "box",
    props: {
        title: {
            type: String,
            default() {
                    return ""
            }
        },
        showAngle: {
                type: Boolean,
                default: true
        },
        width: {
                type: String,
                default() {
                        return ''
                }
        },
        height: {
                type: String,
                default() {
                        return ''
                }
        },
        customClass: {
                type: String,
                default() {
                        return ''
                }
        }
    },
}
</script>
<style lang="scss" scoped>
 .part-box {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #091223;
        box-shadow: inset 0px 0px 59px 0px rgba(14, 62, 184, .2);
        border: solid 1px #123d72;
        min-width: 945px;
}
.left-top, .right-top, .left-bottom, .right-bottom {
        width: 11px;
	height: 11px;
	border: solid 3px #1d5acc;
        position: absolute;
}
.left-top {
        top: 0;
        left: 0;
        border-bottom: none;
        border-right: none;
}
.right-top {
        top: 0;
        right: 0;
        border-left: none;
        border-bottom: none;
}
.left-bottom {
        bottom: 0;
        left: 0;
        border-top: none;
        border-right: none;
}
.right-bottom {
        bottom: 0;
        right: 0;
        border-top: none;
        border-left: none;
}
.title-before {
        position: absolute;
        height: 35px;
        top: 0;
        width: 100%;
        background: linear-gradient(90deg, #08091b 0%, #091645 50%, #08091b 100%);
        line-height: 35px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #17caf0;
        text-align: center;
}
.title-before::after {
        position: absolute;
        content: '';
        background: url(~/assets/img/components/title-right.png) no-repeat;
        top: 12px;
        right: 103px;
        width: 50px;
        height: 35px;
}
.title-before::before {
        position: absolute;
        content: '';
        background: url(~/assets/img/components/title-left.png) no-repeat;
        top: 12px;
        left: 94px;
        width: 50px;
        height: 35px;
}
</style>
