<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.workOrderNumber" placeholder="工单单号" clearable></el-input>
      <el-input class="filter-item" v-model="filter.deliveryOrderNumber" placeholder="出货单号" clearable></el-input>
      <el-button class="green-btn" type="primary" @click="getOrderList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button class="orange-btn" @click="openUploadDialog" type="primary">
        <i class="el-icon-upload m-r-4"></i>
        导入
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="orderList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="workOrderNumber" label="工单单号" align="center"></el-table-column>
      <el-table-column prop="deliveryOrderNumber" label="出货单号" align="center"></el-table-column>
      <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.orderState | filterState(orderStates)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="orange-btn" @click="toDetailsPage(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getOrderList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      :current-page.sync="filter.pageNum"
      @current-change="getOrderList"
    ></el-pagination>
    <upload-dialog ref="uploadDialog" @refresh="getOrderList"></upload-dialog>
  </div>
</template>
<script>
/**
 * 订单列表报系统异常
 */
import UploadDialog from './components/Upload'
import { orderStates } from '@/utils/dictionary'
import { filterState } from '@/filters'
import { getOrderList } from '@/api/order'
export default {
  name: 'WorkOrderList',
  components: {
    UploadDialog
  },
  filters: {
    filterState,
  },
  data() {
    return {
      listLoading: false,
      orderStates,
      filter: {
        workOrderNumber: '',
        deliveryOrderNumber: '',
        pageNum: 1,
        pageSize: 20
      },
      orderList: [],
      total: 3
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    /* 工单列表 */
    getOrderList() {
      this.listLoading = true
      getOrderList(this.filter).then(res => {
        const resData = res.data.data
        this.orderList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
      })
    },
    openUploadDialog() {
      this.$refs.uploadDialog.dialogVisible = true
    },
    /* 跳转详情页 */
    toDetailsPage(id) {
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
