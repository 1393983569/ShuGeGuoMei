<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item v-if="editState" label="供应商ID：" prop="">
        {{id}}
      </el-form-item>
      <el-form-item label="供应商名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入供应商名称" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="门头照片：" prop="headerPic">
        <el-upload
          class="avatar-uploader"
          :action="`${apiUrl}/basics/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.headerPic" :src="ruleForm.headerPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="联系人：" prop="contactName">
        <el-input v-model="ruleForm.contactName" placeholder="请输入联系人" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" style="width:400px;"/>
      </el-form-item>
       <el-form-item label="座机号：" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入座机号" style="width:400px;"/>
      </el-form-item>
       <el-form-item label="微信：" prop="wechat">
        <el-input v-model="ruleForm.wechat" placeholder="请输入微信" style="width:400px;"/>
      </el-form-item>
       <el-form-item label="QQ：" prop="qq">
        <el-input v-model="ruleForm.qq" placeholder="请输入QQ" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="仓库地址：" prop="areaId">
        <selector-address :province1id="ruleForm.provinceId" :city1id="ruleForm.cityId" :county1id="ruleForm.areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
      </el-form-item>
      <el-form-item label=" " prop="addressDetail">
        <el-input v-model="ruleForm.addressDetail" placeholder="请输入详细地址" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="仓库面积：" prop="area">
        <el-input v-model="ruleForm.area" placeholder="请输入仓库面积" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请输入备注" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="可配送的店铺列表：" prop="shops">
        <el-select v-model="ruleForm.shops" placeholder="请选择" multiple>
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商品：" prop="">
       <div>
          <div>
            <div class="categoryHeader">品类</div>
            <div style="width:20%;">
              <el-tree
                :data="dataTree"
                show-checkbox
                node-key="id"
                :props="defaultProps">
              </el-tree>
            </div>
          </div>
          <div>
            <el-table :data="goodsList">
              <el-table-column prop="" label=""/>
              <el-table-column prop="" label=""/>
              <el-table-column prop="" label=""/>
              <el-table-column prop="" label=""/>
              <el-table-column prop="" label=""></el-table-column>
            </el-table>
          </div>
       </div>
      </el-form-item>
      <el-form-item v-if="editState" label="资质照片(还未做)：" prop="">
        <el-upload
          class="avatar-uploader"
          :action="`${apiUrl}/basics/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.qualificationPics" :src="ruleForm.qualificationPics" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item v-if="editState" label="评分(还未做)：" prop="">
        <div>
          <div>
            <span class="font-weight font-size">资质：{{ruleForm.qualificationScore}}</span>&nbsp;&nbsp;<span>满分=5</span><el-button style="margin-left:20px;" size="mini" type="success" @click="dialogVisible = true">去评分</el-button>
          </div>
          <div>
            <span class="font-weight">价格分：{{ruleForm.priceScore}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
          <div>
            <span class="font-weight">品质分：{{ruleForm.qualityScore}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
          <div>
            <span class="font-weight">服务分：{{ruleForm.serviceScore}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
          <div>
            <span class="font-weight">配送店铺数量分：{{ruleForm.deliverShopScore}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="editState">
          <el-button type="primary" @click="submitFormEdit('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')" type="danger">取消</el-button>
        </div>
        <div v-else>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')" type="danger">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- 评分弹框 -->
    <el-dialog
      title="评分"
      :visible.sync="dialogVisible"
      width="30%"
      class="dialogCustom"
      :show-close="false"
      center>
      <div class="dialogBorder">
        <el-form label-position="right" label-width="130px" :model="grade">
          <el-form-item label="资质:">
            <el-input v-model="grade.qualificationScore" placeholder="请输入分数" />
          </el-form-item>
          <el-form-item label="价格分:">
            <el-input v-model="grade.priceScore"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="品质分:">
            <el-input v-model="grade.qualityScore"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="服务分:">
            <el-input v-model="grade.serviceScore"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="配送店铺数量分:">
            <el-input v-model="grade.deliverShopScore"  placeholder="请输入分数"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer botton" style="margin:0px;padding:0px;">
        <div @click="dialogVisible = false" style="border-right: 1px #DDDDDD solid">取消</div>
        <div @click="adddGrade">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllShop } from '@/api/shop.js'
import selectorAddress from '@/components/selectorAddress/selectAll.vue'
import { getProviderDetail } from '@/api/provider.js'
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
export default {
  components: { selectorAddress },
  name: 'providerAddEdit',
  data() {
    return {
      dataTree:[],
      grade: {
        qualificationScore: '',
        priceScore: '',
        qualityScore: '',
        serviceScore: '',
        deliverShopScore: '',
      },
      ruleForm:{
        name: '',
        headerPic: '',
        contactName: '',
        mobile: '',
        phone: '',
        wechat: '',
        qq: '',
        email: '',
        provinceId:'',
        cityId: '',
        areaId: '',
        addressDetail: '',
        area: '',
        remark: '',
        shops: [],
        // shops: '',
        qualificationPics: '',
        qualificationScore: '',
        priceScore: '',
        qualityScore: '',
        serviceScore: '',
        deliverShopScore: '',
      },
      dialogVisible: false,
      shopList: [],
      editState: false,
      rules: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
        contactName:[
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入座机号', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        addressDetail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        areaId: [
          { required: true, message: '请选择仓库地址', trigger: 'blur' },
        ],
        area: [
          { required: true, message: '请输入面积', trigger: 'blur' },
        ],
        shops: [
          { required: true, message: '请输入面积', trigger: 'blur' },
        ],
      },
      apiUrl: '',
      id: '',
      goodsList:[],
    }
  },
  watch: {
    'ruleForm.shops'(e) {
      console.log(e, '^^^^^^^^^^^^^')
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    if(JSON.stringify(this.$route.params) !== '{}'){
      this.editState = true
      this.id = this.$route.params.id
      // this.getProviderDetail()
    }
    this.getShopOption()
    this.getaAllCategory()
  },
  methods: {
    // 查询所有店铺
    getShopOption() {
      getAllShop().then(res => {
        if(res.info.length > 0) {
          // console.log(res, '$$$$$$$$$')
          this.shopList = res.info
        }else{
          this.$message.info('暂无店铺数据')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
    },
    // 查询供应商详情
    getProviderDetail() {
      getProviderDetail(this.id).then(res => {
        console.log(res, '77777777')
      }).catch(err => {})
    },
    // 评分确定
    adddGrade(){
      this.ruleForm.qualificationScore = this.grade.qualificationScore
      this.ruleForm.priceScore = this.grade.priceScore
      this.ruleForm.qualityScore = this.grade.qualityScore
      this.ruleForm.serviceScore = this.grade.serviceScore
      this.ruleForm.deliverShopScore = this.grade.deliverShopScore
      this.dialogVisible = false
      this.grade = {}
    },
    handleAvatarSuccess(file) {
      console.log(file, 'hhhh')
      this.ruleForm.headerPic = file.info
    },
    beforeAvatarUpload(file) {

    },
    getProvince(e) {
      this.ruleForm.provinceId = e
    },
    getCity(e) {
      this.ruleForm.cityId = e
    },
    getCounty(e) {
      this.ruleForm.areaId = e
    },
    // 添加供应商
    submitFormEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'gggggggg')
          return
          addProvider().then(res => {
            if(res.status === 1){
              this.$message.success('添加供应商失败！')
            }else {
              this.$message.warning('添加供应商出错！')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('添加供应商失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 编辑供应商
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'gggggggg')
          return
          addProvider().then(res => {
            if(res.status === 1){
              this.$message.success('添加供应商失败！')
            }else {
              this.$message.warning('添加供应商出错！')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('添加供应商失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getaAllCategory(){
      getSecondCategory().then(res => {
        res.info.forEach(item => {
          let arr = {}
          arr.id = item.id
          arr.label = item.name
          arr.children = []
          item.seconds.forEach(a => {
            let obj = {}
            obj.id = a.id
            obj.label = a.name
            arr.children.push(obj)
          })
          this.dataTree.push(arr)
        });
      }).catch()
    },
    getGoods(){
      getGoods().then().catch()
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
  .categoryHeader{
    width: 20%;
    height:30px;
    background-color: red;
    text-align: center;
  }
</style>
