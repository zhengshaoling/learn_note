<!--
 * @Author: your name
 * @Date: 2021-08-09 16:51:23
 * @LastEditTime: 2021-09-23 17:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\pages\flyMap.vue
-->
<template>
        <div id="flyMap"></div>
</template>
<script>
import * as echarts from 'echarts'
const mapJSon = require('~/assets/json/map.json')
const mapSereisData = require('~/assets/json/mapSeriesData.json');
export default {
        name: 'FlyMap',
        data() {
                return {
                       myChart: null,
                       nowIndex: -1,
                       interval: null,
                       flySeries: null
                }
        },
        mounted() {
                // this.getSeries();
                // this.initChart();
        },
        methods: {
                getSeries() {

                },
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
                                title: {
					show: false,
					text: '地图飞线',
					x: 'center',
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: function (params) {
						if (params.value) {
							return params.name + ' : ' + params.value[2];
						} else {
							return params.name;
						}
					}
				},
				geo: {
					map: 'china',
					roam: false, //开启鼠标缩放和漫游
					zoom: 1, //地图缩放级别
					selectedMode: false, //选中模式：single | multiple
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					layoutCenter: ['50%', '50%'], //设置后left/right/top/bottom等属性无效
					layoutSize: '100%', //保持地图宽高比
					label: {
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#101f32',
							borderWidth: 1.1,
							borderColor: '#43d0d6'
						},
						emphasis: {
							areaColor: '#069'
						}
					}
				},
				series: this.flySeries
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
