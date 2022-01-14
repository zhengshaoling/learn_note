<template>
        <div class="wms dark-linear-gradient-bg">
                <box width="50%" height="150px" custom-class="flex align-center justify-center" title="边框组件标题">
                        <div class="flex align-center justify-around mt-40" slot="main">
                                <simple-txt></simple-txt>
                                <simple-txt></simple-txt>
                                <simple-txt></simple-txt>
                                <simple-txt></simple-txt>
                        </div>
                        
                </box>
                <div class="blank"></div>
                <box width="50%" height="300px" custom-class="flex align-center justify-center">
                        <progress-scroll slot="main"></progress-scroll>       
                </box>
                <div class="blank"></div>
                <box width="50%" height="300px" custom-class="flex align-center justify-center">
                        <bar-pie slot="main" :my-property="barPieConfig"></bar-pie>       
                </box>
        </div>
</template>
<script>
import box from '@/components/common/box.vue'
import simpleTxt from '@/components/wms/simpleTxt.vue'
import progressScroll from '~/components/wms/progressScroll.vue'
import barPie from '@/components/wms/barPie.vue'
import { barPieConfig } from '@/components/wms/barPieConfig.js'

export default{
        name: 'wms',
        components: { simpleTxt, progressScroll, box, barPie },
        data() {
                return {
                        barPieConfig
                }
        }
}
</script>
<style lang="scss" scoped>
.wms {
        display: flex; 
        align-items: center;
        justify-content: center; 
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        .blank {
                width: 100%;
                height: 20px;
        }
}
</style>