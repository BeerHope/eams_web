<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.sn" placeholder="机身号" clearable></el-input>
      <!-- add 2020-05-20 -->
      <el-input class="filter-item" v-model="filter.orderId" placeholder="生产订单号" clearable></el-input>
      <el-select class="filter-item" v-model="filter.type" placeholder="状态" clearable>
        <el-option 
          v-for="item in logStates" :key="item.value" 
          :value="item.value" :label="item.label">
        </el-option>
      </el-select>
      <el-button class="purple-btn" type="primary" @click="getLogList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="logList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="sn" label="机身号" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="orderId" label="生产订单号" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="mac" label="工位MAC" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="type" label="状态" min-width="60px" align="center">
        <template slot-scope="scope"><span>{{scope.row.type|filterState(logStates)}}</span></template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="150"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="$checkBtnPermission('log.details')"
            type="primary" size="mini" class="orange-btn" 
            @click="toDetailsPage(scope.row.id)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getLogList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getLogList"
      :current-page.sync="filter.page"
    ></el-pagination>
  </div>
</template>

<script>
import { logStates } from '@/utils/dictionary'
import { filterState } from '@/filters'
import { getLogList } from '@/api/log'

export default {
  name: 'LogList',
  components: {},
  filters: {
    filterState
  },
  data() {
    return {
      listLoading: false,
      filter: {
        sn: '',
        orderId: '', //
        type: '',
        page: 1,
        pageSize: 20
      },
      logStates,
      logList: [],
      total: 0
    }
  },
  created() {
    this.getLogList()
  },
  methods: {
    /* 工单列表 */
    getLogList() {
      this.listLoading = true
      getLogList(this.filter).then(res => {
        const resData = res.data.data
        this.logList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    openEditDialog() {
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
