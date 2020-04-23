<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.workOrderNumber" placeholder="工单单号"></el-input>
      <el-input class="filter-item" v-model="filter.deliveryOrderNumber" placeholder="出货单号"></el-input>
      <el-button class="green-btn" type="primary" @click="getWorkOrderList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button class="orange-btn" @click="openUploadDialog" type="primary">
        <i class="el-icon-upload m-r-4"></i>
        导入
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="workOrderList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="workOrderNumber" label="工单单号" align="center"></el-table-column>
      <el-table-column prop="deliveryOrderNumber" label="出货单号" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>
      <el-table-column prop="distribution" label="分配状态" align="center"></el-table-column>
      <el-table-column width="140" align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="line-type orange-btn" @click="toDetailsPage(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getWorkOrderList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getWorkOrderList"
      :current-page.sync="filter.page"
    ></el-pagination>
    <upload-dialog ref="uploadDialog"></upload-dialog>
  </div>
</template>
<script>
import UploadDialog from './components/Upload'

import { getOrderList } from '@/api/order'
export default {
  name: 'WorkOrderList',
  components: {
    UploadDialog
  },
  data() {
    return {
      listLoading: false,
      filter: {
        workOrderNumber: '',
        deliveryOrderNumber: '',
        page: 1,
        pageSize: 20
      },
      workOrderList: [],
      total: 3
    }
  },
  created() {
  },
  methods: {
    /* 工单列表 */
    getWorkOrderList() {
      getOrderList(this.filter).then(res => {
        console.log(res, '订单列表获取的结果！！！！')
      })
    },
    openUploadDialog() {
      this.$refs.uploadDialog.dialogVisible = true
      console.log('打开弹窗')
    },
    /* 跳转详情页 */
    toDetailsPage(id) {
      // console.log(this.$router, '路由！！！！')
      this.$router.push(`./details/${id}`)
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.tbody .el-table__row{
  cursor: pointer !important;
}
</style>
