<template>
  <div class="home">
    <div class="head">
      <span class="title">D</span>
    </div>
    <div class="home-main">
      <div class="left">
        <div class="user">
          我的菜单
        </div>
        <ul class="meun" v-bind:key="item.name" v-for="item in $store.state.menulist">
          <li @click="item.meunFlag =! item.meunFlag">
            <i class=" fa-2x" v-bind:class="item.icon"></i>
            <span>{{item.name}}</span>
            <i class=" fa-2x" v-bind:class="item.meunFlag ? 'icon-angle-up' :  'icon-angle-down'"></i>
  
          </li>
          <ul class=" meun-child " v-show="item.meunFlag ">
            <li v-bind:key="child.name" v-for="child in item.child" @click="stateTo(child.url)">
              <i class="icon-circle "></i>
              <span>{{child.name}}</span>
            </li>
          </ul>
        </ul>
  
      </div>
      <div class="right ">
        <div class="main_head">
          <el-breadcrumb  class="title">
  
            <el-breadcrumb-item v-bind:key="item.name" v-for="item in $store.state.menudata">{{item.name}}</el-breadcrumb-item>
  
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import URL from '../config/URL.js';
import axios from 'axios';
import store from '../store/index'
import router from '../router'

export default {
  data() {
    return {
      meunData: [
       

      ]
    };
  },
  store,
  components: {
  },
  methods: {
    stateTo(name){
      router.push(name)
    }
  }
}
</script>

<style lang="less">
.home {
  height: 100%;
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
    height: 100%;
    .left {
      width: 250px;
      overflow: auto;
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
      .main_head {
        width: 100%;
        font-size: 14px;
        .title {
          padding: 20px;
        }
      }
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
