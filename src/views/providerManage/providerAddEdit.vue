<template>
  <div>
    <Breadcrumb>
    <!-- 编辑 -->
      <div v-if="editState">
        <el-button size="mini" type="primary" @click="submitFormEdit('ruleForm')">保存</el-button>
        <el-button size="mini" type="warning" @click="resetForm('ruleForm')">取消</el-button>
      </div>
      <!-- 添加 -->
      <div v-else>
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button size="mini" type="warning" @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </Breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item v-if="editState" label="供应商ID：" prop="">
        {{id}}
      </el-form-item>
      <el-form-item label="供应商名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入供应商名称" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="门头照片：" prop="headerPic">
        <div style="display:flex;">
          <el-upload
            class="avatar-uploader"
            :action="`${apiUrl}/basics/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-progress="handleProgressHeader"
          >
            <p v-if="editState" class="change-img" style="position:absolute;left:106px;">更换图片</p>
            <p v-else></p>
            <div slot="tip" class="el-upload__tip">建议上传大小不超过1m的图片</div>
            <el-progress v-if="0<percentageHeader&&percentageHeader<=100" type="circle" :percentage="percentageHeader" :width="177" style="width:178px;height:178px;"></el-progress>
            <img v-if="ruleForm.headerPic" :src="ruleForm.headerPic" class="avatar">
            <i v-else-if="!ruleForm.headerPic&&percentageHeader<=0||percentageHeader>100" class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
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
        <el-input v-model="ruleForm.area" placeholder="请输入仓库面积" style="width:370px;"/> <span style="font-size:14px;font-weight:bold;">m</span><sup>2</sup>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请输入备注" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="可配送的店铺列表：" prop="shopObject">
        <!-- <el-select v-model="ruleForm.shopObject" placeholder="请选择" multiple clearable style="width:500px;">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select> -->
         <el-select v-model="shopObject" placeholder="请选择" multiple clearable style="width:500px;">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="goodsArr">
        <template slot="label">
          <span style="color:red;">*</span> 供应商品：
        </template>
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
          :on-progress="handleProgressQua"
        >
          <p v-if="editState" class="change-img" style="position:absolute;right:0px;left:106px;">更换图片</p>
          <p v-else></p>
          <div slot="tip" class="el-upload__tip">建议上传大小不超过1m的图片</div>
          <el-progress v-if="0<percentageQua&&percentageQua<=100" type="circle" :percentage="percentageQua" :width="177" style="width:178px;height:178px;"></el-progress>
          <img v-if="ruleForm.qualificationPics" :src="ruleForm.qualificationPics" class="avatar">
          <i v-else-if="!ruleForm.qualificationPics&&percentageQua>100||percentageQua<=0" class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item v-if="editState" label="评分：" prop="">
        {{averageScore}}
        <el-button style="margin-left:20px;" size="mini" type="success" @click="dialogVisible">去评分</el-button>
        <gradeDetail :grade="grades"></gradeDetail>
      </el-form-item>
      <el-form-item>

      </el-form-item>
    </el-form>
    <grade @getCloseState="getCloseState" @getGradeObject="getGradeObject" :gradeObject="gradeObject" :showState ="showState" :provider-id="providerId" :admin-id="adminId"></grade>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import Breadcrumb from '@/components/Breadcrumb'
import gradeDetail from './gradeDetail.vue'
import grade from './grade.vue'
import { getAllShop } from '@/api/shop.js'
import selectorAddress from '@/components/selectorAddress/selectAll.vue'
import { getProviderDetail, addProvider,editProvider,editProviderGoods, editProviderShop} from '@/api/provider.js'
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
import { constants } from 'fs';

