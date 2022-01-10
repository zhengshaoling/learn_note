<template>
        <div class="bar-pie">
                <div class="title-box">{{titleData[num]}}</div>
                <div class="legend-box">
                        <div class="legend-item">
                                <div class="color" :style="{'background': color[0]}"></div>
                                <div class="txt white">{{legend[num][0]}}</div>
                        </div>
                        <div class="legend-item">
                                <div class="color" :style="{'background': color[1]}"></div>
                                <div class="txt white">{{legend[num][1]}}</div>
                        </div>
                        <div class="legend-item">
                                <div class="color" :style="{'background': color[2]}"></div>
                                <div class="txt white">{{legend[num][2]}}</div>
                        </div>
                </div>
                <div id="lineChart" ref="lineChart" class="line-chart"></div>
        </div>
</template>
<script>
import { vardata } from '@/components/wms/barPieConfig.js'
import * as echarts from 'echarts'

export default {
        name: 'barPie',
        props: {
                myProperty: {
                        type: Object,
                        default() {
                                return {
                                        name: '',
                                        caption: '',
                                        left: '0',
                                        top: '0',
                                        width: '200',
                                        height: '200',
                                        droppable: '',
                                        timer: 3000,
                                        timelinecolor: '#19A6FF',
                                        timeleft: '5%',
                                        timeright: '5%',
                                        timebottom: '0%',
                                        timesymbol: 'circle',
                                        controlcolor: '#01d8ff', // 按钮颜色
                                        controlborder: '#01d8ff',
                                        controlemphasis: '#01d8ff',
                                        checksymbol: 'circle',
                                        checkcolor: '#01d8ff',
                                        checkborder: '#01d8ff',
                                        checkborderwidth: '8',
                                        checksymbolsize: '10',
                                        itemcolor: '#004b85',
                                        itemborder: '#01d8ff',
                                        gridtop: '80',
                                        gridleft: '70',
                                        gridwidth: '50%',
                                        gridlinecolor: ["#19a6ff","#19a6ff"],
                                        gridlabelcolor: ["#fff","#fff"],
                                        gridlabelsize: [16,16],
                                        gridnamecolor:'#fff',
                                        gridnamesize: 14,
                                        seriesbarcolor: ["#d7d631","#07c86a","#01d8ff"],
                                        seriesbarwidth: 11,
                                        seriespiecolor: [["#ffe600","#007ad6"],["#07c86a","#007ad6"],["#01d8ff","#007ad6"]],
                                        seriespieline: 35,
                                        serieslinecolor: '#ffe600',
                                        serieslinetype: 'solid',
                                        timelabelcolor: '#fff',
                                        seriespieradius: ["30%","35%"],
                                        seriepielabel: '#fff',
                                        seriepielabelfont: 14,
                                        yname: 'y轴单位'
                                }
                        }
                }
        },
        data() {
                return {
                        legend: [["A1","A2","A3"],["B1","B2","B3"],["C1","C2","C3"]],
                        num: 0,
                        color: ["#005cab","#08d5f9","#dfd827"],
                        titleData: ["A分类","B分类","C分类"],
                        vardata: {},
                        option: {},
                        myChart: null,
                        interval: null
                }
        },
        mounted() {
                this.myChart = echarts.init(document.getElementById('lineChart'));

                this.vardata = vardata;
                this.initOption();
        },
        methods: {
                initOption() {
                        let time = this.vardata.time,
                                xaxis = this.vardata.xaxis,
                                interval = this.myProperty["timer"];
                        let play = true;
                        if (interval == "-1") {
                                play = false;
                        }
                        let checkStyle = {
                                symbol: this.myProperty["checksymbol"],
                                color: this.myProperty["checkcolor"],
                                borderColor: this.hexToRgba(this.myProperty["checkborder"], 0.3),
                                borderWidth: this.myProperty["checkborderwidth"],
                                symbolSize: this.myProperty["checksymbolsize"],
                        };
                        this.option = {
                             baseOption: {
                                        timeline: {
                                                axisType: 'category', 
                                                autoPlay: play, 
                                                label: { 
                                                        color: this.myProperty["timelabelcolor"] 
                                                }, 
                                                left: this.myProperty["timeleft"], 
                                                right: this.myProperty["timeright"],
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
                                                playInterval: interval, 
                                                symbol: this.myProperty["timesymbol"], 
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
                                        grid: { 
                                                top: this.myProperty["gridtop"], 
                                                left: this.myProperty["gridleft"], 
                                                width: this.myProperty["gridwidth"] 
                                        },
                                        xAxis: [{
                                                'type': 'category', 
                                                'axisLabel': { 
                                                        'interval': 0, 
                                                        color: this.myProperty["gridlabelcolor"][0], 
                                                        fontSize: this.myProperty["gridlabelsize"][0] 
                                                },
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
                                        options: this.formar(time, this.vardata)   
                        
                        };
                        this.setOption();
                },
                setOption() {
                        this.myChart.setOption(this.option);
                        this.interval = setInterval(()=>{
                                this.refreshLegend();
                        }, 3000)
                },
                refreshLegend() {
                        this.num = ++this.num > 2 ? 0: this.num;
                },
                hexToRgba(sHex, alpha) {
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
                                        stack: 'calculate'
                                },
                                item1 = {
                                        type: 'pie', 
                                        startAngle: 90, 
                                        clockwise: false, 
                                        center: ['85%', '25%'], 
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
                formar(time, vardata) {
                        let options = [];
                        let barDataAll = vardata.barData;
                        let pieDataAll = vardata.pieData;

                        let labelLine = { 
                                length2: this.myProperty["seriespieline"],
                                lineStyle: { 
                                        color: this.myProperty["serieslinecolor"],
                                        type: this.myProperty["serieslinetype"]
                                }
                        };
                        for (var i = 0; i < time.length; i++) {
                                var data = {
                                        xAxis: [{ 
                                                'type': 'category', 
                                                'axisLabel': { 'interval': 0 }, 
                                                data: barDataAll[0], 
                                                splitLine: { show: false } 
                                        }],
                                        series: [
                                                { data: [8, 4654, 5435] },
                                                { data: [434, 2, 435] },
                                                { data: [435, 43543543, 3] }, 
                                                {
                                                        data: [{
                                                                name: '', 
                                                                value: 95.5,
                                                                minAngle: 30,
                                                                avoidLabelOverlap: true,
                                                                itemStyle: {
                                                                        color: "#1c81ff"
                                                                },
                                                                labelLine: labelLine
                                                                }, {
                                                                name: '', value: 4.5, itemStyle: { color: '#08d5f9' }
                                                                }, {
                                                                name: '', value: 4.5, itemStyle: { color: '#dfd827' }
                                                        }]
                                                },
                                        ]
                                };
                                let seri_data = data["series"];
                                if(i<=2) {
                                        seri_data[0].data = barDataAll[i*3+1];
                                        seri_data[1].data = barDataAll[i*3+2];
                                        seri_data[2].data = barDataAll[i*3+3];
                                }
                                let temp = [Number(pieDataAll[i*3][0]),Number(pieDataAll[i*3+1][0]),Number(pieDataAll[i*3+2][0])]

                                seri_data[3].data[0].value = temp[0];
                                seri_data[3].data[1].value = temp[1];
                                seri_data[3].data[2].value = temp[2];
                                options.push(data);
                        }
                        return options;
                },
        },
        destroyed() {
                clearInterval(this.interval);
                this.interval = null;
        }
        
}
</script>
<style lang="scss" scoped>
.bar-pie {
        width: inherit;
        height: inherit;
}
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
        left: 30%;
        width: 50px;
        height: 35px;
}
.title-box::after {
        position: absolute;
        content: '';
        background: url(~/assets/img/components/title-right.png) no-repeat;
        top: 12px;
        right: 30%;
        width: 50px;
        height: 35px;
}
.legend-box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 2%;
        left: 50%;
        transform: translateX(-50%);
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
.line-chart {
        width: 100%;
        height: 75%;
}
</style>