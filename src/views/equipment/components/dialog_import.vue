<template>
  <div>
    <el-dialog :title="type==1?'设备注册':'设备注销'" :visible.sync="dialogImport">
      <div>
        <el-form ref="form"  :model="form" label-width="80px">
          <el-form-item label="客户编号">
            <el-select v-model="form.customerId" placeholder="请选择客户">
              <el-option v-for="item in customerList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="导入文件">
            <el-upload
              class="upload-demo"
               :action=uploadUrl+form.customerId
               ref="upload"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-remove="beforeRemove"
               multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button size="small" type="primary" class="upload_file">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
            </el-upload>
            <!--<el-button type="primary" size="mini">导入文件</el-button>-->
             <a class="download"  @click="downloadFile()">下载模板</a>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit"  v-loading.fullscreen.lock="fullscreenLoading" class="submit">  {{type==1?'导入':'注销' }}</el-button>
            <!--<el-button>取消</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {  MessageBox } from 'element-ui'
  import store from '@/store'
    export default {
      name: "import",
      props:['type','customerList'],
      data(){
          return{
            fullscreenLoading:false,
            listLoading:false,
            downloadData:{},
            // customerList:[],
            customerName:'',
            uploadUrl:'',
            downLoadAddUrl:'/cloud/device/template/add',
            downLoadLogoutUrl:'/cloud/device/template/logout',
            deviceAddUrl:'/cloud/device/add?customerId=',
            deviceLogoutUrl:'/cloud/device/logout?customerId=',
            fileList: [
              ],
            form:{
              customerId:null,
              file1:''
            },
            dialogImport:false
          }
      },
      watch:{
          type:{
            deep:true,
            handler(val){
                if(val==1){
                  this.uploadUrl=this.deviceAddUrl;
                }else {
                  this.uploadUrl=this.deviceLogoutUrl;
                }
            }
          }
      },
      created(){

      },
      methods:{
        reset(){

          this.form={
            customerId:null,
            file1:''
          };


        },


        //下载url
        downloadFile(){
          var that=this;
           if(this.type==1){
              if(this.form.customerId==null){
                this.$notify({
                  title: '提示',
                  message:  '请选择客户编码！',
                  type: 'error',
                  duration: 2000
                })
              }else{
                // window.open(this.downLoadAddUrl+"?customerId="+that.form.customerId,"_blank");

                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = this.downLoadAddUrl+"?customerId="+that.form.customerId
                link.setAttribute('download', '导入模板.xlsx')
                document.body.appendChild(link)
                link.click()

              }
           }else{
             // window.open(that.downLoadLogoutUrl,"_bank");

             let link = document.createElement('a')
             link.style.display = 'none'
             link.href = this.downLoadLogoutUrl
             link.setAttribute('download', '注销模板.xlsx')
             document.body.appendChild(link)
             link.click()

           }
        },
        selectGet(vId){
          let obj = {};
          console.log(vId);
          obj = this.customerList.find((item)=>{//这里的selectList就是上面遍历的数据源
            return item.value === vId;//筛选出匹配数据
          });
         this.customerName=obj.label;
        },
        onSubmit(){
          if(this.form.customerId==null){
            this.$message({
              type: 'error',
              message: '请选择客户编号'
            });
            return  false;
          }
          this.selectGet(this.form.customerId);
          const title=this.type==1?'导入确认':'注销确认';
          const titleMsg=this.type==1?'导入设备':'注销设备';
          this.$confirm('确认是否为客户 "'+this.customerName+'" （客户编号 客户名称）'+titleMsg+'?', title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs.upload.submit();

          }).catch(() => {
            this.dialogImport=false;
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        beforeAvatarUpload(file){
          this.fullscreenLoading=true;
          // console.log(file);
          // const isIMG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          // console.log("2222222222");


          if (file.type!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'&&file.type!='application/vnd.ms-excel') {
            this.$message.error('必须上传excel文件或CSV文件!');
            this.fullscreenLoading=false;
            this.fileList=[];
            return false;

          }else{

            return true;
          }

        },
        uploadSuccess(res){
          this.fullscreenLoading=false;
          if(res.loginFail==401){
            MessageBox.confirm('当前登录超时，您可以取消继续留在该页面，或者重新登录', '确定登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('FedLogOut').then(() => {
                location.reload(); // 为了重新实例化vue-router对象 避免bug
              })
            })

            return false;
          }

            if(res.code!=200){
              this.$notify({
                title: '提示',
                message: res.msg,
                type: 'error',
                duration: 2000
              });
              this.fileList=[];
              return false;
            }
          let totalAmount=res.data['totalAmount'];
          let successAmount=res.data['successAmount'];
          console.log(res);
          this.downloadData=res.data;
          if(totalAmount==successAmount&&successAmount>0){
            this.$notify({
              title: '成功',
              message:  '操作成功！',
              type: 'success',
              duration: 2000
            });
            this.dialogImport=false;
            this.$parent.fetchList();
          }else{
            const msg=this.type==1?'导入设备总数'+totalAmount+'台，导入成功设备数'+successAmount+'台 是否需要导出失败设备清单?':
              '清单文件中设备总数'+totalAmount+'台，成功注销设备数'+successAmount+'台 是否需要导出失败设备清单?';
            this.$confirm(msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.dialogImport=false;
              this.download();
              // this.$message({
              //   type: 'success',
              //   message: '下载文件!'
              // });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '失败文件'
              });
            });
          }
        },
         //导出结果
        download () {
          if (!this.downloadData) {
            return;
          }
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = this.downloadData.heads;// this.downloadData.head;
            const data =  this.downloadData.rows;// this.formatJson(filterVal, this.downloadData.content)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.getDateNow()
            })
              this.listLoading=false;
          })
        },
        //获取当前日期
        getDateNow(){
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          // return this.$confirm(`确定移除 ${ file.name }？`);
          fileList=[];
        }
      }
    }
</script>
<style scoped>
  .submit{ background: #1DC9BB; border-color: #1DC9BB; width: 100px; letter-spacing: 5px;}
  .upload_file{ background: #FCA84C; border-color: #FCA84C;}
  .download{     width: 80px;
    height: 25px;
    line-height: 25px;
    position: absolute;
    top: 8px;
    left: 105px;
    color: #5FA2FC;
    cursor: pointer;
    text-decoration: underline;}
  .upload-demo{ width: 400px;}
</style>