export default {
  components: { selectorAddress,grade ,gradeDetail, Breadcrumb },
  name: 'providerAddEdit',
  data() {
    // 手机号验证
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'));
      } else {
        if (value !== '') {
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的手机号码'));
          }
        }
        callback();
      }
    };
    // 邮箱验证
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'));
      } else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }
    };
    // 固定电话验证
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('电话不可为空'));
      } else {
        if (value !== '') {
          var reg =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
          if(!reg.test(value)){
            callback(new Error('请输入正确的座机号格式为：0000-0000000'));
          }
        }
        callback();
      }
    };
    // 微信号
    var validateWeixin = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('微信号不能为空'));
      }else{
        var reg= /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        if(!reg.test(value)){
          callback(new Error('请输入正确的微信号码'));
        }else{
          callback();
        }
      }
    };
    var validateQQ = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('QQ号不能为空'));
      }else{
        var reg = /^[1-9]\d*$/;
        if(!reg.test(value)||value.toString().length>12||value.toString().length<5){
          callback(new Error('请输入正确的QQ号'));
        }else{
          callback();
        }
      }
    };
    // var validateGoods = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('商品不能为空'));
    //   }else{

    //   }
    // };
    return {

      percentageHeader:0,
      // getGradeObject:{},
      percentageQua:0,
      gradeObject:{},
      shopObject:[],
      providerId:0,
      adminId:'',
      showState:false,
      stateCheck:true,
      defaultChecked:[],
      dataTree:[],
      checkList:[],
      grades:{},
      grade: {
        qualification: 0,
        price: 0,
        quality: 0,
        service: 0,
        amount: 0,
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
        status: 3,
        goodsArr:[],
      },
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
          { required: true,validator:validateMobilePhone, trigger: 'blur' },
        ],
        wechat: [
          { required: false,validator:validateWeixin, trigger: 'blur' },
        ],
        qq: [
          { required: false,validator:validateQQ, trigger: 'blur' },
        ],
        phone: [
          { required: true,validator: validatePhone, trigger: 'blur' },
        ],
        email: [
          { required: true, validator:validateEmail, trigger: 'blur' },
        ],
        addressDetail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        // goodsArr: [
        //   { required: false, validator:validateGoods, trigger: 'change' },
        // ],
        areaId: [
          { required: true, message: '请选择仓库地址', trigger: 'blur' },
        ],
        area: [
          { required: true, message: '请输入面积', trigger: 'blur' },
        ],
        qualificationPics: [
          { required: true, message: '请上传资质照片', trigger: 'blur' },
        ]
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
      // 总分
      averageScore:0,
    }
  },
  watch: {
    'shopObject'(e) {
      // console.log(e, 'jjjjjjjjj')
    },
    'checkGoodsList'(e){
      // console.log(e, 'list.......')
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    this.getaAllCategory()
    this.adminId = this.$store.state.user.roleId
    if(this.$route.params.state === '编辑'){
      this.editState = true
      this.checkGoodsList= []
      this.ruleForm.id = this.$route.params.id
      this.id = this.$route.params.id
      this.providerId = this.$route.params.id
      this.getProviderDetail()
    }else if(JSON.stringify(this.$store.state.user.providerObject)!=='{}'){
      this.editState = true
      this.providerId = this.$store.state.user.providerObject.id
      this.id = this.$store.state.user.providerObject.id
      this.getProviderDetail()
    }else if(this.$route.params.state === '添加'){
      this.editState = false
    }
    this.getShopOption()
    this.ruleForm.shops = []
  },
  methods: {
    handleProgressHeader(event, file, fileList){
      this.percentageHeader = event.percent
      this.ruleForm.headerPic = ''
    },
    handleProgressQua(event, file, fileList){
      this.percentageQua = event.percent
      this.ruleForm.qualificationPics = ''
    },
    dialogVisible(){
      this.showState = true
      this.getProviderDetail()
    },
    getCloseState(state){
      if(!state){
        this.showState = false
      }
    },
    // 总分反显
    getGradeObject(e){
      this.averageScore = (e.amount+e.price+e.qualification+e.quality+e.service)/5
    },
    // 商品单选
    selectGoods(a, row){
      // console.log(row, 'kkkkkkk')
      let count=0
      let length= this.checkGoodsList.length
      for(let i=0; i<this.checkGoodsList.length; i++){
        if(this.checkGoodsList[i].goodsId === row.goodsId){
          this.checkGoodsList.splice(i, 1)
          return
        }else{
          count++
        }
      }
      if(count>=length){
          this.checkGoodsList.push(row)
        }
      this.ruleForm.goodArr = this.checkGoodsList
    },
    // 商品全选
    selectGoodsAll(all){
        for(let i=0;i<all.length;i++){
          let count = 0
          let length = this.checkGoodsList.length
          for(let j=0;j<this.checkGoodsList.length;j++){
            if(this.checkGoodsList[j].goodsId === all[i].goodsId){
              this.checkGoodsList.splice(j, 1)
              continue
            }else{
              count++
            }
          }
          if(count >= length){
            this.checkGoodsList.push(all[i])
          }
        }
      this.ruleForm.goodArr = this.checkGoodsList
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
      // console.log('详情。。。。。')
      getProviderDetail(this.id).then(res => {
        // console.log(res, 'hhhhhhhh')
        if(res.status === 1){
          this.ruleForm = res.info
          this.ruleForm.shops = ''
          if(res.info.provinceDomain){
            // this.ruleForm.provinceId = res.info.provinceDomain.id
            this.ruleForm.provinceId = res.info.provinceId.toString()
          }
          if(res.info.cityDomain) {
            // this.ruleForm.cityId = res.info.cityDomain.id
            this.ruleForm.cityId = res.info.cityId.toString()
          }
          if(res.info.areaDomain) {
            // this.ruleForm.areaId = res.info.areaDomain.id
            this.ruleForm.areaId = res.info.areaId.toString()
          }
          // 可配送店铺
          this.ruleForm.shopObject = []
          let arr =[]
          res.info.providerShopList.forEach(item => {
            if(item){
              arr.push(item.id)
            }
          })
          this.shopObject=arr
          // 商品
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
          this.returnScore()
          this.gradeObject = this.grades
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
    // 评分
    returnScore(){
      this.grade.providerId = this.providerId
      this.grade.adminId  = this.adminId
      this.grade.qualification=this.ruleForm.qualificationScore
      this.grade.price=this.ruleForm.priceScore
      this.grade.quality=this.ruleForm.qualityScore
      this.grade.service=this.ruleForm.serviceScore
      this.grade.amount=this.ruleForm.deliverShopScore
      this.grades = this.grade
      this.averageScore = (this.grade.qualification+this.grade.price+this.grade.quality+this.grade.service+this.grade.amount)/5
    },

    // 门头照片上传成功
    handleAvatarSuccess(file) {
      // console.log(file, 'hhhh')
      this.ruleForm.headerPic = file.info
      this.percentageHeader = 101
    },
    // 资质照片上传成功
    handleQualificationSuccess(file){
      this.percentageQua = 101
      this.ruleForm.qualificationPics = file.info
    },
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 1;
      if (!isLt20M) {
        this.$message.error('上传图片的大小不能超过 1M!');
        return false
      }
    },
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
        this.ruleForm.providerShops = this.shopObject.toString()
        // console.log(this.checkGoodsList,'list;;;;;;')
        let array = []
        this.checkGoodsList.map(item => {
          let ob = {}
          // console.log(this.ruleForm.providerId, 'this.ruleForm.providerId....')
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
          editProviderShop(this.ruleForm.id,this.ruleForm.providerShops).then(res => {
            this.$router.go(-1)
          }).catch(err => {
            this.$message.error('编辑店铺失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 添加供应商
    submitForm(formName) {
      this.ruleForm.providerShops = this.shopObject.toString()
      // console.log(this.checkGoodsList,'list;;;;;;')
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
              this.$router.go(-1)
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
      this.$router.back()
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
  .change-img{
    margin:0px;
    padding:0px;
    position:absolute;
    right:0px;
    line-height: 20px;
    font-size:14px;
    color:aliceblue;
    width:72px;
    height:20px;
    background-color: rgba(1,1,1,0.5);
    border-radius:5px;
  }
</style>
