<template>
  <div>
    <div style="display:flex;flex-direction:row;background-color:#ffffff;width:100%;">
      <div class="catcery_asides">
        <div style="margin:3px;width:20px;margin-left:52px;color:#333;font-size:16px;">消费习惯排行榜<br/>&nbsp;|复购品类排名</div>
      </div>
      <div style="width:90%;">
        <el-table  :data="dataList" :span-method="objectSpanMethod"
          border
          style="margin:10px;"
          >
          <el-table-column prop="" label="一级分类" align="center">
            <template slot-scope="scope">
              {{ scope.row.categoryOneName}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="一级分类ID" align="center">
            <template slot-scope="scope">
              {{ scope.row.categoryOneId}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="二级分类" align="center">
            <template slot-scope="scope">
              {{ scope.row.categoryTwoName}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="二级分类ID" align="center">
            <template slot-scope="scope">
              {{ scope.row.categoryTwoId}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品ID" align="center">
            <template slot-scope="scope">
            {{ scope.row.goods_id}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品名称" align="center">
            <template slot-scope="scope">
            {{ scope.row.goods_name}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="销量（元）" align="center">
            <template slot-scope="scope">
            {{ scope.row.moneySum?scope.row.moneySum/100:0}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="排行" type="index" align="center" width="100"></el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
import {getFrequency} from '@/api/dataManage/dataCenter.js'
export default {
  props:['categoryObject'],
  data(){
    return{
      currentGoods:{},
      dataList:[],
      oneCateRule:[],
      twoCateRule:[],
      num:1,
    }
  },
  mounted(){
    this.currentGoods = this.categoryObject
    this.getFrequencyFunction()
  },
  watch:{
    'categoryObject'(e){
      this.currentGoods = e
      this.getFrequencyFunction()
    }
  },
  methods:{
    getFrequencyFunction(){
      getFrequency(this.currentGoods.year,this.currentGoods.month,this.currentGoods.day,this.currentGoods.shopId,).then(res=> {
        this.dataList = res.info
        let span = this.gteRule(res.info)
        this.oneCateRule = span.oneCate
        this.twoCateRule = span.twoCate
      }).catch(err => {
        console.log(err)
      })
    },
    // 得到合并规则
      gteRule(err) {
        let listIndex = 0
        let listRule = []
        let listIndex1 = 0
        let listRule1 = []
        err.forEach((item, index) => {
          // 一级的合并规则
          if (index === 0) {
            listRule.push(1)
            listIndex = 0
          } else {
            if (err[index].categoryOneId === err[index - 1].categoryOneId) {
              listRule[listIndex] += 1
              listRule.push(0)
            } else {
              listRule.push(1)
              listIndex = index
            }
          }
          // 二级的合并规则
          if (index === 0) {
            listRule1.push(1)
            listIndex1 = 0
          } else {
            if (err[index].categoryTwoId === err[index - 1].categoryTwoId) {
              listRule1[listIndex1] += 1
              listRule1.push(0)
            } else {
              listRule1.push(1)
              listIndex1 = index
            }
          }
        })
        let spanObj = {}
        spanObj.oneCate = listRule
        spanObj.twoCate = listRule1
        // 将合并规则返回
        return spanObj
      },
      // 合并列方法
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // 合并第一列
        if (columnIndex === 0 ) {
          const _row = this.oneCateRule[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 1 ) {
          const _row = this.oneCateRule[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        // 合并第二列
        if(columnIndex === 2){
          const rows = this.twoCateRule[rowIndex]
          const cols = rows > 0 ? 1 : 0
          return {
            rowspan: rows,
            colspan: cols
          }
        }
         if(columnIndex === 3){
          const rows = this.twoCateRule[rowIndex]
          const cols = rows > 0 ? 1 : 0
          return {
            rowspan: rows,
            colspan: cols
          }
        }
      },
  }
}
</script>
<style>
.catcery_asides{
 width:120px;
 background-color: #D3DCE6;
 display: flex;
 flex-direction: column;
 justify-content: center;
}
</style>
