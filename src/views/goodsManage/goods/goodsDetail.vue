<template>
  <div>
    <el-dialog :visible="showDetail" :before-close="handleClose" width="1200px" height="700">
      <div slot="title" style="font-size:24px;color:#4a5a7f;font-family:Microsoft YaHei;">商品详情</div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">商品ID：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">一级品类：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">二级品类：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">商品名称：</span>
      </div>
      <div style="margin:10px;display:flex;flex-direction:row;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">缩略图：</span>
      </div>
      <div style="margin:10px;display:flex;flex-direction:row;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">展示图：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">标签：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">规格：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">单位：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">备注：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">保质期：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">保鲜期：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">产地：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">状态：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">1进价：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">2进价：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">3零售价：</span>
      </div>
      <div style="margin:10px;">
        <span style="margin-left:92px;">零售价参考价</span>
        <el-table :data="retailPriceTable" :header-cell-style="headerStyle" style="width:340px;margin-left:92px;" stripe>
          <el-table-column prop="address" label="采集点" />
          <el-table-column prop="price" label="价格" />
        </el-table>
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
      retailPriceTable: [
        {
          address: '采集点1',
          price: '￥3.00'
        },
        {
          address: '采集点2',
          price: '￥3.00'
        },
        {
          address: '采集点3',
          price: '￥3.00'
        },
        {
          address: '采集点4',
          price: '￥3.00'
        },
        {
          address: '采集点5',
          price: '￥3.00'
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeGoodsDetail', false)
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    }
  }
}
</script>
<style>

</style>
