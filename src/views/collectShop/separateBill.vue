<template>
  <div class="box-margin">
    <div>子订单编号：123153123123123</div>
    <div>
      关联供应商：
      <el-select v-model="value" placeholder="请选择" style="width: 280px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="display: flex;">
      <div style="display: inline-block; vertical-align: top; width: 100px">
        分拣派单：
      </div>
       <el-table
        style="display: inline-block;"
        :data="tableData"
        :header-cell-style="{background:'#f0f2f3', textAlign: 'center'}"
        center
        stripe
      >
        <el-table-column
          label="订单时间">
          <template slot-scope="scope">
            <p>{{ scope.row.date }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="订单编号">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="订单店铺">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="订单金额(元)">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="订单类型">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="子订单数">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              @click="separateBill(scope.$index, scope.row)">拆单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'separateBill',
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
          name: 'orderDetails',
          params: {
            row: row
          }
        })
      },
      // 拆单
      separateBill(index, row) {
        this.$router.push({
          name: 'separateBill',
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
.box-margin > div{
  margin-bottom: 20px;
}
</style>
