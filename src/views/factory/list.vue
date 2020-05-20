<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.factoryName" placeholder="工厂名称" clearable></el-input>
      <el-input class="filter-item" v-model="filter.customerName" placeholder="线别" clearable></el-input>
      <el-button class="purple-btn" type="primary" @click="getFactoryList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button v-if="$checkBtnPermission('factory.add')" class="blue-btn" type="primary" @click="openDialog">
        <i class="el-icon-plus m-r-4"></i>新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="factoryList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="factoryName" label="工厂名称" align="center"></el-table-column>
      <el-table-column prop="customerName" label="线别" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getFactoryList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getFactoryList"
      :current-page.sync="filter.page"
    ></el-pagination>
    <factory-dialog ref="factoryDialog" @refresh="getFactoryList"></factory-dialog>
  </div>
</template>
<script>
import { getFactoryList } from '@/api/factory'
import FactoryDialog from './components/Dialog'

export default {
  name: 'factoryList',
  components: {
    FactoryDialog
  },
  data() {
    return {
      listLoading: false,
      filter: {
        factoryName: '',
        customerName: '',
        page: 1,
        pageSize: 20
      },
      factoryList: [],
      total: 0
    }
  },
  created() {
    this.getFactoryList()
  },
  methods: {
    /* 工单列表 */
    getFactoryList() {
      this.listLoading = true
      getFactoryList(this.filter).then(res => {
        const resData = res.data.data
        this.factoryList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err, '工厂列表')
      })
    },
    openUploadDialog() {
      this.$refs.uploadDialog.dialogVisible = true
      // console.log('打开弹窗')
    },
    /* 跳转详情页 */
    toDetailsPage(id) {
      // console.log(this.$router, '路由！！！！')
      this.$router.push(`./details/${id}`)
    },
    openDialog() {
      const factoryDialog = this.$refs.factoryDialog
      factoryDialog.dialogVisible = true
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
