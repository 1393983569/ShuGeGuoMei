<template>
  <div>
    <el-container>
      <el-aside width="100px" class="aside-background-color">

      </el-aside>
      <el-main style="width:100%;">
        <el-table  :data="dataList" :span-method="objectSpanMethod"
          border
          style="margin:10px;"
          >
          <el-table-column prop="" label="一级品类" align="center">
            <template slot-scope="scope">
              {{ scope.row.categoryOneName}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="二级品类" align="center">
            <template slot-scope="scope">
              {{ scope.row.categoryTwoName}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品名称" align="center">
            <template slot-scope="scope">
            {{ scope.row.goodsName}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="销量（斤）" align="center">
            <template slot-scope="scope">
            {{ scope.row.computerStock}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="库存（斤）" align="center">
            <template slot-scope="scope">
            {{ scope.row.sales}}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import {getGoodsSale} from '@/api/dataManage/dataCenter.js'
export default {
  props:['goodsSale'],
  data(){
    return{
      currentGoods:{},
      dataList:[],
      oneCateRule:[],
      twoCateRule:[],
    }
  },
  mounted(){
    this.currentGoods = this.goodsSale
    this.getGoodsFunction()
  },
  watch:{
    'goodsSale'(e){
      this.currentGoods = e
    }
  },
  methods:{
    getGoodsFunction(){
      getGoodsSale(this.currentGoods.year,this.currentGoods.month,this.currentGoods.day,this.currentGoods.shopId,).then(res=> {
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
        // 合并第二列
        if(columnIndex === 1){
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
