<template>
        <div class="bar-pie">
                <div class="legend-box">
                        <div class="legend-item">
                                <div class="color" style="background: '#08d5f9';"></div>
                                <div class="txt white">1项</div>
                        </div>
                        <div class="legend-item">
                                <div class="color" style="background: '#dfd827';"></div>
                                <div class="txt white">小于5项</div>
                        </div>
                        <div class="legend-item">
                                <div class="color" style="background: '#0d6eef';"></div>
                                <div class="txt white">大于5项</div>
                        </div>
                </div>
        </div>
</template>
<script>
export default {
        name: 'barPie',
        props: {
                myProperty: {
                        type: Object,
                        default() {
                                return {}
                        }
                }
        },
        data() {
                return {
                        legend: [["A1","A2","A3"],["B1","B2","B3"],["C1","C2","C3"]],
                        num: 1,
                        color: ["#005cab","#08d5f9","#dfd827"],
                        titleData: ["A分类","B分类","C分类"],
                        option: {

                        }
                }
        },
        mounted() {
                this.initOption();
        },
        methods: {
                initOption() {
                        let option,
                                time = JSON.parse(vardata.time),
                                xaxis = JSON.parse(vardata.xaxis),
                                interval = this.myProperty["timer"];
                        var play = true;
                        if (interval == "-1") {
                                play = false;
                        }
                        checkStyle = {
                                symbol: this.myProperty["checksymbol"],
                                color: this.myProperty["checkcolor"],
                                borderColor: this.hexToRgba(this.myProperty["checkborder"], 0.3),
                                borderWidth: this.myProperty["checkborderwidth"],
                                symbolSize: this.myProperty["checksymbolsize"],
                        };
                        option = {
                             baseOption: {
                                        timeline: {
                                                axisType: 'category', autoPlay: play, label: { color: this.myProperty["timelabelcolor"] }, left: this.myProperty["timeleft"], right: this.myProperty["timeright"],
                                                lineStyle: {
                                                        color: {
                                                                type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                                                                colorStops: [
                                                                        { offset: 0, color: this.hexToRgba(this.myProperty["timelinecolor"], 0.4) },
                                                                        { offset: 0.2, color: this.myProperty["timelinecolor"] },
                                                                        { offset: 0.8, color: this.myProperty["timelinecolor"] },
                                                                        { offset: 1, color: this.hexToRgba(this.myProperty["timelinecolor"], 0.4) }
                                                                ],
                                                                global: false // 缺省为 false
                                                        }
                                                },
                                                playInterval: interval, symbol: this.myProperty["timesymbol"], 
                                                controlStyle: {
                                                        showPlayBtn: false, 
                                                        color: this.myProperty["controlcolor"], 
                                                        borderColor: this.myProperty["controlborder"], 
                                                        emphasis: {
                                                                borderColor: this.myProperty["controlemphasis"],
                                                        }
                                                },
                                                checkpointStyle: checkStyle, 
                                                itemStyle: { 
                                                        normal: { 
                                                                color: this.myProperty["itemcolor"], 
                                                                borderColor: this.myProperty["itemborder"] 
                                                        }, 
                                                        emphasis: checkStyle 
                                                },
                                                data: this.titleData,
                                        }, 
                                        tooltip: { show: false }, 
                                        calculable: true,
                                        grid: { top: this.myProperty["gridTop"], bottom: this.myProperty["gridbottom"], width: this.myProperty["gridwidth"] },
                                        xAxis: [{
                                                'type': 'category', 
                                                'axisLabel': { 'interval': 0, color: this.myProperty["gridlabelcolor"][0], 
                                                fontSize: this.myProperty["gridlabelsize"][0] },
                                                axisTick: { show: false }, 
                                                axisLine: { 
                                                        lineStyle: { 
                                                                color: this.myProperty["gridlinecolor"][0] 
                                                                } 
                                                        },
                                                data: xaxis,
                                                splitLine: { show: false }
                                        }],
                                        yAxis: [{
                                                type: 'value', name: this.myProperty.yname, 
                                                nameTextStyle: { fontSize: this.myProperty["gridnamesize"], color: this.myProperty["gridnamecolor"] },
                                                axisLine: { lineStyle: { color: this.myProperty["gridlinecolor"][0] } }, axisTick: { show: false },
                                                'axisLabel': { color: this.myProperty["gridlabelcolor"][1], fontSize: this.myProperty["gridlabelsize"][1] }, splitLine: { show: false }
                                        }],
                                        series: this.transer()
                                        },
                                        options: this.formar(time, vardata)   
                        
                        }
                },
                hexToRgba() {
                        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
                        /* 16进制颜色转为RGB格式 */
                        let sColor = sHex.toLowerCase()
                        if (sColor && reg.test(sColor)) {
                                if (sColor.length === 4) {
                                var sColorNew = '#'
                                for (let i = 1; i < 4; i += 1) {
                                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                                }
                                sColor = sColorNew
                                }
                                //  处理六位的颜色值
                                let sColorChange = []
                                for (let i = 1; i < 7; i += 2) {
                                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
                                }
                                // return sColorChange.join(',')
                                // 或
                                return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
                        } else {
                                return sColor
                        }
                },
                transer() {
                        let series = [];
                        let colors = this.myProperty["seriesbarcolor"];

                        for (let i = 0; i < 6; i++) {
                                let item = {
                                        type: 'bar', 
                                        barWidth: this.myProperty["seriesbarwidth"], 
                                        itemStyle: { color: '#d7d631'},
                                        //     markPoint: {
                                        //         symbol: 'image://vfs/root/products/ebi/sys/coolrpt/coolresource/imgs/hnyj/makepoint.png',
                                        //         itemStyle: { color: 'rgba(0,0,0,0)' },
                                        //         symbolSize: [60, 25],
                                        //         symbolOffset: [0, -15],
                                        //         data: [{ type: 'max', name: lang_word[1] }]
                                        //     },
                                        stack: 'calculate'
                                },
                                item1 = {
                                        type: 'pie', 
                                        startAngle: 90, 
                                        clockwise: false, 
                                        center: ['85%', '20%'], 
                                        radius: this.myProperty["seriespieradius"],
                                        z: 100, label: { color: this.myProperty["seriepielabel"], fontSize: this.myProperty["seriepielabelfont"], formatter: '{b} {d}' + '%' }
                                };
                                if (i < 3) {
                                        item["itemStyle"]["color"] = colors[i];
                                        series.push(item);
                                } else {
                                        if (i == 4) {
                                                item1["radius"] = ['20%', '25%'];
                                        } else if (i == 5) {
                                                item1["radius"] = ['10%', '15%'];
                                        }
                                        series.push(item1);
                                }
                        }
                        return series;
                },
                formar() {

                }
        },
        
}
</script>
<style lang="scss" scoped>
.title-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        width: 100%;
        background: linear-gradient(90deg , #08091b 0%, #091645 50%, #08091b 100%);
        line-height: 35px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #17caf0;
        text-align: center;
        box-shadow: inset 0px 0px 59px 0px rgba(14,62,184,.2);
        position: relative;
}
.title-box::before {
        position: absolute;
        content: '';
        background: url(~/assets/img/components/title-left.png) no-repeat;
        top: 12px;
        left: 312px;
        width: 50px;
        height: 35px;
}
.title-box::after {
        position: absolute;
        content: '';
        background: url(~/assets/img/components/title-right.png) no-repeat;
        top: 12px;
        right: 312px;
        width: 50px;
        height: 35px;
}
.legend-box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 173px;
        left: 32%;
}
.legend-box .legend-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin: 0 5px;
}
.legend-box .legend-item .color {
        width: 15px;
        height: 8px;
        margin-right: 5px;
        border-radius: 2px;
}

</style>