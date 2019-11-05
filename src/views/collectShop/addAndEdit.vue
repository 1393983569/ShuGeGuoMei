<template>
 <div>
   <breadcrumb>
   <!-- 添加 -->
    <div v-if="addEditState">
      <el-button type="primary" size="mini" :loading="addLoading" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="warning" size="mini" @click="resetForm('ruleForm')">取消</el-button>
    </div>
    <!-- 修改 -->
    <div v-else>
      <el-button size="mini" type="primary" :loading="addLoading" @click="submitEditForm('ruleForm')">保存</el-button>
      <el-button size="mini" type="warning" @click="resetForm('ruleForm')">取消</el-button>
    </div>
   </breadcrumb>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="一级品类：" prop="categoryOneId">
        <el-select v-model="ruleForm.categoryOneId" clearable placeholder="请选择" style="width: 500px">
          <el-option
            v-for="item in firstList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级品类：" prop="categoryTwoId">
        <el-select v-model="ruleForm.categoryTwoId" clearable placeholder="请选择" style="width: 500px">
          <el-option
            v-for="item in secondList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入内容" style="width: 500px" />
      </el-form-item>
      <el-form-item label="商品条码：">
        <el-input v-model="ruleForm.barCode" placeholder="请输入内容" style="width: 500px" >
          <svg-icon slot="suffix" icon-class="addgoods_scan" style="width:40px;height:35px;"></svg-icon>
        </el-input>
      </el-form-item>
      <el-form-item label="缩略图：" prop="name">
        <el-upload
          class="avatar-uploader"
          :action="`${apiUrl}/basics/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccessSmall"
          :before-upload="beforeAvatarUpload"
          :on-progress="handleProgressSmall"
        >
          <div v-if="addEditState"></div>
          <div v-else class="changPic">更换照片</div>
          <div slot="tip" class="el-upload__tip">建议上传200*200px图片，大小不超过1m</div>
          <el-progress v-if="0<percentageSmall&&percentageSmall<=100" type="circle" :percentage="percentageSmall" :width="177" style="width:178px;height:178px;"></el-progress>
          <img v-if="ruleForm.smallImg" :src="ruleForm.smallImg" class="avatar">
          <i v-else-if="!ruleForm.smallImg&&percentageSmall>100||percentageSmall<=0" class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="展示图：" prop="name">
        <div style="display:flex;">
          <el-upload
            class="avatar-uploader"
            :action="`${apiUrl}/basics/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccessBig"
            :before-upload="beforeAvatarUpload"
            :on-progress="handleProgressBig"
          >
            <div v-if="addEditState"></div>
            <div v-else class="changPic">更换照片</div>
            <div slot="tip" class="el-upload__tip">建议上传500*500px图片，大小不超过1m</div>
            <el-progress v-if="0<percentageBig&&percentageBig<=100" type="circle" :percentage="percentageBig" :width="177" style="width:178px;height:178px;"></el-progress>
            <img v-if="ruleForm.bigImg" :src="ruleForm.bigImg" class="avatar">
            <i v-else-if="!ruleForm.bigImg&&percentageBig>100||percentageBig<=0" class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="标签：" prop="tab">
        <el-tag
          v-for="tag in ruleForm.tab"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <p  v-if="hiddentab"></p>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>

      </el-form-item>
      <el-form-item label="规格：" prop="standards">
        <el-input v-model="ruleForm.standards" placeholder="请输入内容" style="width: 500px" />
      </el-form-item>
      <el-form-item label="单位：" prop="unit">
        <el-input v-model="ruleForm.unit" placeholder="请输入内容" style="width: 500px" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请输入内容" style="width: 500px" />
      </el-form-item>
      <el-form-item label="保质期：" prop="qualityDate">
        <el-date-picker
          v-model="ruleForm.qualityDate"
          align="right"
          type="date"
          placeholder="选择日期"
          style="width: 500px"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="保鲜期：" prop="freshDate">
        <el-input v-model="ruleForm.freshDate" placeholder="请输入保鲜期" style="width:200px;" /> 小时
      </el-form-item>
      <el-form-item label="产地：" prop="provinceId">
        <el-select v-model="ruleForm.countryId " clearable placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in countryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <div v-if="ruleForm.countryId === 999999" />
        <selectGoodsAddress v-else :province1id="ruleForm.provinceId" :city1id="ruleForm.cityId" :county1id="ruleForm.areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" />
      </el-form-item>
      <el-form-item label="状态：" prop="state">
        <el-select v-model="ruleForm.state" clearable placeholder="请选择" style="width: 300px">
          <el-option
            v-for="item in stateList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="进价：" prop="purchasePrice">
        <el-input v-model="ruleForm.purchasePrice" placeholder="请输入内容" style="width: 444px" /> 元/单位
      </el-form-item>
      <el-form-item label="出价：" prop="sellPrice">
        <el-input v-model="ruleForm.sellPrice" placeholder="请输入内容" style="width: 444px" /> 元/单位
      </el-form-item>
      <el-form-item label="零售价：" prop="price">
        <el-input v-model="ruleForm.price" placeholder="请输入内容" style="width: 444px" /> 元/单位
        <div style="margin-top:5px;font-weight:bold;">零售价参考价</div>
        <el-table :data="getAddressTable" size="mini" style="width:450px;">
          <el-table-column prop="getAddress" label="采集点" />
          <el-table-column prop="price" label="价格" />
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import { getFirstCategory, getSecondCategory } from '@/api/category.js'
import { addGoods, seeDetailsGoods, editGoods } from '@/api/collectShop.js'
import selectGoodsAddress from '@/components/selectorAddress/selectGoodsAddress.vue'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AddAndEdit',
  components: { selectGoodsAddress, Breadcrumb },
  data() {
    return {
      hiddentab:false,
      percentageSmall:0,
      percentageBig:0,
      getAddressTable: [
        {
          getAddress: '采集点1',
          price: '￥3.00'
        },
        {
          getAddress: '采集点1',
          price: '￥3.00'
        },
        {
          getAddress: '采集点1',
          price: '￥3.00'
        },
        {
          getAddress: '采集点1',
          price: '￥3.00'
        }
      ],
      imageUrl: '',
      addLoading: false,
      stateList: [
        {
          id: 0,
          name: '有货'
        },
        {
          id: 1,
          name: '缺货'
        }
      ],
      countryList: [
        {
          id: 999999,
          name: '国外'
        },
        {
          id: 888888,
          name: '国内'
        }
      ],
      options: [
        {
          label: 'sssss',
          value: '0'
        },
        {
          label: 'sssss',
          value: '4'
        },
        {
          label: 'sssss',
          value: '8'
        }
      ],
      firstList: [],
      secondList: [],
      // provinceId:''
      ruleForm: {
        provinceId: '',
        cityId: '',
        areaId: '',
        name: '',
        categoryOneId: '',
        categoryTwoId: '',
        // tab: '',
        standards: '',
        unit: '',
        remark: '',
        qualityDate: '',
        freshDate: '',
        // areaId: '',
        // provinceId: '',
        state: '',
        purchasePrice: '',
        sellPrice: '',
        price: '',
        tab: [],
        countryId: 888888,
        smallImg: '',
        bigImg: '',
        barCode: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        // provinceId:[{ required: true, message: '请选择地址', trigger: 'blur' }],
        // cityId: [{ required: true, message: '请输入', trigger: 'blur' }],
        // countyId: [{ required: true, message: '请输入', trigger: 'blur' }],
        // firstList:[{ required: true, message: '请输入', trigger: 'blur' }],
        // secondList:[{ required: true, message: '请输入', trigger: 'blur' }],
        // tab: [{ required: true, message: '请输入', trigger: 'blur' }],
        categoryOneId: [{ required: true, message: '请选择一级品类', trigger: 'blur' }],
        categoryTwoId: [{ required: true, message: '请选择二级品类', trigger: 'blur' }],
        // tab: [{ required: true, message: '请添加标签', trigger: 'blur' }],
        standards: [{ required: true, message: '请输入规格', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
        // remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        qualityDate: [{ required: true, message: '请选择保质期', trigger: 'blur' }],
        freshDate: [{ required: true, message: '请选择保鲜期', trigger: 'blur' }],
        // areaId: [{ required: true, message: '请输入', trigger: 'blur' }],
        // provinceId: [{ required: true, message: '请输入', trigger: 'blur' }],
        state: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        purchasePrice: [{ required: true, message: '请输入进价', trigger: 'blur' }],
        sellPrice: [{ required: true, message: '请输入出价', trigger: 'blur' }],
        price: [{ required: true, message: '请输入零售价', trigger: 'blur' }]
      },
      // dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      goodsObject: [],
      addEditState: true,
      goodsId: '',
      apiUrl: ''
    }
  },
  watch: {
    // 查询一级品类下的二级品类
    'ruleForm.categoryOneId'(e) {
      if (e) {
        getSecondCategory(e).then(res => {
          if (res.info.length > 0) {
            this.secondList = res.info
          } else {
            this.$message.info('此一级品类下暂无二级品类！')
            this.secondList = []
          }
        }).catch(err => {
          console.log(err)
          this.$message.warning('暂无二级品类')
        })
      }
    },
    'ruleForm.name'(name){
      if(name.length>30){
        this.ruleForm.name = ''
        this.$message.warning('字数已经超出上限，请重新填写！')
      }
    },
    'inputValue'(tag){
      // 标签字数限制
      if(tag.length>5){
        this.inputValue = ''
        this.$message.warning('超过字数限制，请重新填写！')
      }
    },
    'ruleForm.unit'(e){
      if(e.length>4){
        this.ruleForm.unit = ''
        this.$message.warning('超出单位字符限制，请重新填写！')

      }
    },
    'ruleForm.standards'(standards){
      if(standards.length>6){
        this.ruleForm.standards = ''
        this.$message.warning('超出规格字符限制，请重新填写！')
      }
    },
    'ruleForm.tab'(e){
      if(e.length>=4){
        this.hiddentab = true
      }else{
        this.hiddentab = false
      }
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    if(JSON.stringify(this.$route.params) !=="{}") {
      if(this.$route.params.row === '添加') {
        this.addEditState = true
      }else {
        this.addEditState = false
        this.goodsId = this.$route.params.row.id
        // return
        this.getDetailsGoods()
      }
    } else {
      window.history.go(-2)
    }
    this.getFirstCategory()
  },
  methods: {
    handleProgressSmall(event, file, fileList){
      this.percentageSmall = event.percent
      this.ruleForm.smallImg = ''
    },
    handleProgressBig(event, file, fileList){
      this.percentageBig = event.percent
      this.ruleForm.bigImg = ''
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
    // 查询一级品类
    getFirstCategory() {
      getFirstCategory().then(res => {
        if (res.info.length > 0) {
          this.firstList = res.info
        } else {
          this.$message.warning('暂无一级品类')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询一级品类出错！')
      })
    },
    // 上传图片
    handleAvatarSuccessSmall(res) {
      this.ruleForm.smallImg = res.info
      this.percentageSmall = 101
    },
    handleAvatarSuccessBig(res) {
      this.ruleForm.bigImg = res.info
      this.percentageBig = 101
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    // 查询详情
    getDetailsGoods() {
      seeDetailsGoods(this.goodsId).then(res => {
        // if(res.status === 1) {
          let obj = {}
          obj = res.info
          this.ruleForm.provinceId = obj.provinceId+''
          this.ruleForm.cityId = obj.cityId+''
          this.ruleForm.areaId = obj.areaId+''
          this.ruleForm.name = obj.goodName
          if(obj.categoryTwo){
            this.ruleForm.categoryTwoId = obj.categoryTwo.id
          }else{
            this.ruleForm.categoryTwoId = ''
          }
          if(obj.categoryOne){
            this.ruleForm.categoryOneId = obj.categoryOne.id
          }else{
            this.ruleForm.categoryOneId = ''
          }
          // this.ruleForm.categoryOneId = obj.categoryOne.id
          this.ruleForm.standards = obj.goodStandard
          this.ruleForm.unit = obj.goodUnit
          this.ruleForm.remark = obj.goodRmark
          this.ruleForm.qualityDate = obj.goodQualityDate
          this.ruleForm.freshDate = obj.goodFreshDate
          this.ruleForm.state = obj.goodState
          this.ruleForm.purchasePrice = obj.goodPurchasePrice/100
          this.ruleForm.sellPrice = obj.goodSellPrice/100
          this.ruleForm.price = obj.goodPrice/100
          this.ruleForm.countryId = obj.countryId
          this.ruleForm.smallImg = obj.goodSmallImg
          this.ruleForm.barCode = obj.barCode
          this.ruleForm.bigImg = obj.goodBigImg
          if(obj.goodTab){
            this.ruleForm.tab = obj.goodTab.split(',')
          }
        // }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询详情出错')
      })
    },
    // 添加商品
    addGoods() {
      this.addLoading = true
      this.goodsObject = JSON.parse(JSON.stringify(this.ruleForm))
      if (this.goodsObject.tab.length > 0) {
        this.goodsObject.tab = this.goodsObject.tab.toString()
      } else {
        this.goodsObject.tab = ''
      }
      this.goodsObject.purchasePrice = this.goodsObject.purchasePrice*100
      this.goodsObject.sellPrice = this.goodsObject.sellPrice*100
      this.goodsObject.price = this.goodsObject.price*100
      this.goodsObject.state = this.goodsObject.state + ''
      addGoods(this.goodsObject).then(res => {
        this.$message.success('添加商品成功')
        this.addLoading = false
        window.history.go(-1)
      }).catch(err => {
        this.addLoading = false
        console.log(err)
        this.$message.error('添加商品失败！')
      })
    },
    // 编辑商品
    handleGoodsEdit() {
      this.addLoading = true
      this.goodsObject = JSON.parse(JSON.stringify(this.ruleForm))
      if (this.goodsObject.tab.length > 0) {
        this.goodsObject.tab = this.goodsObject.tab.toString()
      } else {
        this.goodsObject.tab = ''
      }
      this.goodsObject.id = this.goodsId
      this.goodsObject.purchasePrice = this.goodsObject.purchasePrice*100
      this.goodsObject.sellPrice = this.goodsObject.sellPrice*100
      this.goodsObject.price = this.goodsObject.price*100
      this.goodsObject.state = this.goodsObject.state + ''
      editGoods(this.goodsObject).then(res => {
        this.$message.success('编辑商品成功')
        this.addLoading = false
        window.history.go(-1)
      }).catch(err => {
        this.addLoading = false
        console.log(err)
        this.$message.error("编辑商品失败！")
      })
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleGoodsEdit()
        } else {
          return false
        }
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addGoods()
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      let tempObj ={}
      tempObj.id = this.goodsId

      this.$router.go(-1);
    },
    handleClose(tag) {
      this.ruleForm.tab.splice(this.ruleForm.tab.indexOf(tag), 1)
    },
    showInput() {
      // 标签各数限制
      if(this.ruleForm.tab.length>3){
        this.$message.warning('已超过标签上限，不能继续添加！')
        return
      }
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      // this.ruleForm.tab = []
      // inputValue是输入框绑定值

      // 标签不可重复
      if(this.ruleForm.tab.includes(this.inputValue)){
        this.$message.warning('标签已存在！')
        this.inputVisible = false
        this.inputValue = ''
      }else{
        const inputValue = this.inputValue
        if (inputValue) {
          this.ruleForm.tab.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
      if(this.ruleForm.tab.length>3){
        this.hiddentab = true
      }
    }
  }
}
</script>

<style scoped>
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .changPic{
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
