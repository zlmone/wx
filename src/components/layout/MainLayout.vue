<style lang="less" scoped>
  .layout {
    //background: #eee;
    .header {
      color: #fff;
      line-height: 30px;
      background-color: #373d41;
      box-shadow: 0 2px 2px #CCCCCC;
    }
    .leftsides{
      border-radius:50%
    }
    .app-main {
      background: #fff;

      width: 95%;
      margin: 30px auto 20px;
      border-radius: 6px;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1)
    }
    .main {
      border-left: 1px solid #eee;
      .subpage {
        //padding: 20px;
        min-height: 800px;
        background: #fff;
        text-align: left;
      }
    }
    .footer {
      color: #888;
      text-align: center;
      line-height: 20px;
      padding: 10px;
      float: left;
      width: 100%;
    }
  }
</style>

<template>
  <div class="layout" v-if="isFullScreen">
    <Row class="header">
      <i-col span="4">
        <slot name="logo">
          Logo Slot Empty
          <!--<Logo></Logo>-->
        </slot>
      </i-col>
      <i-col span="13">
        <slot name="navbar">
        <!--Navbar Slot Empty-->
        <Navbar></Navbar>
        </slot>
      </i-col>
      <i-col span="5">
        <slot name="user">
          User Slot Empty
          <UserMenu></UserMenu>
        </slot>
      </i-col>
    </Row>
    <Row class="app-main">
      <i-col :span="leftSpans" class="leftsides">
        <slot name="leftside"></slot>
      </i-col>
      <i-col :span="mainSpans" class="main">
        <!--<slot name="toolbar">toolbar slot empty</slot>-->
        <div class="subpage">
          <router-view></router-view>
        </div>
        <slot>
          Main Slot Empty
        </slot>
      </i-col>
    </Row>
    <Row>
      <Col class="main" span="24">
      <div class="footer">
        <slot name="footer">Footer Slot Empty</slot>
      </div>
      </Col>
    </Row>
  </div>
  <!-- 全屏 -->
  <div class="layout" v-else>
    <Row>
      <slot :name="slotName">neaten Slot Empty</slot>
    </Row>
  </div>
</template>
<script>
    import bus from '@/libs/bus'
    export default {
        name: 'MainLayout',
        props: [
            //控制侧栏宽度
            'left',
            //控制主体宽度
            'main'
        ],
        data: function () {
            return {
                leftSpans: this['left'] + 1,
                mainSpans: this['main'] - 1,
                isFullScreen: true,//是否全屏
                slotName: '',//插槽名称
            }
        },
        created: function () {
            let _this = this;
            bus.$on('leftHeight', function (val) {
                _this.mainSpans = val;
            });
            bus.$on('fullScreen', (val, name) => {//控制全屏
                this.isFullScreen = val;
                this.slotName = name;
            });
        },
        methods: {},
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': function () {
                this.mainSpans = this['main'] - 1;
            }
        },

    }

</script>
