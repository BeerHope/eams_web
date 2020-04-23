<template>
  <el-dialog
    width="40%"
    title="文件上传"
    @close="closeDialog"
    custom-class="common-dilalog upload"
    :visible.sync="dialogVisible">
    <el-upload
      ref="upload"
      class="upload-demo t-c"
      drag
      :action="uploadUrl"
      :headers="headers"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div class="el-upload__tip" slot="tip"></div> -->
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="handleUpload">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'Upload',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    uploadUrl() {
      return 'https://jsonplaceholder.typicode.com/posts/'
    },
    headers() {
      return {
        token: getToken()
      };
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    beforeUpload(file) {
      const acceptTypes = ['xlsx', 'xls']
      const type = file.name.slice(file.name.lastIndexOf('.') + 1)
      const isAcceptedType = _.includes(acceptTypes, type)
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isAcceptedType) {
        this.$message.error(this.$t('base.upload.fileCheckType'))
      }
      if (!isLt5M) {
        this.$message.error(this.$t('base.upload.fileCheckSize'))
      }
      return isAcceptedType && isLt5M;
    },
    handleExceed(files, fileList) {
      this.$message.warning(this.$t('base.upload.exceedTips'))
    },
    uploadSuccess() {
      if (res.code !== 200) {
        this.$message.error("上传失败");
        this.$refs.upload.clearFiles()
        return
      }
    },
    handleUpload() {
      const upload = this.$refs.upload
      if (!upload.uploadFiles.length) {
        this.$message.warning(this.$t('base.upload.fileNullTips'))
        return
      }
      upload.submit()
      this.dialogVisible = false
    },
    closeDialog() {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
