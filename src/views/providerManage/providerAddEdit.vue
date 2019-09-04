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
      <el-form-item label="可配送的店铺列表：" prop="shopObject">
        <el-select v-model="ruleForm.shopObject" placeholder="请选择" multiple clearable>
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商品：" prop="">
       <div class="goodsContainer">
          <div>
            <div class="categoryHeader">品类</div>
            <div class="categoryBody">
              <el-tree
                :data="dataTree"
                node-key="id"
                @current-change="changeHandle"
                >
                <template slot-scope="{ node, data }">
                  {{data.label}}({{data.id}})
                </template>
              </el-tree>
            </div>
          </div>
            <el-table :data="goodsList" :height="800" ref="multipleTable" @select="selectGoods" @select-all="selectGoodsAll(goodsList)">
              <el-table-column prop="goodsName" label="商品名称"/>
              <el-table-column prop="goodsId" label="商品ID"/>
              <el-table-column prop="standards" label="规格"/>
              <el-table-column prop="unit" label="单位"/>
              <el-table-column type="selection"></el-table-column>
            </el-table>
       </div>
      </el-form-item>
      <el-form-item label="资质照片：" prop="qualificationPics">
        <el-upload
          class="avatar-uploader"
          :action="`${apiUrl}/basics/upload`"
          :show-file-list="false"
          :on-success="handleQualificationSuccess"
          :before-upload="beforeQualificationUpload"
        >
          <img v-if="ruleForm.qualificationPics" :src="ruleForm.qualificationPics" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item v-if="editState" label="评分：" prop="">
        <div>
          <div>
            <span class="font-weight font-size">资质：{{grade.qualification}}</span>&nbsp;&nbsp;<span>满分=5</span><el-button style="margin-left:20px;" size="mini" type="success" @click="dialogVisible = true">去评分</el-button>
          </div>
          <div>
            <span class="font-weight">价格分：{{grade.price}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
          <div>
            <span class="font-weight">品质分：{{grade.quality}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
          <div>
            <span class="font-weight">服务分：{{grade.service}}</span>&nbsp;&nbsp;<span>满分=5</span>
          </div>
          <div>
            <span class="font-weight">配送店铺数量分：{{grade.amount}}</span>&nbsp;&nbsp;<span>满分=5</span>
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
            <el-input v-model="grade.qualification" placeholder="请输入分数" />
          </el-form-item>
          <el-form-item label="价格分:">
            <el-input v-model="grade.price"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="品质分:">
            <el-input v-model="grade.quality"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="服务分:">
            <el-input v-model="grade.service"  placeholder="请输入分数"/>
          </el-form-item>
          <el-form-item label="配送店铺数量分:">
            <el-input v-model="grade.amount"  placeholder="请输入分数"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer botton" style="margin:0px;padding:0px;">
        <div @click="dialogVisible = false" style="border-right: 1px #DDDDDD solid">取消</div>
        <div @click="addGrade">确定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllShop } from '@/api/shop.js'
import selectorAddress from '@/components/selectorAddress/selectAll.vue'
import { getProviderDetail, addProvider,editProvider,editProviderGoods} from '@/api/provider.js'
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
import { constants } from 'fs';
import {addGrade, getGrade} from '@/api/providerGrade.js'
export default {
  components: { selectorAddress },
  name: 'providerAddEdit',
  data() {
    return {
      stateCheck:true,
      defaultChecked:[],
      dataTree:[],
      checkList:[],
      grade: {
        adminId: '',
        qualification: '',
        price: '',
        quality: '',
        service: '',
        amount: '',
        providerId: ''
      },
      ruleForm:{
        id:'',
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
        shopObject: [],
        goodsId:[],
        shops: '',
        qualificationPics: '',
        qualificationScore: '',
        priceScore: '',
        qualityScore: '',
        serviceScore: '',
        deliverShopScore: '',
        providerShops:'',
        providerGoods:[],
        status: 0,
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
        shopObject: [
          { required: true, message: '请输入面积', trigger: 'blur' },
        ],
        // qualificationPics:[
        //   { required: true, message: '请输入面积', trigger: 'blur' },
        // ],
      },
      apiUrl: '',
      id: '',
      goodsList:[],
      categoryOneId:'',
      categoryTwoId:'',
      checkGoodsList:[],
      goodsTempList:[],
      toggleSelectionList:[],
      providerGoodsList:[],
    }
  },
  watch: {
    'ruleForm.shopObject'(e) {
      console.log(e, 'jjjjjjjjj')
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    this.getaAllCategory()
    this.grade.adminId = this.$store.state.user.roleId
    // console.log(this.$store, 'hhhhhhhh')
    if(JSON.stringify(this.$route.params) !== '{}'){
      this.editState = true
      this.checkGoodsList= []
      this.ruleForm.id = this.$route.params.id
      this.id = this.$route.params.id
      this.grade.providerId = this.$route.params.id
      this.getProviderDetail()
    }
    this.getShopOption()
    this.ruleForm.shops = []
    console.log(this.checkGoodsList, 'chushi/////')
  },
  methods: {
    // 商品单选
    selectGoods(a, row){
      for(let i=0; i<this.checkGoodsList.length; i++){
        if(this.checkGoodsList[i].goodsId === row.goodsId){
          this.checkGoodsList.splice(i, 1)
          return
        }else{this.checkGoodsList.push(row)}
      }
    },
    // 商品全选
    selectGoodsAll(all){
      for(let i=0;i<this.checkGoodsList.length; i++){
        for(let j=0;j<all; j++){
          if(this.checkGoodsList[i].goodsId === all[j].goodsId){
            this.checkGoodsList.splice(i, 1)
            // all.splice(j, 1)
            return
          }else(
            this.checkGoodsList.push(all[j])
          )
        }
      }

    },
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
        console.log(res, 'hhhhhhhh')
        if(res.status === 1){
          this.ruleForm = res.info
          this.ruleForm.shops = ''
          if(res.info.provinceDomain){
            this.ruleForm.provinceId = res.info.provinceDomain.id
          }
          if(res.info.cityDomain) {
            this.ruleForm.cityId = res.info.cityDomain.id
          }
          if(res.info.areaDomain) {
            this.ruleForm.areaId = res.info.areaDomain.id
          }
          console.log(res.info.providerShopList, 'res.info.providerShopList......')
          this.ruleForm.shopObject = []
          res.info.providerShopList.forEach(item => {
            this.ruleForm.shopObject.push(item.id)
          })
          res.info.providerGoodsList.forEach(item => {
            let goods = {}
            goods.categoryOneId = item.categoryOneId
            goods.categoryOneName = item.categoryOneName
            goods.categoryTwoId = item.categoryTwoId
            goods.categoryTwoName = item.categoryTwoName
            goods.goodsId = item.goodsId
            goods.goodsName = item.goodsName
            goods.standards = item.standards
            goods.unit = item.unit
            goods.id = item.id
            this.providerGoodsList.push(goods)
            this.checkGoodsList.push(goods)
          })
          setTimeout(() =>{
            this.handleToggles(this.providerGoodsList, this.goodsList)
          }, 2000)
          // this.handleToggle(res.info.providerGoodsList)
        }else{

        }
      }).catch(err => {
        console.log(err)
        this.$message.error('供应商详情查询出错')
      })
    },
    // 评分确定
    addGrade(){
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
      })
    },
    // 门头照片上传成功
    handleAvatarSuccess(file) {
      console.log(file, 'hhhh')
      this.ruleForm.headerPic = file.info
    },
    // 资质照片上传成功
    handleQualificationSuccess(file){
      this.ruleForm.qualificationPics = file.info
    },
    beforeAvatarUpload(file) {},
    beforeQualificationUpload(file) {},
    getProvince(e) {
      this.ruleForm.provinceId = e
    },
    getCity(e) {
      this.ruleForm.cityId = e
    },
    getCounty(e) {
      this.ruleForm.areaId = e
    },
    // 编辑供应商
    submitFormEdit(formName) {
        this.ruleForm.providerShops = this.ruleForm.shopObject.toString()
        console.log(this.checkGoodsList,'list;;;;;;')
        let array = []
        this.checkGoodsList.map(item => {
          let ob = {}
          console.log(this.ruleForm.providerId, 'this.ruleForm.providerId....')
          ob.providerId = this.ruleForm.id
          ob.categoryOneId = item.categoryOneId
          ob.categoryTwoId = item.categoryTwoId
          ob.goodsId = item.goodsId
          ob.goodsName = item.goodsName
          ob.standards = item.standards
          ob.unit = item.unit
          ob.id = item.id
          array.push(ob)
        })
        // return
        let goodsArr = []
        goodsArr = JSON.stringify(array)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editProvider(this.ruleForm).then(res => {
            this.$message.success('编辑成功')
          }).catch(err => {
            this.$message.error('编辑失败')
          })
          editProviderGoods(this.ruleForm.id, goodsArr).then(res => {
            //  this.$message.success('编辑成功')
          }).catch(err=> {
            this.$message.error('编辑商品失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 添加供应商
    submitForm(formName) {
      this.ruleForm.providerShops = this.ruleForm.shopObject.toString()
      console.log(this.checkGoodsList,'list;;;;;;')
      let array = []
      this.checkGoodsList.map(item => {
        let ob = {}
        ob.categoryOneId = item.categoryOneId
        ob.categoryTwoId = item.categoryTwoId
        ob.goodsId = item.goodsId
        ob.goodsName = item.goodsName
        ob.standards = item.standards
        ob.unit = item.unit
        array.push(ob)
      })
      this.ruleForm.providerGoods = JSON.stringify(array)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addProvider(this.ruleForm).then(res => {
            if(res.status === 1){
              this.$message.success('添加供应商成功！')
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
    // 查询所有品类
    getaAllCategory(){
      getSecondCategory().then(res => {
        this.categoryOneId = res.info[0].id
        this.categoryTwoId = res.info[0].seconds[0].id
        this.getGoods()
        res.info.forEach(item => {
          let arr = {}
          arr.id = item.id
          arr.label = item.name
          arr.children = item.seconds
          arr.children = []
          item.seconds.forEach(a => {
            let obj = {}
            obj.id = a.id
            obj.label = a.name
            arr.children.push(obj)
          })
          this.dataTree.push(arr)
        });
      }).catch(err => {
        console.log(err)
        this.$message.error('查询品类出错！')
      })
    },
    // 品类树形选择处理
    changeHandle(e){
        this.categoryOneId = ''
        this.categoryTwoId = ''
      if(e.children){
        this.categoryOneId = e.id
        this.getGoods()
      }else{
        this.categoryTwoId = e.id
        this.getGoods()
      }
    },
    // 查询商品
    getGoods(){
      getGoods(this.categoryOneId, this.categoryTwoId).then(res => {
        if(res.status === 1){
          this.goodsList = res.info
          this.handleToggle(res.info, this.checkGoodsList)
        }else{
          this.$message.info('此品类下暂无商品！')
        }
      }).catch(err=> {
        console.log(err)
        this.$message.error('查询商品出错！')
      })
    },
    // 生成编辑回显数据
    handleToggles(rows,all) {
      rows.forEach(item => {
        if(JSON.stringify(all).includes(item.goodsId)){
          this.goodsList.forEach(e => {
            if(e.goodsId === item.goodsId){
              let index = this.goodsList.indexOf(e)
              this.toggleSelectionList.push(this.goodsList[index])
            }
          })
        }
      })
        this.toggleSelection(this.toggleSelectionList)
    },
    // 生成添加回显的数组
    handleToggle(rows,all) {
      rows.forEach(item => {
        if(JSON.stringify(all).includes(item.goodsId)){
          let index = this.goodsList.indexOf(item)
          this.toggleSelectionList.push(this.goodsList[index])
        }
      })
        this.toggleSelection(this.toggleSelectionList)
    },
    // 回显数据
    toggleSelection(rows) {
      let _this = this
      _this.$nextTick(function() {
        if (rows) {
          rows.forEach(row => {
            _this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          _this.$refs.multipleTable.clearSelection()
        }
      })
    },
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
    width: 260px;
    height:55px;
    background-color: #f0f2f3;
    text-align: center;
    line-height: 60px;
    color:#909399;
    font-weight: 700;
  }
  .goodsContainer{
    display:flex;
    flex-direction: row;
    width:90%;
  }
  .categoryBody{
    width:260px;
    height:745px;
    border:1px solid #f0f2f3;
    background-color:#FFFFFF;
  }
  el-tree{
    // width:200px;
    height:746px;
    border:1px solid #f0f2f3;
  }
</style>
