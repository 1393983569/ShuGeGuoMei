<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="display:flex;flex-direction:row;margin:10px;align-items:center;">
      <pickDate @getPickDate="getPickDate"></pickDate>
      市场类型：
      <el-select v-model="value1" filterable placeholder="请选择" size="mini" style="width:10%;margin-right:20px;">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      区域：
      <el-select v-model="value2" filterable placeholder="请选择" size="mini" style="width:10%;margin-right:20px;">
        <el-option
          v-for="item in areaList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      一级品类：
      <el-select v-model="categoryOneId" filterable placeholder="蔬菜" size="mini" style="width:10%;">
        <el-option
          v-for="item in categoryOneList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div style="position:absolute;right:10px;">
        <el-button size="mini" type="primary">筛选</el-button>
        <el-button size="mini" type="danger">清空</el-button>
      </div>
    </div>
    <el-table
      :data="dataList"
      :header-cell-style="{   }"
      center
      stripe
    >
      <el-table-column
        prop="date"
        label="商品ID"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="规格"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="单位"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="价格"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:5px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import pickDate from '@/components/pickDate'
import { getFirstCategory } from '@/api/category.js'
import breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'CollectShop',
  components:{pickDate,breadcrumb},
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      value1: '',
      value2: '',
      typeList: [
        {
          id: 0,
          name: '零售市场'
        },
        {
          id: 1,
          name: '批发市场'
        },
        {
          id: 2,
          name: '早市'
        }
      ],
      areaList:[
        {
          id: 0,
          name: '滩尖子批发市场'
        },
        {
          id: 1,
          name: '新港城批发市场'
        },
        {
          id: 2,
          name: '高新批发市场'
        }
      ],
      dataList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      categoryOneList: [],
      categoryOneId: '',
      total: 0,
      pageSize: 10,
      pageNum: 1,
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    getPickDate(){},
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'childOrdersDetails',
        params: {
          row: row
        }
      })
    },
    // 派单
    separateBill(index, row) {
      // this.$router.push({
      //   name: 'separateBill',
      //   params: {
      //     row: row
      //   }
      // })
    },
    // 删除
    removeOrder(index, row) {

    },
    getCategory(){
      getFirstCategory().then(res => {
        this.categoryOneList = res.info
      }).catch(err => {
        console.log(err)
        this.$message.error('查询品类出错')
      })
    },
    handleSizeChange(e) {
      this.pageSize = e
    },
    handleCurrentChange(e) {
      this.pageNum = e
    }
  }
}
</script>

<style scoped>

</style>
