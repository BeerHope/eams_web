<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.workOrderId" placeholder="机身号" clearable></el-input>
      <el-select class="filter-item" v-model="filter.state" placeholder="状态" clearable>
        <el-option 
          v-for="item in bindStates" :key="item.value" 
          :value="item.value" :label="item.label">
        </el-option>
      </el-select>
      <el-button class="green-btn" type="primary" @click="getRecordList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="recordList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="sn" label="机身号" align="center"></el-table-column>
      <el-table-column prop="accountId" label="账号ID" align="center"></el-table-column>
      <el-table-column prop="mac" label="MAC" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope"><span>{{scope.row.state|filterState(bindStates)}}</span></template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="log" label="日志" align="center"></el-table-column>
      <!-- <el-table-column width="140" align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="line-type green-btn" @click="openEditDialog">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getRecordList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getRecordList"
      :current-page.sync="filter.page"
    ></el-pagination>
  </div>
</template>

<script>
import { bindStates } from '@/dictionary'
import { filterState } from '@/filters'

export default {
  name: 'WorkOrderList',
  components: {
  },
  filters: {
    filterState
  },
  data() {
    return {
      listLoading: false,
      filter: {
        sn: '',
        state: null,
        page: 1,
        pageSize: 20
      },
      bindStates,
      recordList: [
        {
          id: 1,
          sn: '123243411432',
          log: 'log记录loglogloglolg',
          state: 1,
          mac: '4ffdsfdsfrewrew43243243',
          accountId: 'account111',
          createdTime: '2020-04-12 10:20:12'
        },
        {
          id: 2,
          sn: '123243411232',
          log: 'log记录loglogloglol3232',
          state: 1,
          mac: '4ffdsfdsfrewrew43243243',
          accountId: 'account111',
          createdTime: '2020-04-12 10:20:12'
        }
      ],
      total: 3
    }
  },
  created() {
  },
  methods: {
    /* 工单列表 */
    getRecordList() {
      console.log('get work order list!!!')
    },
    openEditDialog() {
      this.$refs.uploadDialog.dialogVisible = true
      console.log('打开弹窗')
    },
    /* 跳转详情页 */
    toDetailsPage(id) {
      // console.log(this.$router, '路由！！！！')
      console.log(id, 'id!!!!!!!!')
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
