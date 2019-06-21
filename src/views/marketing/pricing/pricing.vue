<template>
  <el-table
    :data="dataList"
    :header-cell-style="{ textAlign: 'center'}"
    center
    stripe
  >
    <el-table-column
      prop="date"
      label="一级品类"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.date }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="二级品类"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品ID"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
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
      label="库存"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="零售价"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="折扣率"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="折扣价"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CollectShop',
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
      }]
    }
  },
  mounted() {

  },
  methods: {
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

    }
  }
}
</script>

<style scoped>

</style>
