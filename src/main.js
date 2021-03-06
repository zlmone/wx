// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import iView from "iview";
import App from "./App";
import router from "./router";
import Http from "@/libs/http";
import Loading from "@/components/Loading";
import ModalForm from '@/components/ModalForm'
import ModalSelect from '@/components/ModalSelect'
import GenericForm from '@/components/GenericForm'
import SearchList from '@/components/SearchList'
import "../theme/index.less";
import "jquery";
import "bootstrap/js/modal.js";
import "bootstrap/js/dropdown.js";
import "bootstrap/js/tooltip.js";
import "summernote";
import "summernote/dist/lang/summernote-zh-CN.js";
import VueClipboard from 'vue-clipboard2'
Vue.config.productionTip = false;
Vue.use(Http);
Vue.use(iView);
Vue.use(VueClipboard);
Vue.component('Loading', Loading);
Vue.component('ModalForm',ModalForm);
Vue.component('ModalSelect',ModalSelect);
Vue.component('GenericForm',GenericForm);
Vue.component('SearchList', SearchList);


new Vue({
    router,
    el: '#app',
    template: '<App/>',
    components: {App}
});
