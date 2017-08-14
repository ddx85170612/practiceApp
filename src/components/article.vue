<template>
  <div class="article">
    <div class="article-head">
      <div class="text-right ">
        <button class="btn btn-default btn-sm" @click="getArticle()">
          <i class="icon-search"></i>搜索</button>
        <button class="btn btn-default btn-sm" @click="dialogFormVisible=true">
          <i class="icon-plus"></i>新增</button>
        <button class="btn btn-default btn-sm">
          <i class="icon-edit"></i>修改</button>
      </div>
      <!-- <div class="inputForm"> -->
      <el-form ref="form" :model="params" label-width="80px" style="height:80px">
        <el-form-item label="标题:" class="col-md-3">
          <el-input v-model="params.title"></el-input>
        </el-form-item>
        <el-form-item label="名字:" class="col-md-3">
          <el-input v-model="params.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- </div> -->
    </div>
  
    <div class="data-table">
      <el-table :data="tableData.data" style="width: 100%" highlight-current-row class="text-center">
  
        <el-table-column prop="title"  label="标题" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名字" width="180">
        </el-table-column>
        <el-table-column prop="abstract" label="内容" >
        </el-table-column>
      </el-table>
      <div class="block text-right ">
        <el-pagination @current-change="handleCurrentChange" :current-page="tableData.currentIndex" :page-size="tableData.size" layout="total, prev, pager, next, jumper" :total="tableData.count">
        </el-pagination>
      </div>
    </div>
  
    <el-dialog title="用户" :visible.sync="dialogFormVisible">
      <el-form :model="data">
        <el-form-item class="col-md-6" label="标题" :label-width="formLabelWidth">
          <el-input v-model="data.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="data.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" class="col-md-6" :label-width="formLabelWidth">
          <el-input v-model="data.abstract" auto-complete="off"></el-input>
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
        title: '',
        name: '',
        abstract: '',
      },
      data: {
        title: '',
        name: '',
        abstract: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: {},
      currentPage: 1
    }
  },
  created() {
    this.getArticle();
  },
  methods: {


    handleCurrentChange(val) {
      this.tableData.currentIndex = val;
      this.getArticle();
    },
    setArticle() {
      service.getData('setCrawler', this.cb, '')
    },
    cb(res) {
      console.log(res);
    },
    getArticle() {
      service.getData('getArticle', this.cb1, this.params, this.tableData.currentIndex ? this.tableData.currentIndex : 1, 8)
    },
    cb1(res) {
      this.tableData = res;

    },
  }
}
</script>
<style lang="less" >
.article {
  height: 100%;
  overflow: auto;
  padding: 10px;
  .article-head {
    height: auto;
  }
}
</style>
