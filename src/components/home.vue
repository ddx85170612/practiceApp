<template>
  <div class="home">
    <section class="search">
      <x-header :left-options="{showBack: false}">这是什么APP.</x-header>
      <a class="search-icon  icon iconfont icon-sousuo-xianxing"></a>
      <a class="mes icon iconfont icon-119"></a>
    </section>
    <scroller lock-x scrollbar-y>
      <!-- 滑动-->
      <section class="slider">
        <swiper loop auto :list="demo06_list"></swiper>
      </section>
      <!--分类-->
      <section class="cat">
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/3">
            <div class="flex-demo">
              <ul>
                <li>
                  <i class="icon iconfont icon-shezhi-xianxing f26"></i>
                </li>
                <li>分类1</li>
              </ul>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
            <div class="flex-demo">
              <ul>
                <li>
                  <i class="icon iconfont icon-shezhi-xianxing f26"></i>
                </li>
                <li>分类2</li>
              </ul>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
            <div class="flex-demo">
              <ul>
                <li>
                  <i class="icon iconfont icon-shezhi-xianxing f26"></i>
                </li>
                <li>分类3</li>
              </ul>
            </div>
          </flexbox-item>
        </flexbox>
      </section>
      <!--推荐商品-->
      <section class="recommend">
        <div class="title">
          <span class="icon iconfont icon-diamond-o f26"></span>
          <span>推荐商品</span>
        </div>
        <div class="content">
          <x-table :cell-bordered="false">
            <tbody>
              <tr v-for="item in recommendData.data">
                <td>
                  {{item.shopName}}
                </td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </section>
    </scroller>
  </div>
</template>
<script>
import URL from '../config/URL.js';
import axios from 'axios';
import { XHeader, Swiper, SwiperItem, Flexbox, FlexboxItem, Scroller, XTable } from 'vux';

//滑动图片数据
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
}];
const urlList = baseList.map((item, index) => ({
  url: 'http://m.baidu.com',
  img: item.img,

}))

export default {
  data() {
    return {
      demo06_list: urlList,
      recommendData: {}
    };
  },
  created() {
    axios.post(URL.queryItemSpu)
      .then((res) => {
        this.recommendData = res.data
        this.service.console(this.recommendData);;
      })
      .catch((err) => {
        console.log(err);
      })
  },
  components: {
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem,
    Scroller,
    XTable
  },
  methods: {
  }
}
</script>

<style lang="less">
.f26 {
  font-size: 26px
}

.home {

  .search {
    position: relative;
    line-height: 47px;
    .search-icon,
    .mes {
      position: absolute;
      font-size: 30px;

      top: 0;
      color: #fff;
      font-weight: bold;
    }
    .mes {
      right: 16px;
    }
    .search-icon {
      left: 16px;
    }
  }
  .cat {
    height: auto;
    .vux-flexbox {
      .flex-demo {
        ul {
          padding: 0;
        }
        li {
          text-align: center;
        }
      }
    }
  }
  .recommend {
    height: 50px;
    line-height: 50px;

    background-color: #EFF2F7;
    .title {
      text-align: center;
      font-size: 26px;
    }
  }
}
</style>
