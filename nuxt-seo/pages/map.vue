<!--
 * @Author: your name
 * @Date: 2021-08-09 16:51:23
 * @LastEditTime: 2021-08-09 17:13:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\pages\map.vue
-->
<template>
        <div id="Map">

        </div>
</template>
<script>
import echarts from 'echarts'
export default {
        name: 'Map',
        data() {
                return {
                        
                }
        },
        mounted() {
                this.init();
        },
        init() {
                this.myChart = echarts.init(document.getElementById('Map'));
                        
        }
}
</script>
<style>

</style>
