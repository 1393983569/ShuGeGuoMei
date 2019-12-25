<template>
  <div>
    <el-container>
      <el-aside width="100px" class="aside-background-color">
        商品数据
      </el-aside>
      <el-main>
        <div>
          <div style="margin:10px;display:flex;flex-direction:row;font-size:12px;width:200px;">
            一级品类：
            <el-select v-model="categoryOneId" placeholder="请选择" style="width: 120px" size="mini">
              <el-option
                v-for="item in firstList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div style="margin:10px;display:flex;flex-direction:row;font-size:12px;width:200px;">
            二级品类：
            <el-select v-model="categoryTwoId" placeholder="请选择" style="width: 120px" size="mini">
              <el-option
                v-for="item in secondList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <div ref="chart1" class="chartStyle" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getFirstCategory, getSecondCategory } from '@/api/category.js'
import {getGoodsSale} from '@/api/dataManage/dataCenter.js'
export default {
  props:['goodsObject'],
  data() {
    return {
      currentGoods:{},
      categoryOneId: '',
      categoryTwoId: '',
      firstList: [],
      secondList: [],
      option: {
        backgroundColor: '#FFFFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter:"{b0}<br />{a0}: {c0}<br/>{a1}:{c1}<br/>",
        },
        toolbox: {
          // feature: {
          //   dataView: { show: true, readOnly: false },
          //   magicType: { show: true, type: ['line', 'bar'] },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        legend: {
          data: ['库存', '销量']
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel:{
              formatter:function(params) {
                var res  = params
                if(res.includes('[')){
                   return res.split('[')[0]
                }else{
                  return res
                }

              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '库存',
            min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: '{value} (斤)'
            }
          },
          {
            type: 'value',
            name: '销量',
            min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value} (斤)'
            }
          },
        ],
        series: [
          {
            name: '库存',
            type: 'bar',
            data: []
          },
          {
            name: '销量',
            type: 'line',
            yAxisIndex: 1,
            data: []
          },
        ]
      },

    }
  },
  mounted() {
    this.currentGoods = this.goodsObject
    this.goodsChartHandle()
    this.getFirstCategory()
  },
  watch:{
    'goodsObject'(e){
      this.currentGoods = e
      this.goodsChartHandle()
    },
    // 查询一级品类下的二级品类
    'categoryOneId'(e) {
      this.goodsChartHandle()
      if (e) {
        getSecondCategory(e).then(res => {
          if (res.info.length > 0) {
            // this.secondList[0] = {
            //   id:'',
            //   name:'全部'
            // }
            res.info.map(item => {
              this.secondList.push(item)
            })
            this.categoryTwoId = this.secondList[0].id
          } else {
            this.$message.info('此一级品类下暂无二级品类！')
            this.secondList = []
            this.categoryTwoId = ''
          }
        }).catch(err => {
          console.log(err)
          this.$message.warning('暂无二级品类')
        })
      }else{
        this.categoryTwoId = ''
      }
    },
    'categoryTwoId'(e){
      this.goodsChartHandle()
    }
  },
  methods: {
    // 查询一级品类
    getFirstCategory() {
      getFirstCategory().then(res => {
        if (res.info.length > 0) {
          res.info.map(item => {
            this.firstList.push(item)
          })
          this.categoryOneId = this.firstList[0].id
        } else {
          this.$message.warning('暂无一级品类')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询一级品类出错！')
      })
    },
    goodsChartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
      let op = this.option
      getGoodsSale(this.currentGoods.year,this.currentGoods.month,this.currentGoods.day,this.currentGoods.shopId,this.categoryOneId, this.categoryTwoId).then(res=> {
        let nameList = []
        let stockList = []
        let saleList = []
        res.info.map(item => {
          if(item.stockWarning===0){
            item.goodsName=item.goodsName+'[库存预警]'
          }
          if(item.periodWarning===0){
            item.goodsName=item.goodsName+'[保鲜期预警]'
          }
          if(item.overdueWarning===0){
            item.goodsName=item.goodsName+'[过期预警]'
          }
          nameList.push(item.goodsName)
          stockList.push(item.computerStock)
          saleList.push(item.sales)
        })
        op.xAxis[0].data = nameList
        op.series[0].data = stockList
        op.series[1].data = saleList
        myChart.setOption(op)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.chartStyle {
  /* height: 400px; */
  width:100%;
  box-sizing: border-box;
  line-height: 400px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  margin: 5px;
  background-color: aliceblue;
}
</style>
