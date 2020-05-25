<template>
   
  <div class="sideBar">
    <transition name="slide-fade">
     <!-- 这里侧栏代码部分 -->
      <div class="side-content" v-if="isShow">
        <div class="header">
           <div class="title">{{$t('workList.filter')}}</div>
           <el-button class="btn-close" type="text" icon="el-icon-close" @click="hideSide"></el-button>
        </div>
        <hr>
        <el-form ref="dataForm" :model="temp" label-position="top" label-width="70px">
          <el-form-item :label="$t('workList.productModel')" prop="machineType">
            <el-input class="filter-item" v-model.trim="temp.machineType" clearable/>
          </el-form-item>
          <el-form-item :label="$t('workList.status')" prop="status">
            <el-checkbox-group v-model="temp.status">
              <el-checkbox v-for="(item, index) in statusOptions" :label="item" :key="index">{{$t('workStatus['+ item +']')}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :label="$t('workList.createTime')" prop="createTime">
            <el-date-picker
              v-model="temp.createdTimeFrom"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            至
            <el-date-picker
              v-model="temp.createdTimeTo"
              type="datetime"
              style="margin-top: 10px;"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('workList.contact')" prop="contact">
            <el-input class="filter-item" v-model.trim="temp.contact" clearable/>
          </el-form-item>
          <el-form-item :label="$t('workList.telephone')" prop="telephone">
            <el-input class="filter-item" v-model.trim="temp.telephone" clearable/>
          </el-form-item>
          <el-form-item :label="$t('workList.expressNum')" prop="expressNum">
            <el-input class="filter-item" v-model.trim="temp.expressNum" clearable/>
          </el-form-item>
        </el-form>
      </div>       
       
    </transition>
     
  </div>
</template>

<script>
  import { fetchStatusList } from '@/api/order';

  export default {
    props: ['isShow', 'sideBarData'],
    data() {
      return {
        calendarTypeOptions: [{type: 'N3', num: 1}, {type: 'N5', num: 2}],
        temp: {
          machineType: null,
          status: [],
          createdTimeFrom: null,
          createdTimeTo: null,
          contact: null,
          telephone: null,
          expressNum: null
        },
      }
    },
    computed: {
      statusOptions() {
        let statusOptions = [];
        let resultObj = this.sideBarData;
        for(let key in resultObj){
          if (resultObj.hasOwnProperty(key) === true){     //只遍历对象自身的属性，而不包含继承于原型链上的属性。
            statusOptions.push(key);
          }
        }
        return statusOptions;
      }
    },
    methods: {
      hideSide: function () {
        this.$emit('hideSide');
      }
    },
    watch: {
      temp: {   //深度监听，可监听到对象、数组的变化
        handler: function (newVal) {
          this.$emit('filterData', newVal);
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .side-content{
    width: 25%;
    min-width: 285px;
    max-height: calc(100vh - 84px);
    overflow-y: scroll;
    background-color: #f9fafc;
    border: 1px solid #d8dce5;
    position:fixed;
    right: 0;
    bottom: 0;
    z-index: 2001;
    padding-left: 15px;
    padding-right: 15px;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(285px);
    opacity: 0;
  }
  .header {
    position: relative;
    .title {
      color: #172B4D;
      font-size: 24px;
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .btn-close {
      width: 50px;
      font-size: 30px;
      color: #99a9bf;
      position: absolute;
      top: -14px;
      right: -15px;
    }
  }
  hr {
    margin-bottom: 20px;
  }
  .el-select {
    display: block;
  }
  .el-checkbox {
    width: 50%;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>
