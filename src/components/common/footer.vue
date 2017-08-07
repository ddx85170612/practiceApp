<template>
  <div class="footer">
    <tab class="tab" style="heigth:100px">
      <tab-item @on-item-click="handler" selected>
        <div class="barIcon">
          <i class="icon iconfont icon-home"></i>
        </div>
        <div class="barName">
          <span>首页</span>
        </div>
      </tab-item>
      <tab-item @on-item-click="handler">
        <div class="barIcon">
          <i class="icon iconfont icon-book"></i>
        </div>
        <div class="barName">
          <span>书</span>
        </div>
      </tab-item>
      <tab-item @on-item-click="handler">
        <div class="barIcon">
          <i class="icon iconfont icon-activity_fill"></i>
        </div>
        <div class="barName">
          <span>广播</span>
        </div>
      </tab-item>
      <tab-item @on-item-click="handler">
        <div class="barIcon">
          <i class="icon iconfont icon-diamond-o"></i>
        </div>
        <div class="barName">
          <span>小组</span>
        </div>
      </tab-item>
      <tab-item @on-item-click="handler">
        <div class="barIcon">
          <i class="icon iconfont icon-user"></i>
        </div>
        <div class="barName">
          <span>我的</span>
        </div>
      </tab-item>
  
    </tab>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux';
export default {
  data() {
    return {

    }
  },
  methods: {
    handler() {

    }
  },
  components: {
    Tab, TabItem
  }
}
</script>


<style lang="less">
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #adadad;
  .tab {
    width: 100%;
  }
  .vux-tab {

    height: 70px;
    .vux-tab-item {
      line-height: 70px;
      font-size: 16px;
      .barIcon {
        height: 50px;
        line-height: 50px;
        i {
          font-size: 30px;
        }
      }
      .barName {
        height: 20px;
        line-height: 20px;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
