<template>
  <div>
     <!-- 评分弹框 -->
    <el-dialog
      title="评分"
      :visible.sync="dialogVisible"
      width="30%"
      class="dialogCustom"
      :show-close="false"
      modal
      :close-on-click-modal="false"
      center>
      <div class="dialogBorder">
        <el-form label-position="right" label-width="140px" :model="grade">
          <el-form-item label="资质:">
            <el-input-number :min="0" :max="5" v-model="grade.qualification" placeholder="请输入分数" />
          </el-form-item>
          <el-form-item label="价格分:">
            <el-input-number :min="0" :max="5" v-model="grade.price"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="品质分:">
            <el-input-number :min="0" :max="5" v-model="grade.quality"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="服务分:">
            <el-input-number :min="0" :max="5" v-model="grade.service"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="配送店铺数量分:">
            <el-input-number :min="0" :max="5" v-model="grade.amount"  placeholder="请输入分数"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer botton" style="margin:0px;padding:0px;">
        <div @click="dialogVisibleF" style="border-right: 1px #DDDDDD solid">取消</div>
        <div @click="addGrade">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {addGrade, getGrade} from '@/api/providerGrade.js'
export default {
  props:{
    showState:{
      default:false,
      type:Boolean
    },
    providerId:{
      default:0,
      type:Number
    },
    adminId:{
      default:'',
      type:String
    },
    gradeObject:{
      default:()=>{},
      type:Object
    },
  },
  data(){
    return{
      dialogVisible:false,
      grade: {
        adminId: '',
        qualification: '',
        price: '',
        quality: '',
        service: '',
        amount: '',
        providerId: ''
      },
    }
  },
  watch:{
    'showState'(res){
      this.dialogVisible = res
    },
    'providerId'(res){
      this.grade.providerId = res
    },
    'adminId'(res){
      this.grade.adminId = res
    },
    'gradeObject'(obj){
      console.log(obj, 'obj/////')
      this.grade = obj
    }
  },
  methods:{
    // 评分确定
    addGrade(){
      console.log(this.grade, 'kkkkkkk')
      addGrade(this.grade).then(res => {
        if(res.status === 1){
          this.$message.success('评分添加成功！')
          this.dialogVisible = false
        }else{
          this.$message.error('评分添加出错！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('评分添加失败！')
        return
      })
      this.$emit('getGradeDetail', this.grade)
      this.$emit('getCloseState', this.dialogVisible)
    },
    dialogVisibleF(){
      this.dialogVisible = false
      this.$emit('getCloseState', this.dialogVisible)
    }
  }
}
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #b3b3b3;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .botton {
    display: flex;
    > div{
      flex: 1;
      display: inline-block;
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &:active{
        background-color: #DDDDDD;
      }
    }
  }
  .dialog-footer {
    margin:0px;
    padding:0px;
  }
  .dialogBorder{
    text-align: center;
    border-top: 1px #DDDDDD solid;
    border-bottom: 1px #DDDDDD solid;
    padding: 40px 30px;
  }
</style>
