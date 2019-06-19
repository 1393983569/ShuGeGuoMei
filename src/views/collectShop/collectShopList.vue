<template>
  <el-table
    :data="tableData"
    :header-cell-style="{background:'#f0f2f3', textAlign: 'center'}"
    center
    stripe
    >
    <el-table-column
      label="缩略图">
      <template slot-scope="scope">
        <!--scope.row.img-->
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg" style="width: 80px; height: 80px">
      </template>
    </el-table-column>
    <el-table-column
      label="店铺ID">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="进价(元/斤)">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="出价(元/斤)">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="零售价(元/斤)">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="350"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">下架</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'collectShop',
    data () {
      return{
        tableData: [{
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
    methods: {
      // 查看详情
      viewDetails(index, row) {
        this.$router.push({
          name: 'particulars',
          params: {
            row: row
          }
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
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
