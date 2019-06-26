<template>
  <div>
    <!-- 编辑/新建 -->
    <el-dialog :visible="showEdit" :before-close="handleClose" width="1200px" height="700">
      <div class="title-size-color">{{ dialogTitle }}</div><br>
      <div v-if="showState" />
      <div v-else class="size-color div-margin font-weight">
        店铺ID：{{ editObject.id }}
      </div>
      <el-form ref="shopForm" :model="shopForm" :rules="rules" label-width="100px">
        <el-form-item label="店铺名称：" prop="name">
          <el-input v-model="editObject.name" style="width:500px;" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="店铺简称：" prop="simpleName">
          <el-input v-model="editObject.simpleName" style="width:500px;" placeholder="请输入店铺简称" />
        </el-form-item>
        <el-form-item label="店铺图片：" prop="picture">
          <div v-if="showState" class="size-color div-margin font-weight">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div v-else class="size-color div-margin font-weight">
            <img :src="editObject.imge">
          </div>
        </el-form-item>
        <el-form-item label="掌柜姓名：" prop="shopownerName">
          <el-input v-model="editObject.shopownerName" style="width:300px;" placeholder="请输入掌柜姓名" />
        </el-form-item>
        <el-form-item label="手机号：" prop="shopownerPhone">
          <el-input v-model="editObject.shopownerPhone" style="width:300px;" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="初始密码：" prop="shopownerPassword">
          <el-input v-model="editObject.shopownerPassword" style="width:300px;" placeholder="请输入初始密码" /> <el-button size="mini">重置密码</el-button>
        </el-form-item>
        <el-form-item label="店铺地址：" prop="detailsAddress">
          <selectorAddress :province1id="editObject.provinceId+''" :city1id="editObject.cityId+''" :county1id="editObject.countyId+''" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" /><br>
          <el-input v-model="editObject.detailsAddress" style="width:500px;margin-top:10px;" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="店铺面积：" prop="area">
          <el-input v-model="editObject.area" style="width:200px;" placeholder="请输入店铺面积" /> m&sup2;
        </el-form-item>
        <el-form-item label="经营品类：" prop="category">
          <el-table
            :data="categoryTable"
            center
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="id" label="一级品类">
              <template slot-scope="scope">
                <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(scope.row)">{{ scope.row.childrenName }}</el-checkbox> -->
                <el-checkbox-group v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange(scope.row)">
                  <el-checkbox :label="scope.row">{{ scope.row.childrenName }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="一级品类ID">
              <template slot-scope="scope">
                <p>{{ scope.row.childrenId }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="二级品类">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="ids" label="二级品类ID">
              <template slot-scope="scope">
                <el-checkbox-group v-show="scope.row.id" v-model="checkedCategory" @change="handleCheckedCategoryChange">
                  <el-checkbox :label="scope.row">{{ scope.row.id }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="经营模式：" prop="management">
          <el-select v-model="editObject.management" style="width:400px;">
            <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <div v-if="showState" />
        <div v-else class="size-color div-margin font-weight">成本结构：</div>
        <div v-if="showState" />
        <div v-else class="size-color div-margin font-weight"> 会员人数：</div>
        <!-- 新建 -->
        <el-form-item v-if="showState">
          <el-button type="warning" @click="cancelHandle('shopForm')">取消</el-button>
          <el-button type="primary" @click="addShopHandle('shopForm')">保存</el-button>
          <el-button type="primary" @click="getFirstCategory()">########</el-button>
        </el-form-item>
        <!-- 编辑 -->
        <el-form-item v-else>
          <el-button type="warning" @click="cancelHandle('shopForm')">取消</el-button>
          <el-button type="primary" @click="editShopHandle('shopForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { addShop, editShop } from '@/api/shop.js'
import { getCategory } from '@/api/category.js'
// import { filter } from 'minimatch';
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
      finalArray: [],
      addCategoryObj: {},
      firstcategory: [],
      isIndeterminate: true,
      checkAll: [],
      checkedCategory: [],
      // 确定不能为空
      shopForm: {
        name: '',
        simpleName: '',
        picture: '',
        shopownerName: '',
        shopownerPhone: '',
        shopownerPassword: '',
        detailsAddress: '',
        area: '',
        category: '',
        cost: '',
        management: '',
        vipnum: ''
      },
      rules: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        simpleName: [{ required: true, message: '请输入店铺简称', trigger: 'blur' }],
        picture: [{ required: true, message: '请上传店铺图片', trigger: 'blur' }],
        shopownerName: [{ required: true, message: '请输入掌柜姓名', trigger: 'blur' }],
        shopownerPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        shopownerPassword: [{ required: true, message: '请输入初始密码', trigger: 'blur' }],
        detailsAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        area: [{ required: true, message: '请输入店铺面积', trigger: 'blur' }],
        category: [{ required: true, message: '请输经营品类', trigger: 'blur' }],
        // cost: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        // vipnum: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        management: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      provinceId: '',
      cityId: '',
      countyId: '',
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
      categoryArray: []
    }
  },
  watch: {
    'list'(list) {
      console.log(list, 'eeeeeeee')
      // let index= 0
      // let obj = {}
      // obj.arr = []
      // for(let i = 0;i<list.length; i++) {
      //   if(list[index].id === list[i].id) {
      //     obj.id = list[index].id
      //     obj.name = list[index].name
      //     let item = {}
      //     item.ids = list[i].ids
      //     item.names = list[i].names
      //     obj.arr.push(item)
      //     console.log(item)
      //   }else{
      //     index= i
      //   }
      // }
      // this.categoryArray.push(obj)
      // console.log(this.categoryArray, '*********')
    },
    'firstLevel'(e) {
      console.log(e, '==========')
    },
    'editObject.management'(e) {
      console.log(e, 'jjjjjj')
    },
    'editObject'(e) {
      console.log(e, '^^^^^^^^^^^')
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    getFirstCategory() {
      this.firstcategory.forEach((e, index) => {
        const array = this.checkedCategory.filter(a => {
          return e.id === a.childrenId
        })
        const secondCategory = []
        if (array.length > 1) {
          // 有子类
          array.forEach(item => {
            const cateItem = {}
            cateItem.id = item.id
            cateItem.name = item.name
            secondCategory.push(cateItem)
          })
          this.addCategoryObj.id = array[0].childrenId
          this.addCategoryObj.name = array[0].childrenName
          this.addCategoryObj.seconds = secondCategory
          this.finalArray.push(this.addCategoryObj)
        } else if (array.length === 1) {
          // 无子类
          this.addCategoryObj.id = array[0].childrenId
          this.addCategoryObj.name = array[0].childrenName
          this.addCategoryObj.seconds = []
          this.finalArray.push(this.addCategoryObj)
        }
      })
    },
    handleCheckAllChange(row) {
      this.checkedCategory = []
      this.checkAll.forEach(e => {
        if (e.id) {
          const categoryOneId = e.categoryOneId
          // 返回两次
          const tem = this.categoryTable.filter(function(item) {
            return item.categoryOneId === categoryOneId
          })
          this.checkedCategory = this.checkedCategory.concat(tem)
        } else {
          const obj = {}
          obj.childrenId = e.childrenId
          obj.childrenName = e.childrenName
          this.checkedCategory.push(obj)
        }
      })
      this.isIndeterminate = false
    },
    handleCheckedCategoryChange(value) {
      this.checkedCategory = value
      console.log(this.checkedCategory, 'checked.......')
    },
    checkedFunction(row) {
      console.log(row, 'hhhhhhhhhhhhhh')
    },
    handlecheck(row) {
      // console.log(row, 'lllll')
      this.editObject.categoryOneId = row.id
      this.editObject.categoryTwoId = row.ids
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
              categoryOneId: secondsItem.categoryOneId
            }
            res.push(data)
          }
          this.recursionTableData(item.seconds)
        } else {
          data = {
            childrenId: item.id,
            childrenName: item.name
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
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    },
    //  上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加店铺
    addShopHandles() {
      // 添加多个category
      this.editObject.provinceId = parseInt(this.editObject.provinceId)
      this.editObject.cityId = parseInt(this.editObject.cityId)
      this.editObject.countyId = parseInt(this.editObject.countyId)
      this.editObject.shopownerPhone = parseInt(this.editObject.shopownerPhone)
      this.editObject.shopownerPassword = parseInt(this.editObject.shopownerPassword)
      this.editObject.area = parseInt(this.editObject.area)
      // this.editObject.image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg'
      addShop(this.editObject).then(res => {
        this.$message.info('操作成功')
        this.handleClose()
        this.editObject = {}
        this.provinceId = ''
        this.cityId = ''
        this.countyId = ''
        this.management = ''
        this.$parent.getShopList()
      }).catch(error => {
        this.$message.error('添加商铺失败！')
        console.log(error)
      })
    },
    // 编辑店铺
    editShopHandle() {
      this.editObject.provinceId = parseInt(this.editObject.provinceId)
      this.editObject.cityId = parseInt(this.editObject.cityId)
      this.editObject.countyId = parseInt(this.editObject.countyId)
      if (this.editObject.management === '直营') {
        this.editObject.management = 1
        // this.editObject = row
      } else {
        this.editObject.management = 2
      }
      editShop(this.editObject).then(res => {
        this.$message.success('操作成功')
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
      this.editObject.provinceId = id
    },
    getCity(id) {
      this.editObject.cityId = id
    },
    getCounty(id) {
      this.editObject.countyId = id
    }
  }
}
</script>
<style>

</style>
