<!--
 * @Author: your name
 * @Date: 2021-08-09 16:51:23
 * @LastEditTime: 2021-09-13 17:01:44
 * @LastEditors: linglingling
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
// import mapJSon from '~/assets/json/map.json'
export default {
        name: 'Map',
        data() {
                return {
                       myChart: null,
                       nowIndex: -1,
                       myTime: null
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
                                colorStops: getColorStops(colors),
                                global: true
                                }
                        }
                        return defalultColor;
                },
                initChart() {
                        const geoJSON = {
                                '100000': mapJSon
                        };

                        echarts.registerMap('100000', { geoJSON: geoJSON['100000'] });
                        this.myChart = echarts.init(document.getElementById('Map'));
                        let option = {
                           geo: { // 作为底图，设置地图外围边框
                                map: '100000',
                                itemStyle: {
                                        areaColor: 'rgba(255,255,255,0)',
                                        borderColor: '#28cccc',
                                        borderWidth: 1,
                                }
                                },
                                series: [
                                {
                                        type: 'map',
                                        map: '100000',
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
                                        emphasis: { // 鼠标悬停时样式
                                                label: {
                                                        color: '#fff'
                                                },
                                                itemStyle: {
                                                        areaColor: '#00c3d5',
                                                        borderType: 'solid',
                                                        borderColor: '#8bdbff',
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
                                        },
                                        data: mapSereisData.list
                                }],
                                
                                tooltip: this.getTooltip()     
                        }
                        this.myChart.setOption(option);
                        setTimeout(()=>{
                                this.autoLoopTooTip();
                        }, 800)
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
                        setTimeout(function () {
                                that.autoLoopTooTip();
                        }, 2000);
                },
                getTooltip() {
                      return {
                                show: true,
                                formatter: function (params) {
                                        debugger;
                                        if (params.value != params.value) return "";
                                        let f = '<div style="line-height: 30px; width: 110px; font-weight: bold; margin: 10px 0 10px 20px;"><div style="color: #fff; font-size: 24px; border-bottom: 1px solid #fff;">' +
                                                params.name + 
                                                '</div>' + 
                                                '<div style="color: #ffea00; font-size: 16px;">数量：' +
                                                params.value +
                                                '</div></div>'
                                        return f;
                                },
                                position: 'right',
                                backgroundColor: 'rgba(255,255,255,0)',
                        
                                extraCssText: 'width: 180px; height: 100px; background-image: url(/img/center/tooltip.png); background-size: cover; background-repeat: no-repeat;'
                        }  
                }
        }
}
</script>
<style lang="scss" scoped>
#Map {
        height: 100vh;
        width: 100vw;
        background: #001d3dde;
}
</style>
