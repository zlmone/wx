<style lang="less">
    .user-menu-dropdown {
        float: right;
        .info {
            color: #fff;
            width: 200px;
            display: block;
            padding: 0px 15px;
            font-size: 14px;
            text-align: center;
            background-color: #373d41;
            img {
                float: left;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 11px 0 0 0;
            }
            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inherit;
                text-align: left;
                padding: 0px 20px;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .ivu-select-dropdown {
            margin: 0px;
            padding: 0px;
            .ivu-dropdown-item {
                width: 150px;
                line-height: 30px;
                text-align: center;
                border-bottom: #eee solid 1px;
                &:hover {
                    color: #373d41;
                    border-left: #c33 solid 1px;
                }
            }
        }
    }
</style>

<template>
    <div>
        <Dropdown trigger="hover" class="user-menu-dropdown" placement="bottom-start" @on-click="showMenu">
            <a href="javascript:void(0);" class="info">
                <img :src="[user.avatarPath!=null?user.avatarPath:'/static/image/to_img.png']" alt=""/>
                <span class="name">{{user.name}}</span>
            </a>
            <Dropdown-menu slot="list">
                <Dropdown-item name="UserProfile">个人资料</Dropdown-item>
                <Dropdown-item name="UpdatePassword">修改密码</Dropdown-item>
                <Dropdown-item name="LogOut">退出登录</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>

        <ModalForm ref="updateProfileModalForm">
            <template slot-scope="{model}">
                <FormItem label="姓名" prop="name">
                    <Input v-model="model.name" placeholder="请输入角色名称"/>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <Select v-model="model.gender">
                        <Option value="MAN">男</Option>
                        <Option value="LADY">女</Option>
                        <Option value="UNKNOWN">未知</Option>
                    </Select>
                </FormItem>
                <FormItem label="生日" prop="birthday">
                    <DatePicker v-model="model.birthday" type="date" placeholder="选择出生日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="头像" prop="avatarPath">
                    <UploadImage :maxNum='1' :maxSize="1024" purpose="useravatar" :images="[model.avatar]" @removeImage="removeImage" @newImage="newImage"/>
                </FormItem>
            </template>
        </ModalForm>

        <ModalForm ref="updatePasswordModalForm">
            <template slot-scope="{model}">
                <FormItem label="旧密码" prop="oldPassword">
                    <Input type="password" v-model="model.oldPassword" placeholder="请输入旧密码"/>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <Input type="password" v-model="model.newPassword" placeholder="请输入新密码"/>
                </FormItem>
                <FormItem label="确认密码" prop="confirmPassword">
                    <Input type="password" v-model="model.confirmPassword" placeholder="请再次输入新密码"/>
                </FormItem>
            </template>
        </ModalForm>
    </div>
</template>

<script>
    import bus from '@/libs/bus'
    import user from '@/libs/user'
    import UploadImage from "@/components/UploadImage";

    export default {
        name: 'UserMenu',
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data: function () {
            return {
                model:'',
            }
        },
        methods: {
            showMenu(key) {   //退出
                switch (key) {
                    case 'LogOut':
                        this.logout();
                        break;
                    case 'UserProfile':
                        this.updateProfile();
                        break;
                    case 'UpdatePassword':
                        this.updatePassword();
                        break;
                }
            },

            logout() {
                this.$Modal.confirm({
                    title: '确认退出',
                    content: '您确认要退出登录吗?',
                    onOk: function () {
                        bus.$emit('logout');
                    }
                })
            },

            updateProfile() {
                this.$refs.updateProfileModalForm.showForm({
                    title: '修改个人资料',
                    model: {
                        name: this.user.name,
                        gender: this.user.gender,
                        birthday: this.user.birthday,
                        avatarPath: this.user.avatarPath
                    },
                    rules: {
                        name: {
                            required: true,
                            trigger: "blur",
                            message: "请填写您的姓名",
                        }
                    },
                    submitter: (model) => {
                        return new Promise((resolve, reject) => {
                            console.log(model);
                            resolve();
                        });
//                        return this.$http.put(`role/${role.id}`, model)
//                            .then((result) => {
//                                role = model;
//                            });
                    }
                })
            },

            updatePassword() {
                let model = {};
                this.$refs.updatePasswordModalForm.showForm({
                    title: '修改密码',
                    model: model,
                    rules: {
                        oldPassword: {
                            required: true,
                            trigger: "blur",
                            message: "请输入旧密码",
                        },
                        newPassword: {
                            required: true,
                            trigger: "blur",
                            message: "请输入新密码",
                        },
                        confirmPassword: [
                            {
                                required: true,
                                trigger: "blur",
                                message: "请再次输入新密码",
                            },
                            {
                                validator(rule, value, callback) {
                                    if (!model.newPassword || !model.confirmPassword) {
                                        callback();
                                    } else if (model.newPassword === model.confirmPassword) {
                                        callback();
                                    } else {
                                        callback(new Error('您两次输入的密码不一样，请重新输入'));
                                    }
                                }
                            }
                        ]
                    },
                    submitter: (model) => {
                        return new Promise((resolve, reject) => {
                            console.log(model);
                            resolve();
                        });
//                        return this.$http.put(`role/${role.id}`, model)
//                            .then((result) => {
//                                role = model;
//                            });
                    }
                })
            },

            removeImage(image) {
                console.log(`删除image ${image}`);
            },

            newImage(image) {
                console.log(`新增image ${image}`);
            },
        },
        components: {UploadImage}
    }

</script>
