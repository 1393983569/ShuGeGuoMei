<template>
  <div>
    <!-- 详情显示 -->
    <el-dialog :visible="showDetail" width="1000px" height="700" :before-close="handleCloseDetail">
      <div slot="title" class="title-size-color">店铺详情</div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺ID：</span>{{ shopObject.id }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺名称：</span>{{ shopObject.name }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺简称：</span>{{ shopObject.simpleName }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺图片：</span><img :src="shopObject.image">
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">掌柜姓名：</span>{{ shopObject.shopownerName }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">手机号：</span>{{ shopObject.shopownerPhone }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">初始密码：</span> {{ shopObject.shopownerPassword }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺地址：</span>{{ shopObject.detailsAddress }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight"> 店铺面积：</span>{{ shopObject.area }} m&sup2;
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">经营品类：</span>
        <!-- <el-table :data="categoryTable" :header-cell-style="tableHeaderColor" :span-method="objectSpanMethod"> -->
        <el-table :data="categoryTable" :header-cell-style="tableHeaderColor">
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
      <!-- <div>
        职员人数：
        <el-table :data="employeeTable" border :header-cell-style="tableHeaderColor" style="width:400px;">
          <el-table-column prop="num" label="序号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="level" label="职级" />
        </el-table>
      </div> -->
      <div class="size-color">
        <span class="font-weight">经营模式：</span>{{ shopObject.management }}
      </div>
      <div class="size-color">
        <span class="font-weight">成本结构：</span>
      </div>
      <!-- <div class="size-color">
        会员人数(人)： 3000
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showDetail: {
      type: Boolean,
      default: false
    },
    shopObject: {
      type: Object,
      default: Array
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
        return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    },
    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {}
  }
}
</script>
<style>

</style>
