<template>
  <div>
    <el-dialog :visible="showEdit" :before-close="handleClose" width="1200px" height="700">
      <div slot="title" style="font-size:24px;color:#4a5a7f;font-family:Microsoft YaHei;">{{ goodsTitle }}</div>
      <div v-if="showGoodsState" style="margin:10px;" />
      <div v-else style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">商品ID：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">一级品类：</span>
        <el-select v-model="firstCategoryId" style="width:500px;">
          <el-option v-for="item in firstCategoryList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">二级品类：</span>
        <el-select v-model="secondCategoryId" style="width:500px;">
          <el-option v-for="item in secondCategoryList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">商品名称：</span>
        <el-input placeholder="请输入商品名称" style="width:500px;" />
      </div>

      <div v-if="showGoodsState" style="margin:10px;display:flex;flex-direction:row;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">缩略图：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" style="width:100px;" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div v-else style="margin:10px;display:flex;flex-direction:row;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">缩略图：</span>
      </div>
      <div v-if="showGoodsState" style="margin:10px;display:flex;flex-direction:row;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">展示图：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div v-else style="margin:10px;display:flex;flex-direction:row;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">展示图：</span>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">标签：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:500px;" /><br>
        <el-button style="margin-left:92px;margin-top:5px;" size="mini">添加标签</el-button>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">规格：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:500px;" />
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">单位：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:500px;" />
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">备注：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:500px;" />
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">保质期：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;<el-upload<el-date-picker
          type="date"
          placeholder="选择日期"
          style="width:200px;"
        >
        </el-date-picker>
        </el-upload<el-date-picker></div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">保鲜期：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;<el-upload<el-input style="width:200px;" placeholder="请输入保鲜时间"></el-input> 小时
        </el-upload<el-input></div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">产地：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="countryId" style="width:100px;">
          <el-option v-for="item in countryList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
        <el-select v-model="provinceId" style="width:100px;">
          <el-option v-for="item in provinceList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select> 省
        <el-select v-model="cityId" style="width:100px;">
          <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select> 市
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">状态：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="stateId" style="width:300px;">
          <el-option v-for="item in stateList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">1进价：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:200px;" placeholder="请输入1进价" /> 元/单位
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">2进价：</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:200px;" placeholder="请输入2进价" />  元/单位
      </div>
      <div style="margin:10px;">
        <span style="font-size:18px;color:#6e7b99;font-weight:bold;">3零售价：</span>
        &nbsp;<el-input style="width:200px;" placeholder="请输入3零售价" /> 元/单位
      </div>
      <div style="margin:10px;">
        <span style="margin-left:92px;">零售价参考价</span>
        <el-table :data="retailPriceTable" :header-cell-style="headerStyle" style="width:340px;margin-left:92px;" stripe>
          <el-table-column prop="address" label="采集点" />
          <el-table-column prop="price" label="价格" />
        </el-table>
      </div>
      <div slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showEdit: {
      type: Boolean,
      default: true
    },
    showGoodsState: {
      type: Boolean,
      default: true
    },
    goodsTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      firstCategoryId: '',
      firstCategoryList: [],
      secondCategoryId: '',
      secondCategoryList: [],
      countryId: 2,
      countryList: [
        {
          id: 1,
          name: '国内'
        },
        {
          id: 2,
          name: '国外'
        }
      ],
      provinceId: '',
      provinceList: [],
      cityId: '',
      cityList: [],
      stateId: '',
      stateList: [],
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
      this.$emit('isClose', false)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    }
  }
}
</script>
<style>

</style>
