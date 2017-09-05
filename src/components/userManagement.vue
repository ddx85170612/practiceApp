<template>
  <div class="user">
    <div class="user-head">
      <div class="text-right ">
        <button class="btn btn-default btn-sm" @click="getAllUser()">
          <i class="icon-search"></i>搜索</button>
        <button class="btn btn-default btn-sm" @click="add()">
          <i class="icon-plus"></i>新增</button>
        <button class="btn btn-default btn-sm" @click="update()">
          <i class="icon-edit"></i>修改</button>
      </div>
      <!-- <div class="inputForm"> -->
      <el-form ref="form" :model="params" label-width="80px" style="height:80px">
        <el-form-item label="用户名:" class="col-md-3">
          <el-input v-model="params.account"></el-input>
        </el-form-item>
        <!-- <el-form-item label="日期:" class="col-md-3">
          <el-input v-model="params.address"></el-input>
        </el-form-item> -->
      </el-form>
      <!-- </div> -->
    </div>

    <div class="data-table">
      <el-table :data="tableData.data" style="width: 100%" @row-click="rowClick" highlight-current-row class="text-center">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="account" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right ">
        <el-pagination @current-change="handleCurrentChange" :current-page="tableData.currentIndex" :page-size="tableData.size" layout="total, prev, pager, next, jumper" :total="tableData.count">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="用户" :visible.sync="dialogFormVisible">
      <el-form :model="data">
        <el-form-item class="col-md-6" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="data.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="data.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="data.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="data.date" auto-complete="off"></el-input>
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
        account: '',
        password: '',
        date: '',
        address: ''
      },
      data: {
        account: '',
        password: '',
        date: '',
        address: ''
      },
      updateData: {},
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: {},
      currentPage: 1
    }
  },
  created() {
    this.getAllUser();
  },
  methods: {
    submit() {
      service.getData('userSave', this.cb1, this.data);
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
      service.getData('userFind', this.cb2, this.params, this.tableData.currentIndex ? this.tableData.currentIndex : 1, 10);
    },
    cb2(res) {
      console.log(res);
      this.tableData = res;
    }
    ,

    handleCurrentChange(val) {
      this.tableData.currentIndex = val;
      this.getAllUser();
    },
    update() {
      this.data = service.copy(this.updateData)
      this.dialogFormVisible = true;
    },
    add() {
      this.data = {
        account: '',
        password: '',
        date: '',
        address: ''
      }
      this.dialogFormVisible = true;
    },
    rowClick(row) {
      this.updateData = row
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
