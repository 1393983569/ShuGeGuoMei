<template>
  <div>
    <!-- 编辑/新建 -->
    <el-dialog :visible="showEdit" :before-close="handleClose" width="1200px" height="700">
      <div class="title-size-color">{{ dialogTitle }}</div><br>
      <div v-if="showState" />
      <div v-else class="size-color">
        <span class="title">店铺ID：</span>&nbsp;
      </div>
      <div class="size-color" style="margin:10px;">
        店铺名称：<el-input v-model="name" style="width:500px;" placeholder="请输入店铺名称" />
      </div>
      <div class="size-color" style="margin:10px;">
        店铺简称：<el-input v-model="simpleName" style="width:500px;" placeholder="请输入店铺简称" />
      </div>

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
        掌柜姓名：<el-input v-model="shopownerName" style="width:300px;" placeholder="请输入店铺图片" />
      </div>
      <div class="size-color" style="margin:10px;">
        手机号：&nbsp;&nbsp;&nbsp; <el-input v-model="shopownerPhone" style="width:300px;" placeholder="请输入手机号" />
      </div>
      <div class="size-color" style="margin:10px;">
        初始密码：<el-input v-model="shopownerPassword" style="width:300px;" placeholder="请输入初始密码" /> <el-button size="mini">重置密码</el-button>
      </div>
      <div class="size-color" style="margin:10px;">
        店铺地址：<selectorAddress />
        <el-input v-model="detailsAddress" style="width:500px;margin-left:88px;margin-top:10px;" placeholder="请输入详细地址" />
      </div>
      <div class="size-color" style="margin:10px;">
        店铺面积：<el-input v-model="area" style="width:200px;" placeholder="请输入店铺面积" /> m&sup2;
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
        <el-select v-model="modelId" style="width:400px;">
          <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div class="size-color" style="margin:10px;">
        成本结构：
      </div>
      <div class="size-color" style="margin:10px;">
        会员人数(人)：
      </div>
      <div v-if="showState" slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="addShopHandle">保存</el-button>
      </div>
      <div v-else slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { addShop } from '@/api/shop.js'
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
      modelId: '',
      modelList: [],
      employeeTable: [],
      categoryTable: [{}],
      // dialogTitle:'',
      dialogImageUrl: '',
      dialogVisible: false,
      name: '',
      simpleName: '',
      shopownerName: '',
      shopownerPhone: '',
      shopownerPassword: '',
      provinceId: '',
      cityId: '',
      countyId: '',
      detailsAddress: '',
      area: '',
      categoryOneIdL: '',
      categoryTwoId: '',
      management: '',
      status: '',
      deleteStatus: ''
    }
  },
  mounted() {

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
      const tempObj = {}
      tempObj.name = this.name
      tempObj.shopownerName = this.shopownerName
      addShop(tempObj).then().catch()
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
