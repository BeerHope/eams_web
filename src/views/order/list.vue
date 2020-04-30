<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.workOrderNumber" placeholder="生产订单号" clearable></el-input>
      <el-input class="filter-item" v-model="filter.deliveryOrderNumber" placeholder="K/3单据编号" clearable></el-input>
      <el-button class="green-btn" type="primary" @click="getOrderList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button class="orange-btn" @click="openOrderUpload" type="primary">
        <i class="el-icon-upload m-r-4"></i>
        导入
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="orderList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="workOrderNumber" label="生产订单号" align="center"></el-table-column>
      <el-table-column prop="deliveryOrderNumber" label="K/3单据编号" align="center"></el-table-column>
      <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.orderState | filterState(orderStates)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="320" align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="green-btn" @click="openIniUpload(scope.row.id)">上传ini文件</el-button>
          <el-button :disabled="scope.row.keyGenerate === 1" type="primary" size="mini" class="green-btn" @click="registerKey(scope.row.id)">注册密钥</el-button>
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
    <order-upload ref="uploadDialog" @refresh="getOrderList"></order-upload>
    <ini-upload ref="iniUpload" @refresh="getOrderList"></ini-upload>
  </div>
</template>
<script>
/**
 * 订单列表报系统异常
 */
import OrderUpload from './components/OrderUpload'
import IniUpload from './components/IniUpload'
import { orderStates } from '@/utils/dictionary'
import { filterState } from '@/filters'
import { getOrderList, register21Key } from '@/api/order'
export default {
  name: 'WorkOrderList',
  components: {
    OrderUpload,
    IniUpload
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
  computed: {
    route() {
      return this.$route.path
    }
  },
  watch: {
    route(to, from) {
      console.log(from, 'form!!!!')
    }
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
      }).catch(err => {
        console.log(err, '订单列表')
        this.listLoading = false
      })
    },
    openOrderUpload() {
      this.$refs.uploadDialog.dialogVisible = true
    },
    openIniUpload(orderId) {
      // console.log(orderId, 'orderId!!!!!')
      const iniUpload = this.$refs.iniUpload
       _.assign(iniUpload, {
        dialogVisible: true,
        orderId
      })
    },
    /* 跳转详情页 */
    toDetailsPage(id) {
      this.$router.push(`./details/${id}`)
    },
    /* 注册密钥 */
    registerKey(orderId) {
      register21Key(orderId).then(res => {
        this.$message.success('注册密钥成功！')
        this.getOrderList()
      })
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
