<!--
 * @Author: your name
 * @Date: 2021-08-09 16:51:23
 * @LastEditTime: 2021-09-14 17:38:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\pages\map.vue
-->
<template>
        <div id="Map">

        </div>
</template>
<script>
import * as echarts from 'echarts'
const mapJSon = require('~/assets/json/map.json')
const mapSereisData = require('~/assets/json/mapSeriesData.json');
export default {
        name: 'Map',
        data() {
                return {
                       myChart: null,
                       nowIndex: -1,
                       interval: null
                }
        },
        mounted() {
                this.initChart();
        },
        methods: {
                getLinearGradientColor(colors, defalultColor) {
                        if (typeof colors == "string") return colors;
                        if (Array.isArray(colors)) {
                                return {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0, color: '#28cccc' // 0% 处的颜色
                                }, {
                                        offset: 1, color: '#00428e' // 100% 处的颜色
                                }],
                                global: true
                                }
                        }
                        return defalultColor;
                },
                initChart() {
                        let that = this;
                        const geoJSON = {
                                'china': mapJSon
                        };

                        echarts.registerMap('china', { geoJSON: geoJSON['china'] });
                        this.myChart = echarts.init(document.getElementById('Map'));
                        let option = {
                                geo: { // 作为底图，设置地图外围边框
                                        map: 'china',
                                        itemStyle: {
                                                areaColor: 'rgba(255, 255, 255, 0.05)',
                                                borderColor: '#0195ba',
                                                borderWidth: 1,
                                        },
                                         emphasis: { // 鼠标悬停时样式
                                                label: {
                                                        color: '#fff'
                                                },
                                                focus: 'self', // 鼠标悬浮时 默认none， self会高亮自己，虚化其它的
                                                itemStyle: { // 高亮时的样式
                                                        areaColor: '#00c3d5',
                                                        borderType: 'solid',
                                                        borderColor: '#8bdbff',
                                                        shadowColor: 'rgba(255, 255, 255, 0.5)',
                                                        shadowBlur: 10
                                                }
                                        },
                                        select: { // 选中时样式
                                                label: {
                                                        color: '#fff'
                                                },
                                                itemStyle: {
                                                        areaColor: 'rgba(0, 60, 131, 0.7)',
                                                        borderType: 'solid',
                                                        borderColor: '#8bdbff',
                                                }
                                        }
                                },
                                series: [{
                                        type: 'scatter',
                                        coordinateSystem: 'geo',
                                        label: {
                                                normal: {
                                                        show: false,
                                                        color: '#fff'
                                                },
                                                emphasis: {
                                                        show: true,
                                                        color: '#fff',
                                                        fontSize: '12px'
                                                }
                                        },
                                        itemStyle: {
                                                areaColor: 'rgba(255,255,255,0.1)',
                                                borderColor: '#28cccc',
                                                borderType: [2, 4],
                                                borderDashOffset: 4
                                        },
                                        // 鼠标悬停时样式
                                        emphasis: { 
                                                label: {
                                                        color: '#fff'
                                                },
                                                focus: 'self',
                                                itemStyle: {
                                                        areaColor: '#00c3d5',
                                                        borderType: 'solid',
                                                        borderColor: '#8bdbff',
                                                }
                                        },
                                        // 选中时样式
                                        select: { 
                                                label: {
                                                        color: '#fff'
                                                },
                                                itemStyle: {
                                                        areaColor: 'rgba(0, 60, 131, 0.7)',
                                                        borderType: 'solid',
                                                        borderColor: '#8bdbff',
                                                }
                                        },
                                        data: that.convertScatterData(mapSereisData.list)
                                }],
                                // 设置视觉映射组件
                                visualMap: {
                                        type: "continuous", // 连续型，还有
                                        min: 0,
                                        max: 1200,
                                        circulable: true,
                                        inRange: {
                                                color: ['#50a3ba', '#eac736', '#d94e5d']
                                        },
                                        left: '10%',
                                        bottom: '10%',
                                        // 配置文字样式
                                        textStyle: {
                                                color: "#fff",
                                                fontSize: "12px",
                                        },
                                        formatter: function (value) {
                                                return '数量' + value; // 范围标签显示内容。
                                        },
                                        text: [1200,0], // 顶部底部的文字
                                        textGap: 15,
                                        dimension: 2, // 将value 索引值为2的映射到视觉元素上
                                        hoverLink: true, // 高亮地图元素

                                },
                                tooltip: this.getTooltip()  
                        }
                        this.myChart.setOption(option);
                        this.myChart.on('mousemove', function() {
                                if(that.interval) {
                                        clearInterval(that.interval);
                                        that.interval = null;
                                }
                        })
                        this.myChart.on('mouseout', function(param) {
                                if(param.event) {
                                        that.interval = setInterval(()=>{
                                                that.autoLoopTooTip();
                                        }, 5000)
                                }
                        })
                        this.interval = setInterval(()=>{
                                this.autoLoopTooTip();
                        }, 5000)
                },
                convertScatterData(data) {
                        let res = [];
                        for(let i = 0; i < data.length; i++) {
                                let geoCoord = mapSereisData.geo[data[i].name];
                                if(geoCoord) {
                                        res.push({
                                                name: data[i].name,
                                                value: geoCoord.concat(data[i].value)
                                        });
                                }
                        }
                        return res;
                },
                autoLoopTooTip() {
                        let that = this;
                        if (!this.myChart) return;
                        var value = mapSereisData["list"];
                        this.myChart.dispatchAction({
                                type: 'mapUnSelect',
                                seriesIndex: 0,
                                dataIndex: this.nowIndex,
                        });
                        this.myChart.dispatchAction({
                                type: 'hideTip'
                        })
                        this.nowIndex = (++this.nowIndex) % value.length;
                        this.myChart.dispatchAction({
                                type: 'mapSelect',
                                seriesIndex: 0,
                                dataIndex: this.nowIndex,
                        });
                        // 显示 tooltip
                        this.myChart.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 0,
                                dataIndex: this.nowIndex
                        });
                
                },
                getTooltip() {
                      return {
                                show: true,
                                formatter: function (params) {
                                        // if (params.value != params.value) return "";
                                        let f = '<div style="line-height: 30px; width: 110px; font-weight: bold; margin: 10px 0 10px 20px;"><div style="color: #fff; font-size: 24px; border-bottom: 1px solid #fff;">' +
                                                params.name + 
                                                '</div>' + 
                                                '<div style="color: #ffea00; font-size: 16px;">数量：' +
                                                params.value[2] +
                                                '</div></div>'
                                        return f;
                                },
                                position: 'right',
                                backgroundColor: 'rgba(255,255,255,0)',
                                extraCssText: 'width: 180px; height: 100px; background-image: url(/img/center/tooltip.png); background-size: cover; background-repeat: no-repeat; border: none;'
                        }  
                }
        }
}
</script>
<style lang="scss" scoped>
#Map {
        height: 100vh;
        width: 100vw;
        background: url('/img/center/bg.jpg') center center;
}
</style>
