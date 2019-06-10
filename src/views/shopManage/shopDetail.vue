<template>
  <div>
    <!-- 详情显示 -->
    <el-dialog :visible="showDetail" width="1200px" height="700" :before-close="handleCloseDetail">
      <div slot="title" class="title-size-color">店铺详情</div>
      <div class="size-color">
        <span>店铺ID：</span>
      </div>
      <div class="size-color">
        店铺名称
      </div>
      <div class="size-color">
        店铺简称：
      </div>
      <div class="size-color">
        店铺图片：
      </div>
      <div class="size-color">
        掌柜姓名
      </div>
      <div class="size-color">
        手机号：
      </div>
      <div class="size-color">
        初始密码：
      </div>
      <div class="size-color">
        店铺地址：
      </div>
      <div class="size-color">
        店铺面积： m&sup2;
      </div>
      <div class="size-color">
        经营品类：
        <el-table :data="categoryTable" border :header-cell-style="tableHeaderColor" :span-method="objectSpanMethod">
          <el-table-column prop="first" label="一级品类" />
          <el-table-column prop="firstId" label="一级品类ID" />
          <el-table-column prop="second" label="二级品类" />
          <el-table-column prop="secondId" label="二级品类ID" />
          <el-table-column prop="operate" label="选择">
            <template>
              <el-checkbox />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="" style="margin:10px;display:flex;flex-direction: row;font-size:18px;color:#6e7b99;font-weight:bold;"> -->
      <div>
        职员人数：
        <el-table :data="employeeTable" border :header-cell-style="tableHeaderColor" style="width:400px;">
          <el-table-column prop="num" label="序号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="level" label="职级" />
          <!-- <el-table-column prop="phone" label="电话" /> -->
        </el-table>
      </div>
      <div class="size-color">
        经营模式：
      </div>
      <div class="size-color">
        成本结构：
      </div>
      <div class="size-color">
        会员人数(人)： 3000
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      employeeTable: [],
      categoryTable: []
    }
  },
  methods: {
    handleCloseDetail() {
      this.$emit('isCloseDetail', false)
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    },
    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        //  return{
        //    rowspan: 2,
        //    colspan: 1
        //  }
      }
    }
  }
}
</script>
<style>

</style>
