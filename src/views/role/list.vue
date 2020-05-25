<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input v-model="filter.name" class="filter-item" placeholder="角色名称" clearable></el-input>
      <el-select v-model="filter.type" class="filter-item" placeholder="角色类型" clearable>
        <el-option label="全部类型" value=""></el-option>
        <el-option 
          v-for="item in roleTypes" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="filter.state" class="filter-item" placeholder="状态" clearable>
        <el-option label="全部状态" value=''></el-option>
        <el-option 
          v-for="item in roleStates" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="purple-btn" icon="el-icon-search" @click="getRoleList">搜索</el-button>
      <el-button v-if="$checkBtnPermission('role.add')"  type="primary" class="blue-btn" icon="el-icon-plus"  @click="openDialog(true, -1)">新增</el-button>
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
      <el-table-column prop="type" label="角色类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.type | filterState(roleTypes)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state | filterState(roleStates)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button 
            v-if="$checkBtnPermission('role.update')" 
            type="primary" class="purple-btn" size="mini"
             @click="openDialog(true, scope.row.id)" >
             编辑
          </el-button>
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
  import { roleStates, roleTypes } from '@/utils/dictionary'
  import { filterState } from '@/filters'
  import roleDialog from './components/Dialog'
  import { getRoleList } from '@/api/role'
  import { mapGetters } from 'vuex'
  export default {
    name: 'RoleList',
    components:{
      roleDialog
    },
    filter: {
      filterState
    },
    data() {
      return {
        cause:{},
        Details:{},
        listLoading:true,
        totalRecord:1,
        filter:{
          name:'',
          type:'',
          state: '',
          page: 1,
          pageSize: 20
        },
        total: 0,
        list:[],
        roleStates,
        roleTypes
      }
    },
    filters: {},
    computed: {},
    created(){
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
      openDialog(dialogVisible, roleId) {
        const roleDialog = this.$refs.roleDialog
        _.assign(roleDialog, {
          dialogVisible,
          roleId
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
