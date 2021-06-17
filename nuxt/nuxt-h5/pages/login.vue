<template>
    <div id="Login">
        <div class="container user-container">
            <div class="text-right">
                <a class="back-home" href="/">首页</a>
            </div>
            <div class="app-auth-container">
                <div v-if="logOrReg == 'login'" class="logo text-center logo">
                    <span>登录界面</span>
                    <!-- <img src="https://static.intsig.net/dps/img/ai/logo-zh-3.png" alt="logo"> -->
                </div>
                <div v-if="logOrReg == 'loginByPwd'" class="context-box">
                    <div class="app-login-union">
                        <div class="text-center context-box-title">账户登录</div>
                        <div>
                            <div class="form-group margin-t-1x">
                                <input type="text" maxlength="50" autocomplete="off" class="form-control input-lg input-flat input-flat-user" placeholder="请输入账户名或账户ID" v-model="loginForm.account">
                            </div>
                            <div class="form-group">
                                <input type="password" autocomplete="off" class="form-control input-lg input-flat input-flat-lock" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter="signIn">
                            </div>
                            <!-- <div>
                                <a @click="changeLogOrRegist">注册账户</a>                  
                                <a class="float-right" href="/user/forget-password">忘记密码</a>
                            </div> -->
                            <br>
                            <div class="form-group">
                                <a class="handle-btn" @click="signIn">
                                    <span v-if="!loading.signIn">登录</span>
                                    <span v-if="loading.signIn">
                                        <!-- <img src="https://static.intsig.net/dps/img/ai/loading-2.svg" class="loading-img" style="width:20px"/> -->
                                        <span>登录中</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="text-center pointer mg-bottom-xs blue-text-btn" @click="changeLogOrRegist('loginByPhone')">验证码方式登录</div>
                        <div class="text-center color-gray pointer" @click="changeLogOrRegist('regist')">注册账户</div>
                    </div>
                </div>
                <div v-else-if="logOrReg == 'loginByPhone'" class="context-box">
                    <div class="app-login-union">
                        <div class="text-center context-box-title">账号登录</div>
                        <div>
                            <div class="form-group margin-t-1x">
                                <div class="input-group">
                                    <input type="text" maxlength="50" autocomplete="off" class="form-control input-lg input-flat input-flat-user" placeholder="请输入手机号" v-model="loginByPhoneForm.mobile">
                                    <div class="input-group-addon" @click="getCode">获取验证码</div>
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <input type="password" autocomplete="off" class="form-control input-lg input-flat input-flat-lock" placeholder="请输入验证码" v-model="loginByPhoneForm.validateCode">
                            </div>
                        <!-- <form class="form-inline">
                            <div class="form-group has-success has-feedback">
                                <input type="text" class="form-control" id="inputSuccess4" aria-describedby="inputSuccess4Status" v-model="loginByPhoneForm.mobile">
                                <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                                <span id="inputSuccess4Status" class="sr-only">(success)</span>
                            </div>
                            <div @click="getCode">获取验证码</div>
                            <button type="submit" class="btn btn-primary" :loading="loading.getCode" >获取验证码</button>
                        </form>
                        <form class="form-inline">
                            <div class="form-group has-success has-feedback">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="inputGroupSuccess3" aria-describedby="inputGroupSuccess3Status" v-model="loginByPhoneForm.validateCode">
                                </div>
                                <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                                <span id="inputGroupSuccess3Status" class="sr-only">(success)</span>
                            </div>
                        </form> -->
                        
                            <div class="form-group">
                                <a class="handle-btn" @click="signInByPhone">
                                    <span v-if="!loading.signInByPhone">登录</span>
                                    <span v-if="loading.signInByPhone">
                                        <!-- <img src="https://static.intsig.net/dps/img/ai/loading-2.svg" class="loading-img" style="width:20px"/> -->
                                        <span>登录中</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    
                        <div class="text-center pointer mg-bottom-xs blue-text-btn" @click="changeLogOrRegist('loginByPwd')">账号密码登录</div>
                        <div class="text-center color-gray pointer" @click="changeLogOrRegist('regist')">注册账户</div>
                    </div>
                </div>
                <div v-else  class="context-box">
                    <div class="app-login-union">
                        <div class="text-center context-box-title">注册账户</div>
                        <div>
                            <div class="form-group margin-t-1x">
                                <input type="text" maxlength="50" autocomplete="off" class="form-control input-lg input-flat input-flat-user" placeholder="请输入账户名" v-model="registForm.account">
                            </div>
                            <div class="form-group margin-t-1x">
                                <input type="text" maxlength="50" autocomplete="off" class="form-control input-lg input-flat input-flat-user" placeholder="请输入昵称" v-model="registForm.nickName">
                            </div>
                            <div class="form-group margin-t-1x">
                                <input type="text" maxlength="50" autocomplete="off" class="form-control input-lg input-flat input-flat-user" placeholder="请输入邮箱" v-model="registForm.email">
                            </div>
                            <div class="form-group margin-t-1x">
                                <input type="text" maxlength="50" autocomplete="off" class="form-control input-lg input-flat input-flat-user" placeholder="请输入手机号码" v-model="registForm.mobile">
                            </div>
                            <div class="form-group">
                                <input type="password" autocomplete="off" class="form-control input-lg input-flat input-flat-lock" placeholder="请输入密码" v-model="registForm.password">
                            </div>
                            <div class="form-group">
                                <input type="password" autocomplete="off" class="form-control input-lg input-flat input-flat-lock" placeholder="请再次输入密码" v-model="confirmPassword">
                            </div>
                            <!-- <div>
                                <a @click="changeLogOrRegist">注册账户</a>                  
                                <a class="float-right" href="/user/forget-password">忘记密码</a>
                            </div> -->
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
                        </div>
                        <div class="text-center color-gray pointer" @click="changeLogOrRegist('loginByPwd')">已有账号，点击登录</div>
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
    name: 'login',
    data() {
        return {
            logOrReg: 'loginByPwd',
            loading: {
                signIn: false,
                regist: false,
                signInByPhone: false,
                getCode: false
            },
            loginForm: {
                account: '',
                password: ''
            },
            loginByPhoneForm : {
                validateCode: '',
                mobile: ''
            },
            registForm: {
                account: "",
                email: "",
                mobile: "",
                nickName: "",
                password: ""
            }
        }
    },
    created() {
        console.log('Vue $md5', md5('string'))
    },
    methods: {
        getCode() {
            let mobile = this.loginByPhoneForm.mobile;
            this.loading.getCode = true;
            getRequest(`/validate/sms/${mobile}`).then((res) => {
                this.loading.getCode = false;
                console.log('获取验证码返回res',res);
                alert('获取验证码成功')
            }).catch((err) => {
                console.log(err, 'err')
            })
        },
        changeLogOrRegist(txt) {
            this.logOrReg = txt;
        },
        signIn() {
            let loginForm = {
                account: this.loginForm.account,
                passwordMd5: md5(this.loginForm.account + '::' + this.loginForm.password)
            }
            this.loading.signIn = true;
            postRequest('/login/account',JSON.stringify(loginForm)).then((res)=>{
                this.loading.signIn = false;
                console.log('登录返回res',res);
                alert('登录成功，即将跳转至首页')
                Cookies.set('userInfo', JSON.stringify(res));
                this.$router.push('/')
            }).catch((err) => {
                alert('登录失败！');
                this.loading.signIn = false;
            })
        },
        async signInByPhone() {
            this.loading.signInByPhone =  true;
            let checkCode = {
                key: this.loginByPhoneForm.mobile,
                validateCode: this.loginByPhoneForm.validateCode
            }
            let checkRes = await postRequest('/validate/sms/check', JSON.stringify(checkCode));
            if(checkRes) {
                postRequest('/login/mobile',JSON.stringify(this.loginByPhoneForm)).then((res)=>{
                    console.log('登录返回res',res);
                    this.loading.signInByPhone = false;

                    alert('登录成功，即将跳转至首页')
                    Cookies.set('userInfo', JSON.stringify(res));

                    this.$router.push('/')
                }).catch((err) => {
                    alert('登录失败')
                    this.loading.signInByPhone = false;
                    console.log('err', err)
                })
            }
            
        },
        regist() {
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
#Login {
    width: 100%;
    height: 100vh;
    background-image: url('/login-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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
.logo {
    padding-bottom: 3rem;
    color: #fff;
    font-size: 2rem;
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
    border: 0.016rem solid #e0e3ec;
    box-shadow: none;
}
.input-lg {
    height: 2.8rem;
    padding: 0.75rem 1pc;
    font-size: 1.2rem;
    line-height: 1.3333333;
}
.form-control {
    width: 100%;
    height: 2.2rem;
    padding: 0.5rem 9pt;
    background-color: #fff;
    background-image: none;
    border: 0.016rem solid #ccc;
    box-shadow: inset 0 0.016rem 0.016rem rgba(0, 0, 0, 0.8);
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.form-control, output {
    display: block;
    font-size: 0.16rem;
    line-height: 1.42857143;
    color: #555;
}


</style>