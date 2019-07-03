<template>
  <div>
    <breadcrumb>
      <el-button @click="addGoods">添加商品</el-button>
    </breadcrumb>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#f0f2f3', }"
      center
      stripe
    >
      <el-table-column
        label="缩略图"
      >
        <template slot-scope="scope">
          <img :src="scope.row.smallImg" style="width: 80px; height: 80px">
        </template>
      </el-table-column>
      <el-table-column label="店铺ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="状态" prop="state" />
      <el-table-column label="进价(元/斤)" prop="purchasePrice" />
      <el-table-column label="出价(元/斤)" prop="sellPrice" />
      <el-table-column label="零售价(元/斤)" prop="price" />
      <el-table-column
        label="操作"
        width="350"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="viewDetails(scope.row)"
          >查看详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleShelf(scope.row)"
          >{{ titleShelf = scope.row.is_shelf === 1? '上架':'下架' }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 15]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--删除商品-->
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="confirmDelete">确定</el-button>
      </div>
    </el-dialog>
    <!--上下架商品-->
    <el-dialog :visible.sync="showShelf" center width="380px" :title="`${titleShelf}商品`" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否{{ titleShelf }}该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showShelf = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="confirmShelf">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getGoodsList, deleteGoods, shelfGoods, seeDetailsGoods } from '@/api/collectShop.js'
export default {
  name: 'CollectShop',
  components: { Breadcrumb },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      state: '',
      categoryOneId: '',
      categoryTwoId: '',
      showDelete: false,
      showShelf: false,
      id: '',
      titleShelf: '',
      detailObj: {}
    }
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    // 查询商品列表
    getGoodsList() {
      this.tableData = []
      getGoodsList(this.pageNum, this.pageSize, this.state, this.categoryOneId, this.categoryTwoId).then(res => {
        // console.log(res, 'res,,,,,')
        if (res.info.records.length > 0) {
          this.total = res.info.totalrecord
          res.info.records.forEach(e => {
            e.state = e.state === 0 ? '有货' : '缺货'
            this.tableData.push(e)
          })
        } else {
          this.$message.warning('暂无商品')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询商品出错')
      })
    },
    // 删除商品
    handleDelete(row) {
      this.id = row.id
      this.showDelete = true
    },
    confirmDelete() {
      deleteGoods(this.id).then(res => {
        this.$message.success('删除成功')
        this.showDelete = false
        this.getGoodsList()
      }).catch(err => {
        console.log(err)
        this.$message.error('删除商品失败')
      })
    },
    // 上下架商品
    handleShelf(row) {
      this.id = row.id
      this.showShelf = true
      if (row.is_shelf) {
        this.titleShelf = '上架'
        this.isShelf = '0'
      } else {
        this.titleShelf = '下架'
        this.isShelf = 1
      }
      console.log(row, 'ggggg')
    },
    confirmShelf() {
      shelfGoods(this.id, this.isShelf).then(res => {
        this.$message.success(this.titleShelf + '成功！')
        this.showShelf = false
        this.getGoodsList()
      }).catch(err => {
        console.log(err)
        this.$message.error(this.titleShelf + '失败！')
      })
    },
    handleSizeChange(e) {
      this.pageSize = e
      this.getGoodsList()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getGoodsList()
    },
    // 查看详情
    viewDetails(row) {
      // const obj = {}
      const _this = this
      seeDetailsGoods(row.id).then(res => {
        _this.detailObj = res.info
        _this.$router.push({
          name: 'particulars',
          params: {
            row: _this.detailObj
          }
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('查询详情失败！')
      })
    },
    // 修改
    handleEdit(index, row) {
      this.$router.push({
        name: 'addAndEdit',
        params: {
          row: row
        }
      })
    },
    addGoods() {
      this.$router.push({
        name: 'addAndEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>
