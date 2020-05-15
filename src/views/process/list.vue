<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <!-- <el-input class="filter-item" v-model="filter.kmsCustomerCode" placeholder="KMS编码" clearable></el-input> -->
      <el-input class="filter-item" v-model="filter.processIdentity" placeholder="标识" clearable></el-input>
      <el-button class="green-btn" type="primary" @click="getProcessList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button class="orange-btn" type="primary" @click="openAddDialog">
        <i class="el-icon-plus m-r-4"></i>新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="processList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="processIdentity" label="标识" align="center"></el-table-column>
      <el-table-column prop="kmsCustomerCode" label="KMS编码" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteProcess(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getProcessList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getProcessList"
      :current-page.sync="filter.page"
    ></el-pagination>
    <add-process ref="addProcess" @refresh="getProcessList"></add-process>
  </div>
</template>

<script>
import { getProcessList, deleteProcess } from '@/api/process'
import addProcess from './components/Dialog'

export default {
  name: '',
  components: {
    addProcess
  },
  props: {},
  directive: {},
  data() {
    return {
      listLoading: false,
      filter: {
        processIdentity: '', // 标识
        page: 1,
        pageSize: 20
      },
      processList: [],
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getProcessList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    openAddDialog() {
      const processDialog = this.$refs.addProcess
      processDialog.dialogVisible = true
    },
    getProcessList() {
      this.listLoading = true
      getProcessList(this.filter).then(res => {
        const resData = res.data.data
        this.processList = resData.rows
        // this.total = resData.totalRecord
        this.total = this.processList.length
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    deleteProcess(id) {
      this.$confirm('此操作将删除当前标识记录,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProcess({id}).then(res => {
          this.$message.success('删除标识成功')
          this.getProcessList()
        })
      }).catch(() => {
        console.log('取消删除')
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
