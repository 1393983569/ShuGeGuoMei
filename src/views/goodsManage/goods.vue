<template>
  <div style="margin:20px;">
    <div style="display:flex;flex-direction:row;">
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">状态：</span>
        <el-select v-model="stateId" style="width:100px;">
          <el-option v-for="item in stateList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">一级品类：</span>
        <el-select v-model="firstCategoryId" style="width:100px;">
          <el-option v-for="item in firstCategoryList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">二级品类：</span>
        <el-select v-model="secondCategoryId" style="width:100px;">
          <el-option v-for="item in secondCategoryList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div style="margin:10px;margin-left:400px;">
        <el-button>筛选</el-button>
        <el-button>清空</el-button>
        <el-button @click="handleAdd">添加商品</el-button>
      </div>
    </div>
    <el-table :data="goodsTable" :header-cell-style="tableHeaderColor" style="color:#6e7b99;font-size:18px;font-family:Microsoft YaHei;font-weight:light;border:solid #f0f2ff3;">
      <el-table-column prop="img" label="缩略图" />
      <el-table-column prop="shopId" label="店铺ID" />
      <el-table-column prop="goodsName" label="商品名称" />
      <el-table-column prop="state" label="状态" />
      <el-table-column prop="enterPrice" label="1入价（元/斤）" />
      <el-table-column prop="outPrice" label="2出价（元/斤）" />
      <el-table-column prop="sellPrice" label="3零售价（元/斤）" />
      <el-table-column prop="operate" label="操作" width="400px">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleGrounding(scope.row)">上架</el-button>
          <el-button @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <goodsEdit :show-edit="showEdit" :goods-title="goodsTitle" :show-goods-state="showGoodsState" @isClose="isClose" />
    <goodsDetail :show-detail="showDetail" @closeGoodsDetail="closeGoodsDetail" />
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showGrounding" center width="380px" title="上架商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否上架该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showGrounding = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import goodsEdit from '@/views/goodsManage/goodsEdit.vue'
import goodsDetail from '@/views/goodsManage/goodsDetail.vue'
export default {
  components: {
    goodsEdit, goodsDetail
  },
  data() {
    return {
      stateId: '',
      stateList: [],
      firstCategoryId: '',
      firstCategoryList: [],
      secondCategoryId: '',
      secondCategoryList: [],
      goodsTable: [
        {
          shopId: '6201022001',
          goodsName: '白菜',
          state: '缺货',
          enterPrice: 0.30,
          outPrice: 0.80,
          sellPrice: 1.00
        }
      ],
      imgUrl: '',
      // 商品编辑
      showEdit: false,
      goodsTitle: '',
      showGoodsState: false,
      showDetail: false,
      showDelete: false,
      showGrounding: false
    }
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    },
    isClose(e) {
      this.showEdit = e
    },
    closeGoodsDetail(e) {
      this.showDetail = e
    },
    handleAdd() {
      this.showEdit = true
      this.goodsTitle = '添加商品'
      this.showGoodsState = true
    },
    handleEdit(row) {
      this.showEdit = true
      this.goodsTitle = '编辑'
      this.showGoodsState = false
    },
    handleDetail(row) {
      this.showDetail = true
    },
    handleGrounding(row) {
      this.showGrounding = true
    },
    handleDelete(row) {
      this.showDelete = true
    }
  }
}
</script>
<style>

</style>
