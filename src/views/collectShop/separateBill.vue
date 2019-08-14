<template>
  <div class="box-margin">
    <breadcrumb>
      <el-button type="danger">取消</el-button>
      <el-button type="primary">保存</el-button>
    </breadcrumb>
    <div>子订单编号：123153123123123</div>
    <div>
      关联供应商：
      <el-select v-model="value" placeholder="请选择" style="width: 280px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div style="display: flex;">
      <div style="display: inline-block; vertical-align: top; width: 100px">
        分拣派单：
      </div>
      <el-table
        style="display: inline-block;"
        :data="tableData"
        :header-cell-style="{   }"
        center
        stripe
      >
        <el-table-column label="商品名称" prop="date" ></el-table-column>
        <el-table-column label="商品ID" prop="" > </el-table-column>
        <el-table-column label="规格" prop="" />
        <el-table-column label="单价" prop="" />
        <el-table-column label="下单数量" prop="" />
        <el-table-column label="金额" prop="" />
        <el-table-column
          type="selection"
          width="55"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'SeparateBill',
  components: {
    Breadcrumb
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {

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
  }
}
</script>

<style scoped>
.box-margin > div{
  margin-bottom: 20px;
}
</style>
