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
            :header-cell-style="tableHeaderColor"
            :data="categoryTable"
            center
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="name" label="一级品类" />
            <el-table-column prop="id" label="一级品类ID">
              <template slot-scope="scope">
                <el-checkbox-group v-model="firstLevel">
                  <el-checkbox :label="scope.row">{{ scope.row.id }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column prop="names" label="二级品类" />
            <el-table-column prop="ids" label="二级品类ID">
              <template slot-scope="scope">
                <el-checkbox-group v-model="list">
                  <el-checkbox :label="scope.row" @change="handlecheck(scope.row)">{{ scope.row.ids }}</el-checkbox>
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
          <el-button @click="cancelHandle('shopForm')">取消</el-button>
          <el-button @click="addShopHandle('shopForm')">保存</el-button>
        </el-form-item>
        <!-- 编辑 -->
        <el-form-item v-else>
          <el-button @click="cancelHandle('shopForm')">取消</el-button>
          <el-button @click="editShopHandle('shopForm')">保存</el-button>
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
      dialogVisible: false
      // shop: {}
    }
  },
  watch: {
    'list'(e) {
      console.log(e, 'eeeeeeee')
    },
    'firstLevel'(e) {
      console.log(e, '==========')
    },
    'editObject.management'(e) {
      console.log(e, 'jjjjjj')
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    handlecheck(row) {
      console.log(row, 'lllll')
      this.editObject.categoryOneId = row.id
      this.editObject.categoryTwoId = row.ids
    },
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex, 'row...')
      // if (columnIndex === 0) {
      //   // 第一列的合并方法
      //   const row1 = this.firstCate[rowIndex];
      //   const col1 = row1 > 0 ? 1 : 0; // 如果被合并了row = 0; 则他这个列需要取消
      //   return {
      //     rowspan: row1,
      //     colspan: col1,
      //   };
      // }
    },
    // 查询品类
    getCategoryList() {
      this.categoryTable = []
      getCategory().then(res => {
        if (res.status === 1) {
          console.log(res.info, 'hhhh')
          this.temp = res.info
          for (const key in res.info) {
            const secondList = res.info[key].seconds
            if (secondList.length > 0) {
              for (const i in secondList) {
                const list = {
                  id: res.info[key].id,
                  name: res.info[key].name,
                  ids: secondList[i].id,
                  names: secondList[i].name
                }
                this.categoryTable.push(list)
              }
            } else {
              this.categoryTable.push(res.info[key])
            }
          }
        }
      }).catch()
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
      // console.log(this.list, 'list.......')
      // this.list.forEach(e => {
      //   this.editObject.categoryOneId = e.id
      //   this.editObject.categoryTwoId = e.ids
      // })
      this.editObject.provinceId = parseInt(this.editObject.provinceId)
      this.editObject.cityId = parseInt(this.editObject.cityId)
      this.editObject.countyId = parseInt(this.editObject.countyId)
      this.editObject.shopownerPhone = parseInt(this.editObject.shopownerPhone)
      this.editObject.shopownerPassword = parseInt(this.editObject.shopownerPassword)
      this.editObject.area = parseInt(this.editObject.area)
      // this.editObject.image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg'
      addShop(this.editObject).then(res => {
        if (res) {
          this.$message.info('操作成功')
          this.handleClose()
          this.editObject = {}
          this.provinceId = ''
          this.cityId = ''
          this.countyId = ''
          this.management = ''
          this.$parent.getShopList()
        } else {
          this.$message.error('操作失败')
          this.editObject = {}
        }
      }).catch(error => {
        this.$message.error(error)
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
        if (res) {
          this.$message.success('操作成功')
          this.$parent.getShopList()
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$data.message.error(error)
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
