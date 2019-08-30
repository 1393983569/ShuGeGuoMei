<template>
  <div>
    <!-- 编辑/新建 -->
    <el-dialog :visible="showEdit" @close="closeEdit" :before-close="handleClose" width="1200px" height="700">
      <div class="title-size-color">{{ dialogTitle }}</div><br>
      <div v-if="showState" />
      <div v-else class=" div-margin font-weight">
        &nbsp;&nbsp;店铺ID：{{ editObject.id }}
      </div>
      <el-form ref="shopForm" :model="shopForm" :rules="rules" label-width="100px">
        <el-form-item label="店铺名称：" prop="name">
          <el-input v-model="shopForm.name" style="width:500px;" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="店铺简称：" prop="simpleName">
          <el-input v-model="shopForm.simpleName" style="width:500px;" placeholder="请输入店铺简称" />
        </el-form-item>
        <el-form-item label="店铺图片：" prop="picture">
          <div class="size-color div-margin font-weight " v-if="showState">
            <el-upload
              :limit= "5"
              :on-exceed="outNumMax"
              :action="`${apiUrl}/basics/upload`"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
            >
              <div slot="tip" class="el-upload__tip">最多上传五张图片</div>
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div v-else style="display:flex;flex-direction:row;">
            <el-upload
              class="avatar-uploader"
              :action="`${apiUrl}/basics/upload`"
              :show-file-list="false"
              :on-success="uploadSuccessEdit"
              v-for="item in imgelist" :key="item"
              >
              <img v-if="item" :src="item" class="avatar" @click="clickImg(item)">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="掌柜姓名：" prop="adminName">
          <el-input v-model="shopForm.adminName" style="width:300px;" placeholder="请输入掌柜姓名" />
        </el-form-item>
        <el-form-item label="手机号：" prop="adminPhone">
          <el-input v-model="shopForm.adminPhone" style="width:300px;" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="初始密码：" prop="adminPassword">
          <el-input v-model="shopForm.adminPassword" style="width:300px;" placeholder="请输入初始密码" /> <el-button size="mini">重置密码</el-button>
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
        </el-form-item>
        <div v-if="showState" />
        <div v-else class="div-margin font-weight">成本结构：</div>
        <div v-if="showState" />
        <div v-else class="div-margin font-weight"> 会员人数：</div>
        <!-- 新建 -->
        <el-form-item v-if="showState">
          <el-button type="warning" @click="cancelHandle('shopForm')">取消</el-button>
          <el-button type="primary" :loading="loadingState" @click="addShopHandle('shopForm')">保存</el-button>
        </el-form-item>
        <!-- 编辑 -->
        <el-form-item v-else>
          <el-button type="warning" @click="cancelHandle('shopForm')">取消</el-button>
          <el-button type="primary" :loading="loadingState" @click="editShopHandle('shopForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { addShop, editShop } from '@/api/shop.js'
import { getCategory } from '@/api/category.js'
export default {
  components: {
    selectorAddress
  },
  props: {
    showEdit: {
      type: Boolean,
      default: false
    },
    showState: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    editObject: {
      type: Object,
      default: Array
    }
  },
  data() {
    return {
      oneState:false,
      twoState:false,
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
        adminPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
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
      // categoryJsonList:[],
    }
  },
  watch: {
    'editObject'(e) {
      if(e.imge){
        this.imgelist = e.imge.split(',')
      }
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
        for(let i=0;i<this.categoryTable.length;i++){
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
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    this.getCategoryList()
    this.handleClose()
  },
  methods: {
    clickImg(e) {
      this.imgelist.forEach((el, key) => {
        if(el === e) {
          this.key = key
        }
      })
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
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess(file){
      this.shopImg += file.info+','
    },
    uploadSuccessEdit(file) {
      this.imgelist[this.key] = file.info
      this.$forceUpdate()
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
      this.shopForm.adminPassword = parseInt(this.shopForm.adminPassword)
      this.shopForm.area = parseInt(this.shopForm.area)
      let arr = this.handleJson(this.finalArray)
      this.shopForm.categoryJson = JSON.stringify(arr)
      this.shopForm.imge = this.shopImg.substring(0, this.shopImg.length-1)
      addShop(this.shopForm).then(res => {
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
        this.$parent.getShopList()
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
      this.shopForm.adminPassword = parseInt(this.shopForm.adminPassword)
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
        this.$message.success('操作成功')
        this.loadingState = false
        this.handleClose()
        this.$parent.getShopList()
      }).catch(error => {
        console.log(error)
        this.$message.error('编辑商铺失败！')
      })
    },
    addShopHandle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //
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
</style>


