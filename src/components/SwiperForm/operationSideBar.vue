<template>
   
  <div class="sideBar">
    <transition name="slide-fade">
         <!-- 这里才是侧栏代码部分 -->
      <div class="side-content" v-if="isShow">
        <div class="header">
          <div class="title">业务筛选</div>
          <el-button class="btn-close" type="text" icon="el-icon-close" @click="hideSide"></el-button>
        </div>
        <hr>
        <el-button class="clearRight" @click="clearFilter">清空筛选</el-button>

        <el-form ref="dataForm" :model="temp" label-position="top" label-width="70px">
          <el-form-item label="服务类型">
            <el-select v-model="temp.serviceType" placeholder="请选择" >
              <el-option
                v-for="item in serviceType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优先级">
            <el-select v-model="temp.priority" placeholder="请选择">
              <el-option
                v-for="item in priority"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="来电区域"  prop="contact3">

                <el-input v-model.trim="temp.phoneRegion" />

          </el-form-item>




          <el-form-item label="客服人员">
            <el-select v-model="temp.createdBy" placeholder="请选择">
              <el-option
                v-for="item in CustomerList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item  label="来电时间"  prop="createTime">
            <el-date-picker
              v-model="temp.phoneTimeStart"
              type="datetime"
              style=" width: 180px;"
              placeholder="选择开始时间">
            </el-date-picker>
            至
            <el-date-picker
              v-model="temp.phoneTimeEnd"
              type="datetime"
              style="margin-top: 10px; width: 180px;"
              placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item  label="录入时间"  prop="contact1">
          <el-date-picker
            v-model="temp.createdTimeStart"
            type="datetime"
            style=" width: 180px;"
            placeholder="选择开始时间">
          </el-date-picker>
          至
          <el-date-picker
            v-model="temp.createdTimeEnd"
            type="datetime"
            style="margin-top: 10px; width: 180px;"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>

          <el-form-item  label="最后修改时间"  prop="contact1">

            <el-date-picker
              v-model="temp.lastUpdatedTimeStart"
              type="datetime"
              style=" width: 180px;"
              placeholder="选择开始时间">
            </el-date-picker>
            至
            <el-date-picker
              v-model="temp.lastUpdatedTimeEnd"
              type="datetime"
              style="margin-top: 10px; width: 180px;"
              placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>


        </el-form>
      </div>       
       
    </transition>
     
  </div>
</template>

<script>
  import { fetchStatusList } from '@/api/order'
  import axios from 'axios';

  export default {
    props: ['isShow', 'sideBarData','axios','serviceType','serviceTypeId','priority','CustomerList'],
    data() {
      // console.log("aaaaaa"+CustomerList);

      return {
        mapJson:'../static/json/map.json',
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city:'',
        block:'',
        calendarTypeOptions: [{type: 'N3', num: 1}, {type: 'N5', num: 2}],
        temp: {
          serviceType: null,
          phoneRegion:null,
          createdBy: null,
          phoneTimeEnd: null,
          phoneTimeStart: null,
          createdTimeStart: null,
          createdTimeEnd: null,
          lastUpdatedTimeStart:null,
          lastUpdatedTimeEnd:null,
          priority:null
        },
        value1: '',
        value2: '',
        value3: '',
        value4:''
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
      },
      //清空筛选记录
      clearFilter:function(){
        this.temp= {
          serviceType: null,
            phoneRegion:null,
            createdBy: null,
            phoneTimeEnd: null,
            phoneTimeStart: null,
            createdTimeStart: null,
            createdTimeEnd: null,
            lastUpdatedTimeStart:null,
            lastUpdatedTimeEnd:null,
            priority:null
           }


      },
      // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                // that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            // for(var item1 in that.city) {
            //   for(var item2 in that.block) {
            //     if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
            //       that.city[item1].children.push(that.block[item2])
            //     }
            //   }
            // }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            // this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            // this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      }
    },
    created:function(){
      this.getCityData();
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
    width: 30%;
    min-width: 320px;
    max-height: calc(100vh - 84px);
    overflow-y: scroll;
    background-color: #f9fafc;
    border: 1px solid #d8dce5;
    position:fixed;
    right: 0;
    top:83px;
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
      color: #606266;
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
  .clearRight{ float: right;}
</style>
