<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-select v-model="filter.state" class="filter-item" placeholder="工厂" clearable>
        <el-option 
          v-for="item in factoryList" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="filter.name" class="filter-item" placeholder="角色名称" clearable></el-input>
      <el-select v-model="filter.state" class="filter-item" placeholder="状态" clearable>
        <el-option 
          v-for="item in roleStates" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="green-btn" icon="el-icon-search" @click="getRoleList">搜索</el-button>
      <el-button type="primary" class="orange-btn" icon="el-icon-plus"  @click="openDialog(true, 0)">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :header-cell-style="getRowClass"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state === 1 ? '启用': '禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="primary" class="orange-btn" @click="details(scope.row)" size="mini">详情</el-button> -->
          <el-button type="primary" class="green-btn" @click="openDialog(scope.row)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!---分页--->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getRoleList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getRoleList"
      :current-page.sync="filter.page"
    ></el-pagination>
    <role-dialog ref="roleDialog" @refresh="getRoleList"></role-dialog>
  </div>
</template>
<script>
  import roleDialog from './components/Dialog'
  import { getRoleList } from '@/api/role'
  import { getAllFactory } from '@/api/factory'
  import { mapGetters } from 'vuex'
  export default {
    name: 'report',
    components:{
      roleDialog
    },
    data() {
      return {
        cause:{},
        Details:{},
        listLoading:true,
        totalRecord:1,
        filter:{
          name:'',
          factoryId:'',
          state: '',
          page: 1,
          pageSize: 20
        },
        total: 0,
        list:[],
        roleStates: [
          {
            value: '',
            label: '全部状态'
          }, {
            value: 1,
            label: '启用'
          }, {
            value: 2,
            label: '禁用'
          }
        ],
        factoryList: []
      }
    },
    filters: {},
    computed: {},
    created(){
      this.getAllFactory()
      this.getRoleList();
      
    },
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#EFEFEF'
        } else {
          return ''
        }
      },
      getRoleList(){
        this.listLoading = true
        getRoleList(this.filter).then(res=>{
          const resData = res.data.data
          this.list = resData.rows
          this.total = resData.totalRecord
          this.listLoading = false
        }).catch(err => {
          console.log(err, '角色列表')
          this.listLoading = false
        })
      },
      getAllFactory() {
        getAllFactory().then(res => {
          this.factoryList = res.data.data
        })
      },
      openDialog(dialogVisible, flagId) {
        const roleDialog = this.$refs.roleDialog
        _.assign(roleDialog, {
          dialogVisible,
          flagId
        })
      },
      details(row){
        this.$refs.Details.dialogDetails=true;
        getUserDetails(row.id).then(response=>{
          this.Details=response.data.data;
        })
      }
    }
  }
</script>
