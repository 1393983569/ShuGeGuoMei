<template>
  <div>
    <div style="width:70%;" class="header"><span>{{productName}}&nbsp;&nbsp;&nbsp;</span>DR:{{numCount[10]}}</div>
    <el-table :data="tableData" style="width:70%;" border center show-summary :summary-method="getSummaries">
      <el-table-column label="序号" prop="index" width="60"/>
      <el-table-column label=" " prop="name"/>
      <el-table-column label=" " prop="num" width="80"/>
      <el-table-column label="C" prop="c"/>
      <el-table-column label="TP" prop="tp" width="140">
        <template slot-scope="scope">
          <P v-if="scope.row.index===''||scope.row.index==='5'||scope.row.index==='6'||scope.row.index==='7'">{{scope.row.tp}}</P>
          <P v-else-if="scope.row.index==='1'"><el-input-number :min="0" :max="100" v-if="deState" v-model="scope.row.tp" style="width:120px;" placeholder="请填写"/><p v-else>{{scope.row.tp}}</p></P>
          <P v-else><el-input-number :min="0" :max="300" v-if="deState" v-model="scope.row.tp" style="width:120px;" placeholder="请填写"/><p v-else>{{scope.row.tp}}</p></P>
        </template>
      </el-table-column>
      <el-table-column label="T" prop="t"/>
      <el-table-column label="W" prop="w" width="140">
        <template slot-scope="scope">
          <P v-if="scope.row.index===''||scope.row.index==='5'||scope.row.index==='6'||scope.row.index==='7'">{{scope.row.w}}</P>
          <P v-else><el-input-number  @blur="blurInput" :min="0" :max="100"  v-if="deState" v-model="scope.row.w" style="width:120px;" placeholder="请填写"/><p v-else>{{scope.row.w}}</p></P>
        </template>
      </el-table-column>
      <el-table-column label="range" prop="range" width="120">
        <template slot-scope="scope" style="padding:0px;margin:0px;">
          <p v-if="scope.row.index===''">{{scope.row.range}}</p>
          <p class="item" v-if="scope.row.rangNum===5" v-for="item in rangelist5" :value="item" :key="item">{{item}}</p>
          <p class="item" v-if="scope.row.rangNum===6" v-for="item in rangelist6" :value="item" :key="item">{{item}}</p>
          <p class="item" v-if="scope.row.rangNum===7" v-for="item in rangelist7" :value="item" :key="item">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column label="R" prop="r" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.index===''">{{scope.row.r}}</p>
          <p class="item" v-if="scope.row.rangNum===5" v-for="item in rList5" :value="item" :key="item">{{item}}</p>
          <p class="item" v-if="scope.row.rangNum===6" v-for="item in rList6" :value="item" :key="item">{{item}}</p>
          <p class="item" v-if="scope.row.rangNum===7" v-for="item in rList7" :value="item" :key="item">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column label="RA" prop="ra"/>
      <el-table-column label="WV" prop="wv"/>
    </el-table>
  </div>
</template>
<script>
import { sumList } from '_u/logic'
import { isNull } from 'util';
export default {
  props:{
    state:{
      default:false,
      type:Boolean,
    },
    tableArray:{
      default:()=> {},
      type:Array
    },
    detailState:{
      default:false,
      type:Boolean
    },
    goodsName:{
      default:'',
      type:String
    }
  },
  data(){
    return{
      deState:false,
      numCount:0,
      productName:'',
      rangelist6:[
        ' TP<100',
        '100<=TP<120',
        '120<=TP<150',
        '150<=TP<180',
        '180<=TP<200',
        '200<=TP<300'
      ],
      rangelist5:[
        'TP<20',
        '20<=TP<50',
        '50<=TP<70',
        '70<=TP<90',
        '90<=TP<100'
      ],
      rangelist7:[
        'C>=12',
        '8<=C<12',
        '5<=C<8',
        '2.5<=C<5',
        'C<2.5'
      ],
      rList5:[70,80,85,90,95],
      rList6:[100,97,95,92,90,85],
      rList7:[95,92,88,85,80],
      tableData:[
        {
          index:'',
          num:'代码',
          c:'当前数据',
          tp:'目标设定（%）',
          t:'目标数据值',
          w:'权重（合计0%）',
          range:'range条件',
          r:'range范围值（%）',
          ra:'range取值（%）',
          wv:'加权值'
        },
        {
          index:'1',
          name:'库存',
          num:'S',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:5,
        },
        {
          index:'2',
          name:'日销量',
          num:'V',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:6,
        },
         {
          index:'3',
          name:'利润率',
          num:'PM',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:6,
        },
         {
          index:'4',
          name:'利润值',
          num:'P',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:6,
        },
         {
          index:'5',
          name:'店铺会员数(取累计均值)',
          num:'M',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:0,
        },
         {
          index:'6',
          name:'会员人均购买力(取累计均值)',
          num:'B',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:0,
        },
         {
          index:'7',
          name:'月复购频次(取累计均值)',
          num:'FM',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:0,
        },
         {
          index:'8',
          name:'会员购买力指数(万)',
          num:'BM',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv: '',
          rangNum:7,
        }
      ],
      firstObj: {
          index:'',
          num:'代码',
          c:'当前数据',
          tp:'目标设定（%）',
          t:'目标数据值',
          w:'权重（合计%）',
          range:'range条件',
          r:'range范围值（%）',
          ra:'range取值（%）',
          wv:'加权值'
        },
    }
  },
  watch:{
    'tableData'(e){
      // console.log(e, 'kkkkkkkk')
    },
    'state'(e){
      if(e){
        this.$emit('getDiscountList', this.tableData)
      }else{

      }
    },
    'tableArray'(e){
      let Arr = []
      Arr.push(this.firstObj)
      e.map(item=> {
        Arr.push(item)
      })
      this.tableData = Arr
      this.blurInput()
    },
    'detailState'(e){
      this.deState = e
    },
    'goodsName'(e){
      this.productName = e
    }
  },
  mounted(){
    this.blurInput()
    // console.log(this.tableData, 'table....')
  },
  methods:{
    blurInput(){
      let wTotal = 0
      for(let i =1;i<this.tableData.length;i++){
        if(i==5||i==6||i==7){

        }else{
          if(this.tableData[i].w){
            wTotal+= this.tableData[i].w
          }
        }
      }
      if(wTotal<=100){
        this.tableData[0].w=`权重（合计${wTotal}%）`
      }else{
        this.$message.warning('权重总和不能超过100！')
      }

    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '折扣率';
          return;
        }
         const values = data.map(item => {
          if (column.property === 'wv' && item[column.property]) {
            return Number(item[column.property])
          }
        })
        if (values) {
          let number = 0
          values.forEach(item => {
            if(item&&!isNaN(item)){
              number+= item
            }
          })
          sums[10] = `${number.toFixed(2)}`
        } else {
          sums[index] = ''
        }
      });
      this.numCount = sums
      return sums;
    }
  }
}
</script>
<style>
.item{
  border-bottom: 1px solid rgb(223, 230, 236);
  /* padding:0px;   */
  margin:0px;
}
p{
  align-content: center;
}
.header{
  height: 40px;
  width: 70%;
  background-color: #f0f2f3;
  border-bottom:1px solid #dfe6ec;
  color: #909399;
  font-weight: 500;
  text-align:center;
  line-height: 40px;
  font-weight: bold;
}
</style>
