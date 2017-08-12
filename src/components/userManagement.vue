<template>
  <div class="user">
    <form class="user-head">
      <div class="text-right ">
        <button class="btn btn-default btn-sm">
          <i class="icon-search"></i>搜索</button>
        <button class="btn btn-default btn-sm" @click="dialogFormVisible=true">
          <i class="icon-plus"></i>新增</button>
        <button class="btn btn-default btn-sm">
          <i class="icon-edit"></i>修改</button>
      </div>
      <div class="">
        <el-form ref="form" :model="params" label-width="80px">
          <el-form-item label="用户名:" class="col-md-3">
            <el-input v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item label="密码:" class="col-md-3">
            <el-input v-model="params.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </form>
  
    <div class="data-table">
      <el-table :data="tableData" style="width: 100%" highlight-current-row class="text-center">
  
        <el-table-column prop="account" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
      </el-table>
    </div>
  
    <el-dialog title="用户" :visible.sync="dialogFormVisible">
      <el-form :model="params">
        <el-form-item class="col-md-6" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="params.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="params.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="params.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="params.date" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import axios from 'axios';
import URL from '../config/URL';
import service from '../service/service';
import { Message } from 'element-ui';

export default {

  data() {
    return {
      params: {
        name: '',
        password: '',
        date: '',
        address: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: []
    }
  },
  created() {
    var params = '';
    axios.get(URL.getAllUser, params)
      .then((res) => {
        this.tableData = res.data
      })
      .catch((err) => {
        console.log(err);
      })
  },
  methods: {
    submit() {
      service.postData(this.params, 'createAccount', this.cb1);
    },
    cb1(res) {
      if (res.status == "E") {
        this.$message(res.msg);
      } else {
        this.$message(res.msg);
        this.getAllUser();
        this.dialogFormVisible = false;

      }
    },
    getAllUser() {
      service.getData('', 'getAllUser', this.cb2);
    },
    cb2(res) {
      this.tableData = res.data;
    }
  }
}
</script>
<style lang="less" >
.user {
  height: 100%;
  overflow: auto;
  padding: 10px;
  .user-head {
    height: auto;
  }
}
</style>
