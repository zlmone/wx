import settingRoute from "./setting";
import dashboardRoute from './dashboard'
import courseManage from './courseManage'
import home from './home'
import liveManage from  './liveManage'
import systemManage from  './systemManage'
import orderManage from './orderManage'
import userManage from './userManage'
import bannerManage from './bannerManage'
import startPageManage from './startPageManage'
import circleManage from './circleManage'

let indexRoute = {
    path: '/',
    name: 'index',
    meta: {
        title: "首页",
        breadcrumb: true
    },
    redirect: {
        name: 'home'
    },
    component: (resolve) => {
        require(['@/views/Index'], resolve)
    },
    children: [
        home,dashboardRoute,courseManage,bannerManage,startPageManage,settingRoute,liveManage,systemManage,orderManage,userManage,circleManage]
}

let loginRoute = {
    name: 'login',
    path: '/login',
    meta: {
        title: "登录",
        breadcrumb: true
    },
    component: (resolve) => require(['@/views/Login'], resolve)
};


export default [indexRoute, loginRoute]