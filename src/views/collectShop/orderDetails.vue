<template>
  <div class="box-margin">
    <div>订单编号：123153123123123</div>
    <div>
      订单时间：2019-03-29 20:00
    </div>
    <div>
      订单店铺：万达店
    </div>
    <div>
      类型：供应商1
    </div>
    <div>
      商品数量：1
    </div>
    <!-- 循环体 -->
    <div>
      <div style="margin-bottom: 10px">
        <span>
          子订单明细：
        </span>
        <span style="text-align: left">
          一级品类
        </span>
      </div>
      <el-row>
        <el-col :span="2">
          <div>
            &nbsp;
          </div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-table
              style="display: inline-block;"
              :data="tableData"
              :header-cell-style="{ textAlign: 'center'}"
              show-summary
              :summary-method="getSummaries"
              center
              stripe
            >
              <el-table-column
                prop="date"
                label="商品名称"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.date }}</p>
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
                label="规格"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="单价"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="数量"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.money }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      子订单列表：
    </div>
    <el-row style="margin-bottom: 10px">
      <el-col :span="2">
        <div>
          &nbsp;
        </div>
      </el-col>
      <el-col :span="20">
        <childOrdersList :row="tableData" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { sumList } from '_u/logic'
import childOrdersList from './childOrdersList'
export default {
  name: 'OrderDetails',
  components: {
    childOrdersList
  },
  // 拆单
  separateBill(index, row) {
    this.$router.push({
      name: 'separateBill',
      params: {
        row: row
      }
    })
  },
  getSummaries(param) {
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '小计金额'
        return
      }
      const values = data.map(item => {
        if (column.property === 'money' && item[column.property]) {
          return Number(item[column.property])
        }
      })
      if (!values.every(value => isNaN(value))) {
        const sun = sumList(values)
        sums[index] = `￥${sun}`
      } else {
        sums[index] = ''
      }
    })
    console.log(sums)
    return sums
  }
}

</script>

<style scoped>
  .box-margin > div{
    margin-bottom: 20px;
  }
</style>
