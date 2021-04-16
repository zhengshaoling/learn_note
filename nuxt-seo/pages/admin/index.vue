<template>
    <div id="admin">
        <div class="label">header title: {{header.title}}</div>
        <div class="label">header descriptions: {{header.descriptions}}</div>
        <div class="label">header keyword: {{header.keyword}}</div>
        <z-button type="primary" size="medium">测试</z-button>
    </div>
</template>
<script>
import zButton from '../../components/common/zButton'
export default {
    name: 'Admin-Index',
    components: { zButton },
    async asyncData(app) {
        let url = 'http://10.10.31.60:8088/service/cust/seo/p_getSeoData'
        let param = {
            "title": "众业达商城 找回密码",
            "keyword": "description 众业达商城 找回密码",
            "descriptions": "ome page description 众业达商城 找回密码 seo"
        }
        try {
            let res = await app.$axios.post(url, param);
            const { data, code } = res.data;
            if (code == 0) {
                return { header: data.data };
            }
        } catch(e) {
            console.log('asyncData错误', e)
        }


    },
    head() {
        return {
            title: this.header.title,
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: this.header.descriptions
                }, {
                hid: 'keywords',
                name: 'keywords',
                content: this.header.keyword
                }
            ]
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
#admin {
    text-align: center;
    color: #999;
    padding: auto auto;
}
</style>
