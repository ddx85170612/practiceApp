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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        pwd: ''
      }
    };
  }
}
</script>

<style lang="less">
.main {
  background: url('../../static/img/login.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    background-color: rgba(220, 220, 220, 0.5);
    width: 500px;
    height: 400px;
    .title {
      margin-top: 50px;
      text-align: center;
      font-size: 30px;
      height: auto;
    }
    .form {
      margin: 50px  auto 0 auto  ;
      width: 300px;
    }
  }
}
</style>
