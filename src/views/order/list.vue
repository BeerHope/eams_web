<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.workOrderNumber" placeholder="生产订单号" clearable></el-input>
      <el-input class="filter-item" v-model="filter.deliveryOrderNumber" placeholder="K/3单据编号" clearable></el-input>
      <el-select  class="filter-item" v-model="filter.orderState" placeholder="订单状态" clearable>
        <el-option 
          v-for="item in orderStates" 
          :key="item.value" 
          :value="item.value" 
          :label="item.label">
        </el-option>
      </el-select>
      <el-button class="purple-btn" type="primary" @click="getOrderList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button v-if="$checkBtnPermission('order.import')" class="blue-btn" @click="openOrderUpload" type="primary">
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
          <!-- filterIcon(scope.row.orderState) -->
          <div class="order-state">
            <svg-icon :class="['order-icon', {'invalid': scope.row.orderState === 0}]" :icon-class="filterIcon(scope.row.orderState)"></svg-icon>
            <span>{{scope.row.orderState | filterState(orderStates)}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="400" align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button v-if="$checkBtnPermission('order.program')" :disabled="scope.row.orderState === 4" type="primary" size="mini" class="purple-btn" @click="openIniUpload(scope.row.id)">上传ini文件</el-button>
           <el-button v-if="$checkBtnPermission('order.export')" :disabled="scope.row.orderState === 4" type="primary" size="mini" class="blue-btn" @click="exportOrder(scope.row)">导出</el-button>
          <el-button v-if="$checkBtnPermission('order.details')" :disabled="scope.row.orderState === 4" type="primary" size="mini" class="orange-btn" @click="toDetailsPage(scope.row.id)">详情</el-button>
          <!-- 屏蔽废弃功能 -->
          <!-- <el-button v-if="$checkBtnPermission('order.abandon')" :disabled="scope.row.orderState === 4" type="danger" size="mini" @click="abandonOrder(scope.row.id)">废弃</el-button> -->
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
import { getOrderList, register21Key, abandonOrder, exportOrder } from '@/api/order'
export default {
  name: 'WorkOrderList',
  components: {
    OrderUpload,
    IniUpload
  },
  filters: {
    filterState
  },
  data() {
    return {
      listLoading: false,
      orderStates,
      filter: {
        workOrderNumber: '',
        deliveryOrderNumber: '',
        orderState: '',
        pageNum: 1,
        pageSize: 20
      },
      orderList: [],
      total: 0,
      orderIcons: [
        {
          state: 0,
          icon: 'order-invalid'
        },
        {
          state: 1,
          icon: 'order-not-begin'
        },
        {
          state: 2,
          icon: 'order-ongoing'
        },
        {
          state: 3,
          icon: 'order-accomplished'
        },
        {
          state: 4,
          icon: 'order-abandoned'
        }
      ]
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
    },
    filterIcon(orderState) {
      return _.find(this.orderIcons, {state: orderState}).icon
    },
    /* 废弃订单 */
    abandonOrder(id) {
      this.$confirm('此操作将废弃当前订单，是否继续?', '提示', {
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        abandonOrder({id}).then(res => {
          this.getOrderList()
          this.$message.success('废弃订单成功')
        })
      }).catch(() => {
        console.log('取消废弃订单')
      })
    },
    /*
      订单导出操作
      内容为pc上送上来的sn/iccid/imei对应关系 
    */
    exportOrder({id, workOrderNumber}) {
        exportOrder(id).then(res => {
          const blob = new Blob([res.data])
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${workOrderNumber}.xlsx`
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          link.remove();
      }).catch(err => {
        console.log('export failed:', err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.order-icon{
  font-size: 16px;
  margin-right: 4px;
  &.invalid{
    font-size: 17px;
  }
}
.order-state{
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
