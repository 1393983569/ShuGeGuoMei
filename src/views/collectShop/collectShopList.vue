<template>
  <div>
    <breadcrumb :stateShow ='false'>
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
        <el-button @click="searchHandle" size="mini" type="primaryX" v-if="buttonList.includes('操作')">筛选</el-button>
        <el-button v-else size="mini" type="primaryX" disabled>筛选</el-button>
        <el-button size="mini" @click="clearHandle" type="info" v-if="buttonList.includes('操作')">清空</el-button>
        <el-button size="mini" v-else type="info" disabled>清空</el-button>
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
        <el-table-column label="商品ID" prop="id">
          <!-- <template slot-scope="scope">
            {{scope.row.id.toString().substring(scope.row.id.toString().length-4)}}
          </template> -->
        </el-table-column>
        <el-table-column label="商品名称" prop="name" />
        <el-table-column label="状态" prop="state" />
        <el-table-column label="进价(元/单位)" prop="purchasePrice" />
        <el-table-column label="出价(元/单位)" prop="sellPrice" />
        <el-table-column label="零售价(元/单位)" prop="price" />
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
              v-if="buttonList.includes('操作')&&scope.row.isShelf === 1"
              size="mini"
              type="up"
              @click="handleShelf(scope.row)"
            >上架</el-button>
            <el-button
              v-else-if="buttonList.includes('操作')&&scope.row.isShelf === 0"
              size="mini"
              type="down"
              @click="handleShelf(scope.row)"
            >下架</el-button>
            <el-button
              v-else
              disabled
              size="mini"
              type="info"
            >{{scope.row.isShelf === 1? '上架':'下架' }}</el-button>
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
    <hint v-model="showDelete" title="删除商品" text="是否删除该商品？" @confirm="confirmDelete" />
    <!--上下架商品-->
    <hint v-model="showShelf" :title="`${titleShelf}商品`" :text="`是否${titleShelf}该商品？`" @confirm="confirmShelf" />
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { getFirstCategory, getSecondCategory } from '@/api/category.js'
import { getGoodsList, deleteGoods, shelfGoods } from '@/api/collectShop.js'
export default {
  name: 'CollectShop',
  components: { Breadcrumb, hint, virtualList },
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
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  watch: {
    // 查询一级品类下的二级品类
    'categoryOneId'(e) {
      if (e) {
        getSecondCategory(e).then(res => {
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
      if (row.isShelf === 0) {
        // this.titleShelf = '上架'
        this.isShelf = 1
      } else if(row.isShelf === 1) {
        // this.titleShelf = '下架'
        this.isShelf = 0
      }
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
      this.$store.state.user.goodsObject = row
      this.$router.push({
        name: 'particulars',
        params: row
      })
    },
    // 查询一级品类
    getFirstCategory() {
      getFirstCategory().then(res => {
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
