<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-select class="filter-item" v-model="filter.factoryId" placeholder="工厂名称" clearable>
        <el-option v-for="item in factoryList" :key="item.value" :value="item.value" :label="item.label"></el-option>
      </el-select>
      <el-input class="filter-item" v-model="filter.ip" placeholder="工位IP" clearable></el-input>
      <el-button class="purple-btn" type="primary" @click="getWhitelistList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button v-if="$checkBtnPermission('whitelist.add')" class="blue-btn" type="primary" @click="openDialog">
        <i class="el-icon-plus m-r-4"></i>新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="whitelistList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="factoryId" label="工厂名称" align="center">
        <template slot-scope="scope">
          <span>{{filterFactory(scope.row.factoryId)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="工位IP" align="center"></el-table-column>
      <el-table-column prop="mac" label="工位MAC" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="$checkBtnPermission('whitelist.delete')" type="danger" size="mini" @click="deleteWhitelist(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getWhitelistList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getWhitelistList"
      :current-page.sync="filter.page"
    ></el-pagination>
    <add-whitelist ref="addWhiltelist" @refresh="getWhitelistList" :factory-list="factoryList"></add-whitelist>
  </div>
</template>
<script>
import AddWhitelist from './components/Dialog'
import { getAllFactory } from '@/api/factory'
import { getWhitelistList, deleteWhitelist } from '@/api/whitelist'
export default {
  name: 'factoryList',
  components: {
    AddWhitelist
  },
  data() {
    return {
      listLoading: false,
      filter: {
        factoryId: '',
        ip: '',
        page: 1,
        pageSize: 20
      },
      whitelistList: [],
      factoryList: [],
      total: 0
    }
  },
  created() {
    this.getFactoryList()
    this.getWhitelistList()
  },
  methods: {
    /* 工厂下拉列表 */
    getFactoryList() {
      getAllFactory().then(res => {
        this.factoryList = res.data ? res.data.data : []
      }).catch(err => {
        console.log(err, 'err!!!')
      })
    },
    getWhitelistList() {
      this.listLoading = true
      getWhitelistList(this.filter).then(res => {
        const resData = res.data.data
        this.whitelistList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
      }).catch(err => {
        console.log('白名单列表报错:', err)
        this.listLoading = false
      })
    },
    deleteWhitelist(id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWhitelist({id}).then(res => {
            this.$message.success('删除成功')
            this.getWhitelistList()
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        });
     
    },
    filterFactory(factoryId) {
      const factory = _.find(this.factoryList, {
        value: factoryId
      })
      return factory && factory.label || ''
    },
    openDialog() {
      const addWhiltelist = this.$refs.addWhiltelist
      addWhiltelist.dialogVisible = true
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
