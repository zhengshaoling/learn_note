<!--
 * @Author: your name
 * @Date: 2021-04-01 10:27:39
 * @LastEditTime: 2021-08-09 17:00:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\pages\admin\index.vue
-->
<template>
    <div id="admin">
        <el-button size="large" @click="navToHome" class="mr10">回到首页</el-button>
        <el-button type="primary" size="large" @click="openDialog">测试 head title</el-button>

        <warm-pop :pop="dialogVisible" title="测试弹窗title" centerTitle="测试弹窗centerTitle" :closeImg="true" :icon="0"
                @close="dialogVisible = false">
          <el-button slot="btn" type="warning" @click="test">确定</el-button>
          <el-button slot="btn" @click="dialogVisible = false">取消</el-button>
      </warm-pop>

    </div>
</template>
<script>
export default {
    name: 'Admin-Index',
  
    head() {
        return {
            title: '标题',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: '测试测试'
                }, {
                hid: 'keywords',
                name: 'keywords',
                content: 'keywords测试'
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
        test() {
            this.$message.success('操作成功')
        },
        navToHome() {
            this.$router.push('/');
        }

    }
}
</script>
<style>
.mr10 {
    margin-right: 10px;
}
</style>
<style scoped>
#admin {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
}
</style>
