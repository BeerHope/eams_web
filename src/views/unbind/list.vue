<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.sn" placeholder="机身号" clearable></el-input>
      <el-button class="purple-btn" type="primary" @click="getUnbindDeviceList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="unbindDeviceList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="sn" label="机身号" align="center"></el-table-column>
      <el-table-column prop="username" label="解绑人" align="center"></el-table-column>
      <el-table-column prop="unbindTime" label="解绑时间" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getUnbindDeviceList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getUnbindDeviceList"
      :current-page.sync="filter.page"
    ></el-pagination>
  </div>
</template>

<script>
// import { bindStates } from '@/dictionary'
import { filterState } from '@/filters'
import { getUnbindDeviceList } from '@/api/unbind'

export default {
  name: 'UnbindDeviceList',
  components: {
  },
  filters: {},
  data() {
    return {
      listLoading: false,
      filter: {
        sn: '',
        page: 1,
        pageSize: 20
      },
      unbindDeviceList: [],
      total: 0
    }
  },
  created() {
    this.getUnbindDeviceList()
  },
  methods: {
    /* 工单列表 */
    getUnbindDeviceList() {
      this.listLoading = true
      getUnbindDeviceList(this.filter).then(res => {
        const resData = res.data.data
        this.unbindDeviceList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err, '解绑记录列表')
      })
    
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
