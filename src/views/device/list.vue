<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.sn" placeholder="机身号" clearable></el-input>
      <el-input class="filter-item" @blur="getDeviceList" @clear="getDeviceList" v-model="filter.orderId" placeholder="生产订单号" clearable></el-input>
      <el-select class="filter-item" v-model="filter.state" placeholder="状态" clearable>
        <el-option 
          v-for="item in bindStates" :key="item.value" 
          :value="item.value" :label="item.label">
        </el-option>
      </el-select>
      <el-button class="purple-btn" type="primary" @click="getDeviceList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button v-if="$checkBtnPermission('device.batchUnbind')" :disabled="!isAllowBatchUnbind" class="purple-btn" type="primary" @click="batchUnbindDevice">
        <svg-icon icon-class="unbind-icon" class="m-r-4"></svg-icon>批量解绑
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="deviceList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="sn" label="机身号" align="center"></el-table-column>
      <el-table-column prop="orderId" label="生产订单号" align="center"></el-table-column>
      <el-table-column prop="tusn" label="Tusn" align="center"></el-table-column>
      <el-table-column prop="mac" label="工位MAC" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope"><span>{{scope.row.state|filterState(bindStates)}}</span></template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" width="150"></el-table-column>
      <el-table-column label="操作" align="center">
        <!-- 限制重复解绑点击 -->
        <template slot-scope="scope">
          <el-button v-if="$checkBtnPermission('device.unbind')" type="primary" size="mini" :disabled="scope.row.state==2" class="purple-btn" @click="unbindDevice(scope.row)">解绑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getDeviceList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getDeviceList"
      :current-page.sync="filter.page"
    ></el-pagination>
  </div>
</template>
<script>
import { bindStates } from '@/utils/dictionary'
import { filterState } from '@/filters'
import { getDeviceList, unbindDevice, batchUnbindDevice } from '@/api/device'

export default {
  name: 'DeviceList',
  components: {},
  filters: {
    filterState
  },
  data() {
    return {
      listLoading: false,
      filter: {
        sn: '',
        orderId: '',
        state: '',
        page: 1,
        pageSize: 20
      },
      bindStates,
      deviceList: [],
      total: 0,
      isAllowBatchUnbind: false, // 是否允许批量解绑
    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {
    getDeviceList() {
      this.listLoading = true
      getDeviceList(this.filter).then(res => {
        const resData = res.data.data
        this.deviceList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
        /* 放开解绑操作的条件: 
          1.输入了生产订单号搜索, 
          2.搜索结果中存在绑定状态的设备
        */
        this.isAllowBatchUnbind = this.filter.orderId && _.find(this.deviceList, {state: 1});
      }).catch(err => {
        console.log('捕获异常:', err)
        this.listLoading= false
      })
    },
    unbindDevice({sn, state}) {
      this.$confirm(`此操作将解绑设备(${sn})，是否继续?`, '提示', {
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        unbindDevice({sn}).then(res => {
          this.$message.success('设备解绑成功！')
          this.getDeviceList()
        })
      }).catch(() => {
        console.log('取消解绑')        
      })
    },
    /* 根据生产订单号一键解绑 */
    batchUnbindDevice() {
      this.$confirm(`此操作将批量解绑生产订单号(${this.filter.orderId})的所有设备，是否继续?`, '提示', {
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { orderId } = this.filter
        batchUnbindDevice({orderId}).then((res) => {
          this.getDeviceList()
          this.$message.success('批量解绑成功')
        })
      }).catch(() => {
        console.log('取消解绑')
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
