<template>
  <div>
    <!-- 编辑/新建 -->
    <el-dialog :visible="showEdit" :before-close="handleClose" width="1200px" height="700">
      <div class="title-size-color">{{ dialogTitle }}</div><br>
      <div v-if="showState" />
      <div v-else class="size-color div-margin font-weight">
        店铺ID：{{ editObject.id }}
      </div>
      <div class="size-color div-margin font-weight">
        店铺名称：<el-input v-model="editObject.name" style="width:500px;" placeholder="请输入店铺名称" />
      </div>
      <div class="size-color div-margin font-weight">
        店铺简称：<el-input v-model="editObject.simpleName" style="width:500px;" placeholder="请输入店铺简称" />
      </div>
      <!-- 图片上传 -->
      <div v-if="showState" class="size-color div-margin font-weight">
        店铺图片：
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
        店铺图片：<img :src="editObject.imge">
      </div>
      <div class="size-color div-margin font-weight">
        掌柜姓名：<el-input v-model="editObject.shopownerName" style="width:300px;" placeholder="请输入店铺图片" />
      </div>
      <div class="size-color div-margin font-weight">
        手机号：&nbsp;&nbsp;&nbsp; <el-input v-model="editObject.shopownerPhone" style="width:300px;" placeholder="请输入手机号" />
      </div>
      <div class="size-color div-margin font-weight">
        初始密码：<el-input v-model="editObject.shopownerPassword" style="width:300px;" placeholder="请输入初始密码" /> <el-button size="mini">重置密码</el-button>
      </div>
      <div class="size-color div-margin font-weight">
        店铺地址：<selectorAddress :province1id="editObject.provinceId + ''" :city1id="editObject.cityId + ''" :county1id="editObject.countyId + ''" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" /><br>
        <el-input v-model="editObject.detailsAddress" style="width:500px;margin-left:88px;" placeholder="请输入详细地址" />
      </div>
      <div class="size-color div-margin font-weight">
        店铺面积：<el-input v-model="editObject.area" style="width:200px;" placeholder="请输入店铺面积" /> m&sup2;
      </div>
      <div class="size-color div-margin font-weight" style="display:flex;align-items:flex-start;">
        经营品类：
        <el-table :data="categoryTable" border :header-cell-style="tableHeaderColor" :span-method="objectSpanMethod">
          <el-table-column prop="first" label="一级品类" />
          <el-table-column prop="firstId" label="一级品类ID" />
          <el-table-column prop="second" label="二级品类" />
          <el-table-column prop="secondId" label="二级品类ID" />
          <el-table-column prop="operate" label="选择">
            <template>
              <el-checkbox />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="size-color div-margin font-weight" style="display:flex;align-items:flex-start;">
        职员人数：
        <el-table :data="employeeTable" border :header-cell-style="tableHeaderColor">
          <el-table-column prop="num" label="序号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="level" label="职级" />
          <el-table-column prop="phone" label="电话" />
        </el-table>
      </div> -->
      <div class="size-color div-margin font-weight">
        经营模式：
        <el-select v-model="editObject.management" style="width:400px;">
          <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div v-if="showState" />
      <div v-else class="size-color div-margin font-weight">
        成本结构：
      </div>
      <div v-if="showState" />
      <div v-else class="size-color div-margin font-weight">
        会员人数(人)：
      </div>
      <!-- 新建 -->
      <div v-if="showState" slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="addShopHandle">保存</el-button>
      </div>
      <!-- 编辑 -->
      <div v-else slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="addEditHandle">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { addShop, editShop } from '@/api/shop.js'
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
      provinceId: '',
      cityId: '',
      countyId: '',
      modelList: [
        {
          id: 1,
          name: '直营'
        },
        {
          id: 2,
          name: '加盟'
        },
        {
          id: 3,
          name: '供应商'
        }
      ],
      employeeTable: [],
      categoryTable: [],
      // dialogTitle:'',
      dialogImageUrl: '',
      dialogVisible: false
      // shop: {}
    }
  },
  watch: {
    'editObject.management'(e) {
      console.log(e, 'jjjjjj')
    }
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    },
    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        //  return{
        //    rowspan: 2,
        //    colspan: 1
        //  }
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
    handleClose() {
      this.$emit('isClose', false)
    },
    // 添加店铺
    addShopHandle() {
      console.log(this.editObject)

      addShop(this.editObject).then(res => {
        if (res) {
          this.$message.info('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$message.error(error)
        console.log(error)
      })
    },
    // 编辑店铺
    addEditHandle() {
      this.editObject.provinceId = parseInt(this.editObject.provinceId)
      this.editObject.cityId = parseInt(this.editObject.cityId)
      this.editObject.countyId = parseInt(this.editObject.countyId)
      if (this.editObject.management === '直营') {
        this.editObject.management = 1
        // this.editObject = row
      } else if (this.editObject.management === '加盟') {
        this.editObject.management = 2
      } else {
        this.editObject.management = 3
      }
      editShop(this.editObject).then(res => {
        if (res) {
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$data.message.error(error)
      })
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
