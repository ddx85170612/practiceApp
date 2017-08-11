<template>
  <div class="user">
    <form class="user-head">
      <div class="text-right ">
        <button class="btn btn-default btn-sm">
          <i class="icon-search"></i>搜索</button>
        <button class="btn btn-default btn-sm">
          <i class="icon-plus"></i>新增</button>
        <button class="btn btn-default btn-sm">
          <i class="icon-edit"></i>修改</button>
      </div>
      <div class="">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名:" class="col-md-3">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码:" class="col-md-3">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </form>
  
    <div class="data-table">
      <el-table :data="tableData" style="width: 100%" highlight-current-row class="text-center">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
