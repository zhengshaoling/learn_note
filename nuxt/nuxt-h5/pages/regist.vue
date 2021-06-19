<!--
 * @Author: shaoling
 * @Date: 2021-06-18 21:09:20
 * @LastEditTime: 2021-06-18 22:59:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-h5\pages\regist.vue
-->

<template>
    <div id="Regist">
        <div class="container user-container">
            <div class="text-right">
                <a class="back-home" href="/">首页</a>
            </div>
            <div class="app-auth-container">
                <div class="context-box">
                    <div class="app-login-union">
                        <div class="text-center context-box-title">注册账户</div>
                       
                        <form class="form-horizontal" id="registForm">
                            <div class="form-group margin-t-1x">
                                <label class="sr-only">账号名</label>
                                <input type="text" maxlength="18" autocomplete="off" class="form-control input-flat input-flat-user" placeholder="请输入账户名" name="account" v-model="registForm.account">
                            </div>
                            <div class="form-group margin-t-1x">
                                <label class="sr-only">昵称</label>
                                <input type="text" maxlength="30" autocomplete="off" class="form-control input-flat input-flat-user" placeholder="请输入昵称" name="nickName" v-model="registForm.nickName">
                            </div>
                            <div class="form-group margin-t-1x">
                                <label class="sr-only">邮箱</label>
                                <input type="email" maxlength="30" autocomplete="off" class="form-control input-flat input-flat-user" placeholder="请输入邮箱" name="email" v-model="registForm.email">
                            </div>
                            <div class="form-group margin-t-1x">
                                <label class="sr-only">手机号码</label>
                                <input type="tel" maxlength="11" autocomplete="off" class="form-control input-flat input-flat-user" placeholder="请输入手机号码" name="mobile" v-model="registForm.mobile">
                            </div>
                            <div class="form-group">
                                <label class="sr-only">密码</label>
                                <input type="password" maxlength="18" autocomplete="off" class="form-control input-flat input-flat-lock" placeholder="请输入密码" name="password" v-model="registForm.password">
                            </div>
                            <div class="form-group">
                                <label class="sr-only">确认密码</label>
                                <input type="password" maxlength="18" autocomplete="off" class="form-control input-flat input-flat-lock" placeholder="请再次输入密码" name="confirmPassword" v-model="confirmPassword">
                            </div>
                            <br>
                            <div class="form-group">
                                <a class="handle-btn" @click="regist">
                                    <span v-if="!loading.regist">注册</span>
                                    <span v-if="loading.regist">
                                        <!-- <img src="https://static.intsig.net/dps/img/ai/loading-2.svg" class="loading-img" style="width:20px"/> -->
                                        <span>注册中</span>
                                    </span>
                                </a>
                            </div>
                        </form>
                       
                        <div class="text-center color-gray pointer" @click="jumpToLogin()">已有账号，点击登录</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5';
