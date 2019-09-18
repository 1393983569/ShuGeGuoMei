<template>
  <div class="box-margin">
    <div>订单编号：{{orderNo}}</div>
    <div>
      订单时间：{{orderDate}}
    </div>
    <div>
      订单店铺：{{shopName}}
    </div>
    <div>
      类型：
      <span v-if="type ===1">销售</span>
      <span v-else-if="type===2">退货</span>
      <span v-else-if="type===3">采购</span>
      <span v-else>调拨</span>
    </div>
    <div>
      商品数量：{{orderDetailList.length}}
    </div>
    <!-- 循环体 -->
    <div>
      <div style="margin-bottom: 10px">
        <span>
          子订单明细：
        </span>
      </div>
      <el-row>
        <el-col :span="2">
          <div>
            &nbsp;
          </div>
        </el-col>
        <el-col :span="20">
          <div v-for="item in orderDetailCateList" style="margin:0px;">
            <p style="text-align: left;font-weight: bold;margin-top:20px;">
              {{item[0].categoryOneName}}
            </p>
            <el-table
              style="display: inline-block;width:70%;"
              :data="item"
              :header-cell-style="{   }"
              show-summary
              :summary-method="getSummaries"
              center
            >
              <el-table-column prop="goodsName" label="商品名称"/>
              <el-table-column prop="id" label="商品ID"/>
              <el-table-column prop="standards" label="规格"/>
              <el-table-column prop="unit" label="单价"/>
              <el-table-column prop="detailAmount" label="下单数量"/>
              <el-table-column prop="money" label="金额">
                <template slot-scope="scope">
                  {{scope.row.money/100}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="total">
            <div>订单总金额：</div>
            <div class="rightItem">￥{{temNum}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>订单状态：
      <span v-if="type ===0">未拆单</span>
      <span v-else-if="type===1">已拆单</span>
      <span v-else-if="type===2">已派单</span>
      <span v-else-if="type===3">已入库</span>
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
        <childOrdersList :row="childOrderData" @refresh="refresh" :buttonList="buttonArray" style="width:70%;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import hint from '@/components/Hint'
import { sumList } from '_u/logic'
import { orderDetail } from '@/api/collectShop/order.js'
import childOrdersList from './childOrdersList'
import { filter } from 'minimatch';
export default {
  name: 'OrderDetails',
  components: {
    childOrdersList, hint
  },
  data() {
    return {
      showDelete:false,
      tableData:[],
      childOrderData:[],
      orderNo:'',
      tempOrder:{},
      tempOrder:{},
      orderNo:'',
      orderDate:'',
      shopName:'',
      type:'',
      status:'',
      orderDetailList:[],
      amount:'',
      orderDetailCateList:[],
      orderTotalMoney:'',
      temNum:0,
      buttonArray:[],
    }
  },
  beforeRouteEnter (to, form, next) {
   console.log(to)
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  mounted(){
    console.log(this.$store.state.user, 'user')
    if(JSON.stringify(this.$route.params) === '{}'){
      this.orderNo = this.$store.state.user.orderObject.orderNo
      this.getOrderDetail()
    }else{
      // console.log(this.$route.params, 'kkaksksjsskk')
      let obj = this.$route.params
      this.orderNo = obj.orderNo
      this.getOrderDetail()
    }
  },
  methods:{
    getButton(list, name){
      list.forEach(e => {
        if(e.name === name){
          this.buttonArray = e.checkList
        }
      });
    },
    // 拆单
    separateBill(index, row) {
      this.$router.push({
        name: 'separateBill',
        params: row
      })
    },
    refresh(){
      this.getOrderDetail()
    },
    // 订单详情
    getOrderDetail(){
      orderDetail(this.orderNo).then(res => {
        if(res.status === 1){
          let arr = {}
          this.tempOrder = res.info[0]
          arr= res.info[0]
          this.orderNo = arr.orderNo
          this.orderDate = arr.createTime
          this.shopName = arr.shopDomain.name
          this.type = arr.type
          this.status = arr.status
          this.amount = arr.amount
          this.orderDetailList = arr.orderDetailList
          let sum = 0
          this.orderDetailList.forEach(item => {
            sum += item.money
          })
          this.temNum = sum/100
          this.childOrderData = arr.subOrderList
          this.childOrderData.fatherId = res.info[0].id
          this.orderDetailCateList = this.handleClassify(this.orderDetailList)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询订单详情出错！')
      })
    },
    // 根据品类分类
    handleClassify(goodsList){
      let cateOneList = []
      goodsList.forEach(item => {
        cateOneList.push(item.category_one_id)
      })
      let uniqueList = this.unique(cateOneList)
      let finalObject = []
      for(let i=0; i<uniqueList.length; i++){
        let arr =[]
        for(let j=0; j<goodsList.length; j++) {
          if(uniqueList[i] === goodsList[j].category_one_id){
            arr.push(goodsList[j])
          }
        }
        finalObject.push(arr)
      }
      return finalObject
    },
    // 去重处理
    unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i])===-1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    },
    // 小计金额
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '小计金额:'
          return
        }
        const values = data.map(item => {
          if (column.property === 'money' && item[column.property]) {
            return Number(item[column.property])
          }
        })
        if (!values.every(value => isNaN(value))) {
          const sun = sumList(values)
          sums[index] = `￥${sun/100}`
        } else {
          sums[index] = ''
        }
      })
      // console.log(sums, 'sums....')
      return sums
    }
  }
}

</script>

<style scoped>
  .box-margin > div{
    margin-bottom: 20px;
  }
  .total{
    height: 39px;
    width: 70%;
    background-color: rgba(204, 204, 204, 1);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0);
    display:flex;
    flex-direction: row;
    align-items: center;
    padding:10px;
    justify-content:space-between;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
    font-weight:bold;
  }
  .rightItem{
    margin-right:11%;
  }
</style>
