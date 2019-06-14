<template>
  <div class="body-margin">
    <div style="display:float;flex-direction: row;align-items: center;">
      <selectorAddress @getProvince="getProvince" @getCity="getCity" @getCountry="getCountry" />
      <span class="item">经营模式:</span>
      <el-select v-model="modelId" style="width:100px;">
        <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <span class="item">排序:</span>
      <el-select v-model="orderId" style="width:100px;">
        <el-option v-for="item in orderList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="float:right;">
        <el-button>筛选</el-button>
        <el-button>清空</el-button>
        <el-button @click="handleAdd">新建</el-button>
      </div>
    </div>
    <div style="margin:10px;">
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        :data="shopTable"
        center
        stripe
        style="color:#6e7b99;font-size:18px;font-family:Microsoft YaHei;font-weight:light;border:solid #f0f2ff3;"
      >
        <el-table-column prop="shopId" label="店铺ID" width="200px" />
        <el-table-column prop="shopShortName" label="店铺简称" />
        <el-table-column prop="shopName" label="店铺名称" />
        <el-table-column prop="vipNum" label="会员数" />
        <el-table-column prop="manageModel" label="经营模式" />
        <el-table-column prop="managerName" label="掌柜姓名" />
        <el-table-column prop="employeeNum" label="职员人数" />
        <el-table-column prop="operate" label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleStart(scope.row)">启用</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 店铺编辑 -->
    <shop-edit :show-edit="showEdit" :show-state="showState" :dialog-title="dialogTitle" @isClose="isClose" />
    <!-- 店铺详情 -->
    <shop-detail :show-detail="showDetail" @isCloseDetail="isCloseDetail" />
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showStart" center width="380px" title="启用店铺" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否启用该店铺？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showStart = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import shopEdit from './shopEidt.vue'
import shopDetail from './shopDetail.vue'
import { getShopList } from '@/api/shop.js'
export default {
  components: {
    selectorAddress, shopEdit, shopDetail
  },
  data() {
    return {
      showEdit: false,
      showState: false,
      showDelete: false,
      showStart: false,
      showDetail: false,
      shopTable: [
        {
          shopId: '6201022001',
          shopShortName: '万达店',
          shopName: '天水路22号万达店铺',
          vipNum: 300,
          manageModel: '直营',
          managerName: '夏洛特',
          employeeNum: 2
        },
        {
          shopId: '6201022001',
          shopShortName: '万达店',
          shopName: '天水路22号万达店铺',
          vipNum: 200,
          manageModel: '直营',
          managerName: '马冬梅',
          employeeNum: 4
        }
      ],
      modelId: '',
      orderId: '',
      orderList: [],
      modelList: [],
      dialogTitle: '',
      provinceId: '',
      cityId: '',
      countryId: '',
      pageNum: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.getShopList()
  },
  methods: {
    // 查询店铺列表
    getShopList() {
      getShopList(this.pageNum, this.pageSize).then(res => {
        console.log(res, 'rrrrr')
        if (res.status === 1) {
          this.shopTable = res.info.records
        } else {
          this.$message.info('查询失败')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      // return 'background-color: pink'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
    },
    handleAdd() {
      this.showEdit = true
      this.showState = true
      this.dialogTitle = '新建'
    },
    handleDelete(row) {
      this.showDelete = true
    },
    handleStart(row) {
      this.showStart = true
    },
    handleEdit(row) {
      this.showEdit = true
      this.showState = false
      this.dialogTitle = '编辑'
      // this.$router.push({ path:'/'})
    },
    handleDetail(row) {
      this.showDetail = true
    },
    isCloseDetail() {
      this.showDetail = false
    },
    getProvince(e) {
      // console.log(e, 'llll')
      this.provinceId = e
    },
    getCity(e) {
      this.cityId = e
    },
    getCountry(e) {
      this.countryId = e
    },
    isClose(e) {
      this.showEdit = e
    }
  }
}
</script>
<style>
.d{
  display: inline;
  flex-direction: row;
}
.item{
  font-size:18px;
  color:#6e7b99;
  font-weight:bold;
}
</style>
