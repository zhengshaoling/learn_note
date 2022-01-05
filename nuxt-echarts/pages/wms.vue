<template>
        <div class="wms dark-linear-gradient-bg">
                <box width="50%" height="150px" custom-class="flex align-center justify-center">
                        <simple-txt slot="main"></simple-txt>
                </box>
                <div class="blank"></div>
                <box width="80%" height="300px" custom-class="flex align-center justify-center">
                        <progress-scroll slot="main"></progress-scroll>       
                </box>
        </div>
</template>
<script>
import box from '@/components/common/box.vue'
import simpleTxt from '@/components/wms/simpleTxt.vue'
import progressScroll from '~/components/wms/progressScroll.vue'

export default{
        name: 'wms',
        components: { simpleTxt, progressScroll, box },
        data() {
                return {

                }
        },
        mounted() {

        },
        methods: {

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