<!-- 新增直播 -->
<style lang="less" scoped>
    .content {
        margin-left: 10%;
        *{
            font-weight:normal;
        }
        .center-left{
            float: left;
        }
        .sub-btn{
            text-align: center;
        }
    }
</style>

<template>
    <div class="content">
        <Row>
            <Button type="primary" style="float:right;" @click="edit">修改</Button>
        </Row>
        <Form :model="formCircleItem" :label-width="120">
            <FormItem label="圈子名称:" prop="name">
                <Input v-model="formCircleItem.name" placeholder="" disabled style="width:316px;"></Input>
            </FormItem>
            <FormItem label="圈主:" prop="belong">
                <Input v-model="formCircleItem.belong" placeholder="" disabled style="width:316px;"></Input>
            </FormItem>
            <FormItem label="嘉宾管理员:" prop="admin">
                <Input v-model="formCircleItem.admin" placeholder="" disabled style="width:316px;"></Input>
            </FormItem>
            <FormItem label="创建时间:" prop="createTime">
                <Input v-model="formCircleItem.createTime" placeholder="" disabled style="width:316px;"></Input>
            </FormItem>
            <FormItem label="圈子分类:" prop="type">
                <Input v-model="formCircleItem.name" placeholder="" disabled style="width:316px;"></Input>
            </FormItem>
            <FormItem label="圈子介绍" prop="textarea">
                <Input v-model="formCircleItem.textarea" type="textarea" disabled :autosize="{minRows: 2,maxRows: 5}" placeholder="输入圈子介绍"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import UploadImage from "@/components/UploadImage";
    import EditTheme from "@/components/EditTheme";
    import util from '@/libs/util'
    import CircleModel from "@/views/live/liveManage/common/CircleModel";
    export default{
        name: '',
        props: {},
        data: function () {
            return {
                formCircleItem:{
                    name:'asdfasd',
                    belong:'23232',
                    admin:'safzx',
                    type:'asdfasd',
                    textarea:'2323',
                    createTime:'20120121'
                },
            }
        },
        created: function () {
            this.fetchData();
        },
        methods: {
            edit(){
                this.$router.push({name:'circleMangeEdit',query:{id:'2'}})
            },
            fetchData(){
                let id=this.$route.query.id;
                console.info(id,'000')
                this.$http.get("group/"+id+"/detail").then((result)=>{
                    if (result.status == "OK") {//
                        console.info(result)
                    } else {
                        this.$Message.error(result.data.message);
                    }
                }).catch(function (error) {
                    //_this.$Message.error("搜索出现error" + error);
                });
            }
        },
        computed: {},
        components: {
        }
        ,
        watch: {}
    }
</script>
