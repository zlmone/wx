<style scoped lang="less">
    @import "../assets/login.less";
</style>

<template>
    <div class="login">
        <div class="header">
            <div class="logo">
                <span class="icon-logo"></span>
                <i class="gray">|</i>
                <span class="font-16">狂风客服会话系统</span>
            </div>
        </div>
        <div class="login-form">
            <div class="main">
                <div class="bg-font">
                    <p class="font-42">微信</p>
                    <p class="font-36">连接一切会话</p>
                </div>
                <div class="login-box">
                    <div class="nav">
                        <ul>
                            <li>
                                <h2>客服登录</h2>
                            </li>
                        </ul>
                    </div>
                    <Form ref="loginForm" :model="formLogin" :rules="ruleLogin" class="form">
                        <div class="form-input">
                            <FormItem prop="account">
                                <i class="icon-name"></i>
                                <input placeholder="请输入帐号" v-model="formLogin.account" class="user-input" type="text" maxlength="50">
                            </FormItem>
                        </div>
                        <div class="form-input">
                            <FormItem prop="password">
                                <i class="icon-psw"></i>
                                <input placeholder="请输入密码" v-model="formLogin.password" class="psd-input" type="password" maxlength="50">
                            </FormItem>
                        </div>
                        <div v-show="errorMessage">{{errorMessage}}</div>
                        <input type="button" class="submit" @click="handleSubmit" value="立即登录"/>
                    </Form>
                </div>
            </div>
        </div>
        <div class="footer">
            Copyright © 2016-2017 KF. All Rights Reserved&nbsp;狂风客服会话系统
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'
    import index from "@/router/index";
    import bus from '@/libs/bus'
    import user from '@/libs/user'

    export default {
        data: function () {
            return {
                errorMessage: null,
                formLogin: {
                    account: '13480153206',
                    password: '123456',
                },
                ruleLogin: {
                    account: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //登录
            handleSubmit() {
                this.errorMessage = null;
                this.$refs['loginForm'].validate(valid => {
                    if (!valid) {
                        this.errorMessage = "表单验证失败";
                        return;
                    }

                    this.$router.push({name: "home"});
                  //this.$Spin.show();
                  this.$http.post("/application/login", qs.stringify(this.formLogin))
                        .then(result => {
                            let token = result.data;
                            localStorage.setItem("loginTime",new Date().getTime());
                            localStorage.setItem("token", token);
                            this.loadAppData()
                                .then(() => {
                                    bus.$emit('login');
                                    //this.$Spin.hide();
                                    this.$Notice.success({
                                        title: '登录成功'
                                    });
                                    this.$router.push({name: "home"});
                                })
                                .catch(error => {
                                    //this.$Spin.hide();
                                    this.$Notice.error({
                                        title: '登录失败',
                                        desc: error.message
                                    });
                                });
                        })
                        .catch(error => {
                            //this.$Spin.hide();
                            this.$Notice.error({
                                title: '登录失败',
                                desc: error.message
                            });
                        });
                });
            },

            loadAppData() {
                return axios.all([
                    this.$http.get("/application/menus"),
                    this.$http.get("/application/principal"),
                    this.$http.get("/application/resources"),
                ]).then(axios.spread((menus, principal, resources) => {
                    localStorage.setItem("menus", JSON.stringify(menus.data));
                    localStorage.setItem("principal", JSON.stringify(principal.data));
                    localStorage.setItem("resources", JSON.stringify(resources.data));

                })).catch(error => {
                    this.$Notice.error({
                        title: '错误：' + error.status,
                        desc: error.message
                    });
                });
            },

            created: function () {
                if (!localStorage.getItem("token")) {
                    this.loadAppData().then(() => {
                        this.$router.push({name: "index"});
                    });
                }
            }
        }
    }
</script>