import { getRequest, postRequest } from '~/plugins/axios/request'
import Cookies from 'js-cookie'
export default {
    name: 'Regist',
    data() {
        return {
            loading: {
                regist: false,
            }, 
            registForm: {
                account: "",
                email: "",
                mobile: "",
                nickName: "",
                password: ""
            },
            confirmPassword: ''
        }
    },
    created() {
        // this.init();
        console.log('Vue $md5', md5('string'))
    },
    methods: {
        init() {
            $('#registForm').bootstrapValidator({
                message : '请检查输入框是否合法',
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    account: {
                        message : '账号不能为空',
                        validators : {
                            notEmpty : {
                                message : '账号不能为空'
                            },
                            stringLength : {
                                min : 1,
                                max : 18,
                                message : '账号长度必须在1到18之间'
                            },
                        }
                    },
                    nickName: {
                        message : '昵称不能为空',
                        validators : {
                            notEmpty : {
                                message : '昵称不能为空'
                            },
                            stringLength : {
                                min : 1,
                                max : 18,
                                message : '昵称长度必须在1到18之间'
                            },
                        }
                    },
                    mobile: {
                        message : '手机号码不能为空',
                        validators : {
                            notEmpty : {
                                message : '手机号码不能为空'
                            },
                            stringLength : {
                                min : 11,
                                max : 11,
                                message : '请输入11位手机号码'
                            },
                            regexp : {
                                regexp : /^1[3|5|7|8]{1}[0-9]{9}$/,
                                message : '请输入正确的手机号码'
                            }
                        }
                    },
                    password : {
                        message : '密码无效',
                        validators : {
                            notEmpty : {
                                message : '密码不能为空'
                            },
                            stringLength : {
                                min : 6,
                                max : 18,
                                message : '密码长度必须在6到18之间'
                            },
                            identical : { //相同
                                field : 'confirmPassword', //需要进行比较的input name值
                                message : '两次密码不一致'
                            }
                        }
                    },
                    confirmPassword: {
                        message: '密码无效',
                        validators: {
                            notEmpty: {
                                message: '请再次输入密码'
                            },
                            stringLength: {
                                min: 6,
                                max: 18,
                                message: '密码长度必须在6到18之间'
                            },
                            identical: {//相同
                                field: 'password',
                                message: '两次密码不一致'
                            } 
                        
                        }
                    },
                    email : {
                        validators : {
                            notEmpty : {
                                message : '邮箱地址不能为空'
                            },
                            emailAddress : {
                                message : '请输入正确的邮件地址'
                            }
                        }
                    }
                }
            });
        },
        
        jumpToLogin() {
            this.$router.push('/login')
        },
        
       regist() {
            this.init();
            var bootstrapValidator = $("#registForm").data('bootstrapValidator');
            bootstrapValidator.validate();
            if(bootstrapValidator.isValid()) this.handleRegist();
            else return;
       },
       
        handleRegist() {
            this.loading.regist = true;
            let registForm = this.registForm;
            postRequest('/login/reg',JSON.stringify(registForm)).then((res)=>{
                this.loading.regist = false;
                console.log('登录返回res',res);
                alert('注册成功，自动登录中……')
                Cookies.set('userInfo', JSON.stringify(res));
                this.$router.push('/')
            }).catch((err) => {
                this.loading.regist = false;
                alert('注册失败')
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#Regist {
    width: 100%;
    height: 100vh;
    background-image: url('/login-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .form-group {
        margin-bottom: 10px;
    }
    .user-container {
        padding-top: 2rem;
    }
}
.blue-text-btn {
    color: #00428e;
    font-weight: bold;
}
.back-home {
    padding: 8px 18px;
    border: 1px solid rgba(255,255,255,.8);
    color: rgba(255,255,255,.8);
}
a { 
    cursor: pointer;
    text-decoration: none;
    transition: .3s;
}

.app-auth-container {
    margin-top: 2rem;
}
@media (max-width: 500px) {
    .app-auth-container>.context-box {
        width: 20rem !important;
    }
}
@media (max-width: 320px) {
    .app-auth-container>.context-box {
        width: 18rem !important;
    }
}
.app-auth-container>.context-box {
    box-shadow: 0 0 0.4rem #e0e3ec;
    margin: 0 auto;
    width: 25rem;
    padding: 2rem;
    background-color: #fff;
    border-radius: 0.25rem;
    .context-box-title {
        font-size: 1.6rem;
        color: #333;
        letter-spacing: 0.15px;
        padding-bottom: 3rem;
    }
}
.handle-btn {
    background-image: linear-gradient(-90deg ,#0499fb 0%,#2fd8ba 89%);
    border-radius: 0.64rem;
    color: #fff;
    font-size: 1rem;
    width: 100%;
    display: block;
    padding: 1rem;
    text-align: center;
    letter-spacing: 0.16rem;
    min-height: 2.64rem;
}
.app-auth-container .input-flat {
    font-size: 0.85rem;
}
.form-control {
    width: 100%;
    height: 2.2rem;
    padding: 0.5rem 9pt;
    // background-color: #fff;
    // background-image: none;
}
.form-control, output {
    display: block;
    font-size: 0.16rem;
    line-height: 1.42857143;
    color: #555;
}


</style>