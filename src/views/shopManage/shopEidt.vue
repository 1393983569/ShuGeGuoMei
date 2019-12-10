<template>
  <div>
    <!-- 编辑/新建 -->
    <!-- <el-dialog :visible="showEdit" @close="closeEdit" :before-close="handleClose" width="1200px" height="700"> -->
      <breadcrumb :stateShow="breadState">
        <!-- 新建 -->
        <div v-if="showState">
          <el-button size="mini" type="primary" :loading="loadingState" @click="addShopHandle('shopForm')">保存</el-button>
          <el-button size="mini" type="warning" @click="cancelHandle('shopForm')">取消</el-button>
        </div>
        <!-- 编辑 -->
        <div v-else>
          <el-button size="mini" type="primary" :loading="loadingState" @click="editShopHandle('shopForm')">保存</el-button>
          <el-button size="mini" type="warning" @click="cancelHandle('shopForm')">取消</el-button>
        </div>
      </breadcrumb>
      <!-- <div v-if="showState" />
      <div v-else class=" div-margin font-weight">
        &nbsp;&nbsp;店铺ID：{{ }}
      </div> -->
      <el-form ref="shopForm" :model="shopForm" :rules="rules" label-width="100px">
        <el-form-item v-if="showState"></el-form-item>
        <el-form-item v-else label="店铺ID：">
          <span>{{shopForm.id}}</span>
        </el-form-item>
        <el-form-item label="店铺名称：" prop="name">
          <el-input v-model="shopForm.name" style="width:500px;" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="店铺简称：" prop="simpleName">
          <el-input v-model="shopForm.simpleName" style="width:500px;" placeholder="请输入店铺简称" />
        </el-form-item>
        <el-form-item label="店铺图片：" prop="picture">
          <!-- 添加上传图片 -->
          <div v-if="showState">
            <el-upload
              :limit= "5"
              :on-exceed="outNumMax"
              :action="`${apiUrl}/basics/upload`"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <!-- <div slot="tip" class="el-upload__tip">最多上传五张图片</div> -->
              <i class="el-icon-close" v-if="addDiabled"/>
              <i class="el-icon-plus" v-else/>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <p style="font-size:12px;color:#606266;margin-top: 7px;color:red;text-align: left;" v-if="addDiabled">图片已达到上限</p>
            <p style="font-size:12px;color:#606266;margin-top: 7px;text-align: left;" v-else>最多上传五张图片</p>
          </div>

          <!-- 编辑修改图片 -->
          <div v-else>
            <el-upload
              :limit= "5"
              :on-exceed="outNumMax"
              :action="`${apiUrl}/basics/upload`"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list ="fileList"
            >
              <i class="el-icon-close" v-if="editDiabled"/>
              <i class="el-icon-plus" v-else/>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <p style="font-size:12px;color:#606266;margin-top: 7px;color:red;text-align: left;" v-if="editDiabled">图片已达到上限</p>
            <p style="font-size:12px;color:#606266;margin-top: 7px;text-align: left;" v-else>最多上传五张图片</p>
          </div>
        </el-form-item>
        <el-form-item label="掌柜姓名：" prop="adminName">
          <el-input v-model="shopForm.adminName" style="width:300px;" placeholder="请输入掌柜姓名" />
        </el-form-item>
        <el-form-item label="手机号：" prop="adminPhone">
          <el-input v-model="shopForm.adminPhone" style="width:300px;" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="初始密码：" prop="adminPassword">
          <el-input v-model="shopForm.adminPassword" style="width:300px;" placeholder="请输入初始密码" />
        </el-form-item>
        <el-form-item label="店铺地址：" prop="detailsAddress">
          <selectorAddress :province1id="shopForm.provinceId+''" :city1id="shopForm.cityId+''" :county1id="shopForm.countyId+''" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" /><br>
          <el-input v-model="shopForm.detailsAddress" style="width:500px;margin-top:10px;" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="店铺面积：" prop="area">
          <el-input v-model="shopForm.area" style="width:200px;" placeholder="请输入店铺面积" /> m&sup2;
        </el-form-item>
        <el-form-item label="经营模式：" prop="management">
          <el-select v-model="shopForm.management" style="width:400px;">
            <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="经营品类：" prop="category">
          <virtual-list :remain="9" :size="70">
            <el-table
              :data="categoryTable"
              center
              border
              :span-method="arraySpanMethod"
            >
              <el-table-column prop="childrenName" label="一级品类">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status" :label="scope.row.childrenId" @change="changeOneCate(scope.row)">{{ scope.row.childrenName }}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="childrenId" label="一级品类ID">
                <template slot-scope="scope">
                  <p>{{ scope.row.childrenId }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="二级品类">
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="二级品类ID">
                <template slot-scope="scope">
                  <el-checkbox v-if="scope.row.id!==''" v-model="scope.row.state" :label="scope.row" @change="changeTowCate(scope.row)">{{ scope.row.id }}</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </virtual-list>
        </el-form-item>
        <!-- 职员人数 -->
        <el-form-item label="职员人数：" v-if="!showState">
          ({{staffData.length}}人)
          <staff :staffTable="staffData"></staff>
        </el-form-item>
        <!-- 成本结构 -->
        <el-form-item label="成本结构：" v-if="!showState">
          <costTable :costObject="costObject"></costTable>
        </el-form-item>
        <!-- 会员人数 -->
        <el-form-item label="会员人数：" v-if="!showState">
          {{this.editObject.members}}人
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import costTable from './costTable.vue'
import staff from './staff.vue'
import virtualList from 'vue-virtual-scroll-list'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { addShop, editShop } from '@/api/shop.js'
import { getCategory } from '@/api/category.js'
import { stringify } from 'querystring';
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name:'shopEidt',
  components: {
    selectorAddress, staff,Breadcrumb, virtualList,costTable
  },
  data() {
    // 手机号码验证
    var checkPhone = (rule, value, callback) => {
      // const phoneReg = /d{11}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if(value.length===11){
            callback()
          }else{
            callback(new Error('电话号码长度有误！'))
          }
        }
      }, 100)
    };
    return {
      // 职员数组
      staffData:[],
      // 成本结构
      costObject:{},

      editDiabled:false,
      addDiabled:false,
      breadState:false,
      showState:false,
      oneState:false,
      twoState:false,
      fileList:[],
      indeterminate: true,
      finalArray: [],
      addCategoryObj: {},
      firstcategory: [],
      isIndeterminate: true,
      checkAll: [],
      checkedCategory: [],
      loadingState: false,
      // 确定不能为空
      shopForm: {
        provinceId: '',
        cityId: '',
        countyId: '',
        name: '',
        simpleName: '',
        picture: '',
        adminName: '',
        adminPhone: '',
        adminPassword: '',
        detailsAddress: '',
        area: '',
        // category: '',
        cost: '',
        management: '',
        vipnum: ''
      },
      rules: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        simpleName: [{ required: true, message: '请输入店铺简称', trigger: 'blur' }],
        // picture: [{ required: true, message: '请上传店铺图片', trigger: 'blur' }],
        adminName: [{ required: true, message: '请输入掌柜姓名', trigger: 'blur' }],
        adminPhone: [{ required: true,validator: checkPhone,trigger: 'blur' }],
        adminPassword: [{ required: true, message: '请输入初始密码', trigger: 'blur' }],
        detailsAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        area: [{ required: true, message: '请输入店铺面积', trigger: 'blur' }],
        // category: [{ required: true, message: '请输经营品类', trigger: 'blur' }],
        management: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },

      list: [],
      checked: false,
      modelList: [
        {
          id: 1,
          name: '直营'
        },
        {
          id: 2,
          name: '加盟'
        }
      ],
      employeeTable: [],
      categoryTable: [],
      firstLevel: [],
      // dialogTitle:'',
      dialogImageUrl: '',
      dialogVisible: false,
      mergeList: [],
      position: 0,
      // shop: {}
      categoryArray: [],
      apiUrl: '',
      shopImg: '',
      imgelist: [],
      imageUrl: '',
      key:0,
      reFresh:true,
      // 员工数据
      staffTables:[],
      // 上传图片个数限制状态
      imgState:true,
      editObject:{},
    }
  },
  watch: {
    'categoryTable'(e){
      if(e){
        if(this.showState){

        }else{
          this.editObjectHandle(this.editObject)
        }
      }
    },
  },
  mounted() {
    this.getCategoryList()
    if(JSON.stringify(this.$route.params)!== '{}'){
      this.editObject= this.$route.params
      this.staffData = this.editObject.shopStaffList
      console.log(this.editObject.profitLossDomain, 'stafff,,,,,')
      this.costObject=this.editObject
      if(this.$route.params.imge){
        let e = this.$route.params
        this.fileList = []
        this.imgelist = e.imge.split(',')
        this.imgelist.map(url => {
          if(url){
            let ob = {}
            ob.url = url
            this.fileList.push(ob)
          }
        })
        if(this.fileList.length>=5){
          this.imgState = false
          this.editDiabled = true
        }else{
          this.imgState = true
          this.editDiabled = false
        }
      }
    }else{
      this.editObject = ''
      this.showState = true
    }
    this.apiUrl = process.env.VUE_APP_BASE_API

  },
  methods: {
    // 品类编辑的时候回显
    editObjectHandle(e) {
      // if(e.imge){
      //   this.fileList = []
      //   this.imgelist = e.imge.split(',')
      //   this.imgelist.map(url => {
      //     if(url){
      //       let ob = {}
      //       ob.url = url
      //       this.fileList.push(ob)
      //     }
      //   })
      //   if(this.fileList.length>=5){
      //     this.imgState = false
      //   }
      // }
      this.staffTables = e.shopStaffList
      // 品类的回显
      this.shopForm = e
       for(let n=0; n<this.categoryTable.length;n++){
         this.categoryTable[n].state = false
         this.categoryTable[n].status = false
       }
      if(e.categoryJson){
        let cateArr = []
        cateArr = this.recursionTableData(JSON.parse(e.categoryJson))
        let idArr= []
        let childrenIdArr = []
        cateArr.map(e => {
          idArr.push(e.id)
          childrenIdArr.push(e.childrenId)
        })
        for(let i=0; i<this.categoryTable.length; i++){
          if(this.categoryTable[i].id){
            if(idArr.includes(this.categoryTable[i].id)){
              this.categoryTable[i].status = true
              this.categoryTable[i].state = true
            }
          }else{
            if(childrenIdArr.includes(this.categoryTable[i].childrenId)){
              this.categoryTable[i].status = true
              this.categoryTable[i].state = true
            }
          }
        }
      }
    },
    clickImg(e) {
      this.imgelist.forEach((el, key) => {
        if(el === e) {
          this.key = key
        }
      })
    },
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 1;
      if (!isLt20M) {
        this.$message.error('上传图片的大小不能超过 1M!');
        return false
      }
      // 限制图片上传个数
      // console.log(this.imgelist, 'length......')
      if(this.imgelist.length>=5){
        // console.log('chaoguo2........')
        this.imgState = false
        return false
      }
    },
    changeOneCate(row){
      for(let i=0;i<this.categoryTable.length;i++){
        if(this.categoryTable[i].childrenId === row.childrenId&&(row.status)){
          this.categoryTable[i].state = true
        }else if(this.categoryTable[i].childrenId === row.childrenId&&(!row.status)){
          this.categoryTable[i].state = false
        }
      }
    },
    // 二级品类勾选
    changeTowCate(row){
      if(row.state){
        for(let i=0;i<this.categoryTable.length;i++){
          if(this.categoryTable[i].childrenId === row.childrenId){
            this.categoryTable[i].status = true
          }
        }
      }else{
        for(let i=0;i<this.categoryTable.length;i++){
          this.categoryTable[i].status = false
          if(this.categoryTable[i].state) {
            this.categoryTable[i].status = true
          }
        }
      }
    },
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowData = this.mergeList[rowIndex]
        const colData = rowData > 0 ? 1 : 0
        return {
          rowspan: rowData,
          colspan: colData
        }
      }
      if (columnIndex === 1) {
        const rowData = this.mergeList[rowIndex]
        const colData = rowData > 0 ? 1 : 0
        return {
          rowspan: rowData,
          colspan: colData
        }
      }
    },
    // 递归单元格
    recursionTableData(arr) {
      const res = []
      arr.forEach((item, index) => {
        let data = {}
        if (item.seconds && item.seconds.length) {
          for (const secondsItem of item.seconds) {
            data = {
              childrenId: item.id,
              childrenName: item.name,
              id: secondsItem.id,
              name: secondsItem.name,
              categoryOneId: secondsItem.categoryOneId,
              state: false,
              status:false
            }
            res.push(data)
          }
          this.recursionTableData(item.seconds)
        } else {
          data = {
            childrenId: item.id,
            childrenName: item.name,
            id: '',
            name: '',
            categoryOneId: '',
            state: false,
            status:false
          }
          res.push(data)
        }
      })
      return res
    },
    // 生成合并数组
    getMergeList() {
      this.mergeList = []
      this.categoryTable.forEach((item, index) => {
        if (index === 0) {
          this.mergeList.push(1)
          this.position = index
        } else {
          if (item.childrenId === this.categoryTable[index - 1].childrenId) {
            this.mergeList[this.position] += 1
            this.mergeList.push(0)
          } else {
            this.mergeList.push(1)
            this.position = index
          }
        }
      })
    },
    // 查询品类
    getCategoryList() {
      this.categoryTable = []
      getCategory().then(res => {
        this.firstcategory = res.info
        this.temp = res.info
        this.categoryTable = this.recursionTableData(res.info)
        this.getMergeList()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    //  上传图片
    handleRemove(file, fileList) {
      this.imgelist = []
      fileList.map(item => {
        this.imgelist.push(item.url)
      })
      if(this.imgelist.length>=5){
        this.addDiabled = true
        this.editDiabled = true
      }else{
        this.addDiabled = false
        this.editDiabled = false
      }
      // console.log(file, fileList, 'jsjsjsjsjsjsj')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess(response, file, fileList){
      // console.log(response, 'respo.....')
      this.imgelist.push(file.response.info)
      if(this.imgelist.length>=5){
        this.addDiabled = true
        this.editDiabled = true
      }else{
        this.addDiabled = false
        this.editDiabled = false
      }
    },
    handleEditPreview(e){
      // console.log(e, 'fffffff')
    },
    // 编辑添加 品类Json处理
    handleJson(row){
      let categoryJsonList = []
      let temp = []
      row.map(item => {
        temp.push(item.childrenId)
      })
      let uniqueArr = this.unique(temp)
      for(let i=0; i<uniqueArr.length; i++){
        let cateOne = {}
        cateOne.seconds = []
        for(let j=0; j<row.length; j++){
          if(uniqueArr[i]===row[j].childrenId){
            cateOne.id = row[j].childrenId
            cateOne.name = row[j].childrenName
            if(row[j].id !==''){
              let two = {}
              two.id = row[j].id
              two.name = row[j].name
              cateOne.seconds.push(two)
            }else{
              cateOne.seconds = []
            }
          }
        }
        categoryJsonList.push(cateOne)
      }
      return categoryJsonList
    },
    // 去重处理
    unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i])===-1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    },
    // 添加店铺
    addShopHandles() {
      this.finalArray = []
      this.categoryTable.forEach(item => {
        if(item.state){
          this.finalArray.push(item)
        }
      })
      this.loadingState = true
      // 添加多个category

      this.shopForm.provinceId = parseInt(this.shopForm.provinceId)
      this.shopForm.cityId = parseInt(this.shopForm.cityId)
      this.shopForm.countyId = parseInt(this.shopForm.countyId)
      this.shopForm.adminPhone = parseInt(this.shopForm.adminPhone)
      // this.shopForm.adminPassword = parseInt(this.shopForm.adminPassword)
      this.shopForm.adminPassword = this.shopForm.adminPassword
      this.shopForm.area = parseInt(this.shopForm.area)
      let arr = this.handleJson(this.finalArray)
      this.shopForm.categoryJson = JSON.stringify(arr)
      this.shopForm.imge = this.imgelist.toString()
      // return
      addShop(this.shopForm).then(res => {
        if(res.status === 1){
          this.$message.success('操作成功')
          this.loadingState = false
          this.showEdit = false
          this.handleClose()
          this.provinceId = ''
          this.finalArray = []
          this.checkAll = []
          this.checkedCategory = []
          this.management = ''
          this.shopImg = ''
          this.$router.back()
        }
      }).catch(error => {
        this.$message.error('添加商铺失败！')
        console.log(error)
        this.loadingState = false
      })
    },
    // 编辑店铺
    editShopHandle() {
      this.finalArray=[]
      this.categoryTable.forEach(item => {
        if(item.state){
          this.finalArray.push(item)
        }
      })
      let cateArray = this.handleJson(this.finalArray)
      this.loadingState = true
      this.shopForm.provinceId = parseInt(this.shopForm.provinceId)
      this.shopForm.cityId = parseInt(this.shopForm.cityId)
      this.shopForm.countyId = parseInt(this.shopForm.countyId)
      this.shopForm.adminPhone = parseInt(this.shopForm.adminPhone)
      // this.shopForm.adminPassword = parseInt(this.shopForm.adminPassword)
      this.shopForm.adminPassword = this.shopForm.adminPassword
      this.shopForm.area = parseInt(this.shopForm.area)
      if (cateArray.length > 0) {
        this.shopForm.categoryJson = JSON.stringify(cateArray)
      }
      if (this.shopForm.management === '直营') {
        this.shopForm.management = 1
      } else {
        this.shopForm.management = 2
      }
      this.shopForm.imge = this.imgelist.toString()
      editShop(this.shopForm).then(res => {
        if(res.status === 1){
           this.$message.success('操作成功')
          this.loadingState = false
          this.handleClose()
          this.$router.back()
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('编辑商铺失败！')
      })
    },
    addShopHandle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addShopHandles()
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.$emit('isClose', false)
    },
    cancelHandle(formName) {
      this.$refs[formName].resetFields()
      // 取消添加或编辑
      this.handleClose()
      this.$router.back()
    },
    getProvince(id) {
      this.shopForm.provinceId = id
    },
    getCity(id) {
      this.shopForm.cityId = id
    },
    getCounty(id) {
      this.shopForm.countyId = id
    },
    outNumMax() {
      this.$message.info('只能上传5张图片！')
    },
    closeEdit() {
      this.$emit('closeHandle', false)
    },
  }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .change-img{
    width:100px;
    height:30px;
    color:#ffffff;
    position:absolute;
    right:0px;top:0px;
    background-color:#8c939d;
    margin:0px;
    border-radius:10%;
    line-height: 30px;

  }
</style>


