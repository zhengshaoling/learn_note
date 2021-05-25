<template>
    <div id="admin">
        <div class="label">header title: {{header.title || 'title'}}</div>
        <div class="label">header descriptions: {{header.descriptions || 'descriptions'}}</div>
        <div class="label">header keyword: {{header.keyword || 'keyword'}}</div>
        <z-button type="primary" size="medium" @click="openDialog">测试</z-button>

        <warm-pop :pop="dialogVisible" title="测试弹窗title"  centerTitle="测试弹窗centerTitle" :closeImg="true" :icon="0"
                @close="dialogVisible = false">
          <z-button slot="btn" type="warning" @click="test">确定</z-button>
          <z-button slot="btn" @click="dialogVisible = false">取消</z-button>
      </warm-pop>

    </div>
</template>
<script>
export default {
    name: 'Admin-Index',
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
            dialogVisible: false
        }
    },
    methods: {
        openDialog() {
            this.dialogVisible = !this.dialogVisible;
        },
      async test() {
        let res = await this.$axios.post('http://10.88.20.14:8523/api/service/' + 'cust/seo/p_getSeoData', {
          "title": "众业达商城 找回密码",
          "keyword": "description 众业达商城 找回密码",
          "descriptions": "ome page description 众业达商城 找回密码 seo"
        })
        if(res){
          this.$message.success('请求成功');
          this.dialogVisible = false;
        }
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
