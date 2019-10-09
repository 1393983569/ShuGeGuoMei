<template>
  <div class="box-margin">
    <Breadcrumb :stateShow="stateShowBread">
      <span v-if="status===0">
        <el-button size="mini" type="primary" style=" margin-left: 10px" @click="sendOrders">派单</el-button>
        <el-button size="mini" type="danger" @click="deleteOrder">删除</el-button>
      </span>
    </Breadcrumb>
    <!-- <HeadButton v-if="childrenObject.status !== 2">
      <span v-if="status===0">
        <el-button type="primary" style=" margin-left: 10px" @click="sendOrders">派单</el-button>
        <el-button type="danger" @click="deleteOrder">删除</el-button>
      </span>
    </HeadButton> -->
    <div>子订单编号：{{childrenObject.suborderNo}}</div>
    <div>
      子订单时间：{{childrenObject.createTime}}
    </div>
    <div>
      订单店铺：{{childrenObject.shopName}}
    </div>
    <div>
      子订单供应商：{{providerDomain.name}}
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
          <!-- <div style="margin:0px;"> -->
            <p style="text-align: left;font-weight: bold;margin-top:20px;">
              {{item[0].categoryOneName}}
            </p>
            <el-table
              style="display: inline-block;"
              :data="item"
              :header-cell-style="{   }"
              show-summary
              :summary-method="getSummaries"
              center
            >
              <el-table-column prop="name" label="商品名称"/>
              <el-table-column prop="goods_id" label="商品ID"/>
              <el-table-column prop="standards" label="规格"/>
              <el-table-column prop="unit" label="单价"/>
              <el-table-column prop="amount" label="下单数量"/>
              <el-table-column  v-if="childrenObject.status === 2" prop="input_quantity" label="入库数量">
                <template slot-scope="scope" style="align-item:center;">
                  <el-input v-model="scope.row.input_quantity" class="table-input" style="width:80px;"/>&nbsp;&nbsp;
                  <svg-icon icon-class="revise" style="font-size:24px;line-height:57px;" @click="changeAmount(scope.row.id,scope.row.input_quantity)" class="iconClass" />
                </template>
              </el-table-column>
              <el-table-column prop="money" label="金额">
                <template slot-scope="scope">
                  {{scope.row.money/100}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="total" v-if="temNum">
            <div>订单总金额：</div>
            <div class="rightItem">￥{{temNum}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>订单状态：
      <span v-if="status ===0">未派单</span>
      <span v-else-if="status===1">已派单</span>
      <span v-else-if="status===2">已收货</span>
      <span v-else>暂无状态</span>
    </div>
    <hintSend v-model="showSend" title="派单确定" @confirm="confirmSend" />
    <hint v-model="showDelete" title="删除子订单" text="是否删除该订单？" @confirm="confirmDelete" />
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { sumList  } from '_u/logic'
import hint from '@/components/Hint'
import HeadButton from '@/components/HeadButton'
import hintSend from '@/views/collectShop/hintSend.vue'
import { orderSubDetail, enterQuantity,deleteSubOrder, updateSubOrderStatus } from '@/api/collectShop/order.js'
export default {
  name: 'ChildOrdersDetails',
  components: {
    HeadButton,hintSend, hint, Breadcrumb
  },
  data() {
    return {
      stateShowBread:false,
      orderDetailCateList:[],
      temNum:0,
      subOrderId:'',
      showSend:false,
      dataTable:[{
        detailAmount:300
      }],
      childrenNo:'',
      childrenObject:{},
      status:0,
      providerDomain:{},
      inputState:true,
      showDelete:false,
      orderId:''
    }
  },
  mounted() {
    this.stateShowBread = true
    console.log(this.$route.params, 'hhhhhh')
    if(JSON.stringify(this.$route.params)!=='{}'){
      var obj = this.$route.params
      this.childrenNo = obj.suborder_no
      this.subOrderId = this.$route.params.id
    }
    this.getChildrenDtail()
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
    },
    // 派单
    sendOrders() {
      this.showSend = true
    },
    confirmSend(){
      let status = 1
      updateSubOrderStatus(this.subOrderId,status).then(res => {
        this.$message.success('派单成功！')
        this.showSend = false
        this.status = 1
        // this.$emit('refresh')
      }).catch(err => {
        this.$message.error('派单失败！')
      })
    },
    // 删除
    deleteOrder() {
      this.showDelete = true
    },
    confirmDelete(){
      deleteSubOrder(this.subOrderId, this.fatherId).then(res => {
        this.$message.success('删除成功！')
        this.showDelete = false
        this.$router.back()
        this.$emit('refresh')
      }).catch(err=> {
        this.$message.error('删除失败！')
      })
    },
    // 修改入库数量
    changeAmount(id, input){
      let inputQuantity = parseInt(input)
      console.log(id, inputQuantity,'lllll')
      enterQuantity(id, inputQuantity).then(res => {
        this.$message.success('保存成功')
        this.inputState = false
      }).catch(err => {
        this.$message.success('保存失败')
      })
    },
    // 表格统计规则
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
      return sums
    },
    // 求订单最终总价格
    HnaldeTotal(list){
      let totalNum = 0
      list.map(item => {
        totalNum+= item.money
      })
      return totalNum/100
    },
    // 子订单详情查询
    getChildrenDtail(){
      orderSubDetail(this.childrenNo).then(res => {
        console.log(res, 'xiangqing....')
        this.childrenObject = res.info[0]
        this.fatherId = res.info[0].orderId
        this.status = this.childrenObject.status
        this.orderDetailCateList = this.handleClassify(this.childrenObject.subOrderDetailList)
        this.temNum = this.HnaldeTotal(this.childrenObject.subOrderDetailList)
        this.providerDomain = this.childrenObject.providerDomain
      }).catch(err=> {})
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
  }
}
</script>

<style scoped>
  .box-margin > div{
    margin-bottom: 20px;
  }
  .total{
    height: 39px;
    width: 100%;
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
  .table-input{
    color:red;
    border: none;
  }
  .iconClass:hover{
    cursor: pointer;
  }
</style>
