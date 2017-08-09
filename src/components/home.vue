<template>
  <div class="home">
    <div class="head">
      <span class="title">D</span>
    </div>
    <div class="home-main">
      <div class="left">
        <div class="user">
          <span>我的菜单</span>
        </div>
        <ul class="meun" v-bind:key="item" v-for="item in meunData">
          <li @click="item.meunFlag =! item.meunFlag">
            <i class="icon-cog fa-2x"></i>
            <span>{{item.name}}</span>
            <i class=" fa-2x" v-bind:class="item.meunFlag ? 'icon-angle-up' :  'icon-angle-down'"></i>
  
          </li>
          <ul class=" meun-child " v-show="item.meunFlag ">
            <li v-bind:key="child" v-for="child in item.child">
              <i class="icon-circle "></i>
              <span>{{child.name}}</span>
            </li>
          </ul>
        </ul>
  
      </div>
      <div class="right ">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import URL from '../config/URL.js';
import axios from 'axios';

export default {
  data() {
    return {
      meunData: [
        {
          name: "系统管理",
          meunFlag: false,
          child: [{
            name: '用户管理'
          }]
        },
        {
          name: "文章管理",
          meunFlag: false,
          child: [{
            name: '上传管理'
          }]
        }
      ]
    };
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="less">
.home {
  .head {
    width: 100%;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #333333;
    .title {
      font-size: 30px;
      margin-left: 50px;
    }
  }
  .home-main {
    display: flex;
    .left {
      width: 250px;
      border-right: 1px solid #afaeae;
      .user {
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #afaeae;
        border-bottom: 1px solid #afaeae;
      }
      .meun {
        padding: 0;
        li {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #afaeae;
          cursor: pointer;
          i {
            margin-left: 30px;
          }
          span {
            font-size: 16px;
            margin: auto 30px;
          }
        }
        .meun-child {
          padding: 0;
          li {
            height: 50px;
            line-height: 50px;
            margin-left: 50px;
            i {
              margin: 0;
            }
            &:hover {
              color: #fa528b
            }
          }
        }
      }
    }
    .right {
      flex: 1;
    }
  }
}

.fa-2x {
  font-size: 2rem;
}

a {
  text-decoration: none
}
</style>
