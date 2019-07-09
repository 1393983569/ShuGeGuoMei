<template>
  <div>
    <breadcrumb>
      <el-button @click="addGoods" type="primary" size="mini" v-if="buttonList.includes('操作')">添加商品</el-button>
      <el-button type="primary" size="mini" v-else disabled>添加商品</el-button>
    </breadcrumb>
    <div style="margin:10px;display:float;">
      状态：
      <el-select v-model="state" clearable placeholder="请选择" style="width: 120px" size="mini">
        <el-option
          v-for="item in stateList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      一级品类：
      <el-select v-model="categoryOneId" clearable placeholder="请选择" style="width: 120px" size="mini">
        <el-option
          v-for="item in firstList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      二级品类：
      <el-select v-model="categoryTwoId" clearable placeholder="请选择" style="width: 120px" size="mini">
        <el-option
          v-for="item in secondList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div style="display:float;float:right;">
        <el-button @click="searchHandle" size="mini" type="primary" v-if="buttonList.includes('操作')">筛选</el-button>
        <el-button v-else size="mini" type="primary" disabled>筛选</el-button>
        <el-button size="mini" @click="clearHandle" type="danger" v-if="buttonList.includes('操作')">清空</el-button>
        <el-button size="mini" v-else type="danger" disabled>清空</el-button>
      </div>
    </div>
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
            v-if="buttonList.includes('操作'||'查看')"
            size="mini"
            type="warning"
            @click="viewDetails(scope.row)"
          >查看详情</el-button>
          <el-button
            v-else
            disabled
            size="mini"
            type="warning"
          >查看详情</el-button>
          <el-button
            v-if="buttonList.includes('操作')"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-else
            disabled
            size="mini"
            type="primary"
          >编辑</el-button>
          <el-button
            v-if="buttonList.includes('操作')"
            size="mini"
            type="success"
            @click="handleShelf(scope.row)"
          >{{ titleShelf = scope.row.is_shelf === 1? '上架':'下架' }}</el-button>
          <el-button
            v-else
            disabled
            size="mini"
            type="success"
          >{{ titleShelf = scope.row.is_shelf === 1? '上架':'下架' }}</el-button>
          <el-button
            v-if="buttonList.includes('操作')"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            v-else
            disabled
            size="mini"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        :page-sizes="[6, 10]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
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
import { getFirstCategory, getSecondCategory } from '@/api/category.js'
import { getGoodsList, deleteGoods, shelfGoods } from '@/api/collectShop.js'
export default {
  name: 'CollectShop',
  components: { Breadcrumb },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 6,
      state: '',
      categoryOneId: '',
      categoryTwoId: '',
      showDelete: false,
      showShelf: false,
      id: '',
      titleShelf: '',
      detailObj: {},
      firstList: [],
      secondList: [],
      stateList: [
        {
          id: 0,
          name: '有货'
        },
        {
          id: 1,
          name: '缺货'
        }
      ],
      buttonList: []
    }
  },
  beforeRouteEnter(to, form, next) {
    next(mv => {
      console.log('hhhhhh')
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  watch: {
    // 查询一级品类下的二级品类
    'categoryOneId'(e) {
      if (e) {
        getSecondCategory(e).then(res => {
          console.log(res)
          if (res.info.length > 0) {
            this.secondList = res.info
          } else {
            this.$message.info('此一级品类下暂无二级品类！')
            this.secondList = []
            this.categoryTwoId = ''
          }
        }).catch(err => {
          console.log(err)
          this.$message.warning('暂无二级品类')
        })
      }
    }
  },
  mounted() {
    this.getGoodsList()
    this.getFirstCategory()
  },
  methods: {
    getButton(list, name){
      list.forEach(item => {
        if(item.name === name){
          this.buttonList = item.checkList
        }
      })
    },
    // 查询商品列表
    getGoodsList() {
      this.tableData = []
      getGoodsList(this.pageNum, this.pageSize, this.state, this.categoryOneId, this.categoryTwoId).then(res => {
        // console.log(res, 'res,,,,,')
        if (res.info.records.length > 0) {
          this.total = res.info.totalrecord
          res.info.records.forEach(e => {
            e.state = e.state === 0 ? '有货' : '缺货'
            e.purchasePrice = e.purchasePrice/100
            e.sellPrice = e.sellPrice/100
            e.price = e.price/100
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
    // 条件查询
    searchHandle() {
      this.getGoodsList()
    },
    clearHandle(){
      this.state = ''
      this.categoryOneId = ''
      this.categoryTwoId = ''
      this.getGoodsList()
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
      this.$router.push({
        name: 'particulars',
        params: {
          row: row
        }
      })
    },
    // 查询一级品类
    getFirstCategory() {
      getFirstCategory().then(res => {
        // console.log(res, 'kkkkkkkkkk')
        if (res.info.length > 0) {
          this.firstList = res.info
        } else {
          this.$message.warning('暂无一级品类')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询一级品类出错！')
      })
    },
    // 修改
    handleEdit(row) {
      this.$router.push({
        name: 'addAndEdit',
        params: {
          row: row
        }
      })
    },
    addGoods() {
      this.$router.push({
        name: 'addAndEdit',
        params: {
          row: '添加'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
