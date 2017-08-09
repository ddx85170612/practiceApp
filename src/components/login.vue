<template>
  <div class="main">
    <div class="content">
      <div class="title">
        登录界面
      </div>
      <div class="form">
  
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="账户">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.pwd"></el-input>
          </el-form-item>
  
        </el-form>
        <div class="submit">
          <el-button id="login" @click="submit">登陆</el-button>
        </div>
  
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import URL from "../config/URL";
import router from '../router'

export default {
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        pwd: ''
      },
    };
  },
  methods: {
    submit() {
      console.log(this.formLabelAlign);

      // router.push('home')
      axios.post(URL.getAccount,this.formLabelAlign)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
}
</script>

<style lang="less">
.main {
  background: url('../../static/img/login.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
    background-color: rgba(220, 220, 220, 0.5);
    width: 500px;
    height: 400px;
    border-radius: 15px;
    .title {
      margin-top: 50px;
      text-align: center;
      font-size: 30px;
      height: auto;
    }
    .form {
      margin: 30px auto 0 auto;
      width: 300px;
      .submit {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
