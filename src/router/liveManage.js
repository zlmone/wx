/**
 * 直播管理
 * Created by bainuo on 2017/12/18.
 */
let liveManageRoute = {
    path: '/liveList',
    meta: {
        title: "直播管理",
        breadcrumb: false,
    },
    component: (resolve) => require(['@/views/live/liveManage/LiveMangeList'], resolve),
};
let liveMangeAddRoute={
    name:'liveMangeAdd',
    path:'/liveMangeAdd',
    meta:{
        title:"新增直播",
        breadcrumb: true,
    },
    component: (resolve) => require(['@/views/live/liveManage/LiveMangeAdd'], resolve),
};

let liveMangeDetailsRoute={
    name:'liveMangeDetails',
    path:'/liveMangeDetails',
    meta:{
        title:"直播详情",
        breadcrumb: true,
    },
    component: (resolve) => require(['@/views/live/liveManage/LiveMangeDetails'],resolve),
};
let liveUploadAccessoryRoute={
        name:'liveUploadAccessory',
        path:'/liveUploadAccessory',
        meta:{
        title:"上传附件",
            breadcrumb: true,
        },
        component: (resolve) => require(['@/views/live/liveManage/LiveUploadAccessory'],resolve),
};
let liveMangeInviteRoute={
    name:'liveMangeInvite',
    path:'/liveMangeInvite',
    meta:{
        title:"邀请规则",
        breadcrumb: true,
    },
    component: (resolve) => require(['@/views/live/liveManage/LiveMangeInvite'],resolve),
};
export default {
    name:'liveManage',
    path: '/live/manage',
    redirect: '/liveList',
    meta: {
        title: "直播管理",
        breadcrumb: true
    },
    component: {
        template: '<keep-alive include="livemanage"><router-view></router-view></keep-alive>'
    },
    children: [liveManageRoute,liveMangeAddRoute,liveMangeDetailsRoute,liveUploadAccessoryRoute,liveMangeInviteRoute]
}
