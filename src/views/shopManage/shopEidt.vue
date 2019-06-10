<template>
  <div>
    <!-- 编辑/新建 -->
    <el-dialog :visible="showEdit" :before-close="handleClose" width="1200px" height="700">
      <div class="title-size-color">{{ dialogTitle }}</div><br>
      <div v-if="showState" />
      <div v-else class="size-color">
        <span class="size-color">店铺ID：</span>&nbsp;
      </div>
      <div class="size-color" style="margin:10px;">
        店铺名称：<el-input v-model="shop.name" style="width:500px;" placeholder="请输入店铺名称" />
      </div>
      <div class="size-color" style="margin:10px;">
        店铺简称：<el-input v-model="shop.simpleName" style="width:500px;" placeholder="请输入店铺简称" />
      </div>
      <!-- 图片上传 -->
      <div v-if="showState" class="size-color" style="margin:10px;">
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
      <div v-else class="size-color" style="margin:10px;">
        店铺图片：
      </div>
      <div class="size-color" style="margin:10px;">
        掌柜姓名：<el-input v-model="shop.shopownerName" style="width:300px;" placeholder="请输入店铺图片" />
      </div>
      <div class="size-color" style="margin:10px;">
        手机号：&nbsp;&nbsp;&nbsp; <el-input v-model="shop.shopownerPhone" style="width:300px;" placeholder="请输入手机号" />
      </div>
      <div class="size-color" style="margin:10px;">
        初始密码：<el-input v-model="shop.shopownerPassword" style="width:300px;" placeholder="请输入初始密码" /> <el-button size="mini">重置密码</el-button>
      </div>
      <div class="size-color" style="margin:10px;">
        店铺地址：<selectorAddress @getProvince="getProvince" @getCity="getCity" @getCountry="getCountry" />
        <el-input v-model="shop.detailsAddress" style="width:500px;margin-left:88px;margin-top:10px;" placeholder="请输入详细地址" />
      </div>
      <div class="size-color" style="margin:10px;">
        店铺面积：<el-input v-model="shop.area" style="width:200px;" placeholder="请输入店铺面积" /> m&sup2;
      </div>
      <div class="size-color" style="margin:10px;">
        经营品类：
        <el-table :data="categoryTable" border :header-cell-style="tableHeaderColor" :span-method="objectSpanMethod" style="width:700px;">
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
      <div class="size-color" style="margin:10px;">
        职员人数：
        <el-table :data="employeeTable" border :header-cell-style="tableHeaderColor" style="width:400px;">
          <el-table-column prop="num" label="序号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="level" label="职级" />
          <el-table-column prop="phone" label="电话" />
        </el-table>
      </div>
      <div class="size-color" style="margin:10px;">
        经营模式：
        <el-select v-model="shop.modelId" style="width:400px;">
          <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div class="size-color" style="margin:10px;">
        成本结构：
      </div>
      <div class="size-color" style="margin:10px;">
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
    }
  },
  data() {
    return {
      // modelId: 0,
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
      categoryTable: [{}],
      // dialogTitle:'',
      dialogImageUrl: '',
      dialogVisible: false,
      shop: {}
    }
  },
  watch: {
    'shop.modelId'(e) {
      console.log(e, 'hhhhh')
      // this.shop.modelId = Integer.parseInt(e)
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
      console.log(this.shop)
      addShop(this.shop).then(res => {
        if (res) {
          this.$message.info('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    // 编辑店铺
    addEditHandle() {
      editShop().then(res => {
        if (res) {
          this.$message.info('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getProvince(id) {
      this.shop.provinceId = id
    },
    getCity(id) {
      console.log(id, 'cid')
      this.shop.cityId = id
    },
    getCountry(id) {
      console.log(id, 'couid')
      this.shop.countryId = id
    }
  }
}
</script>
<style>
  .item{
    margin: 10px;
    font-size: 18px;
    color:#6e7b99;
    font-family: Microsoft YaHei;
  }
  /* .title{
    margin:10px;
    font-size:18px;
    color:#6e7b99;
    font-weight:bold;

  } */
</style>
