<template>
  <div class="goodsContainers">
    <div>
      <div class="categoryHeader">品类</div>
      <div class="categoryBody">
        <el-tree
          :data="dataTree"
          node-key="id"
          @current-change="changeHandle"
          >
          <template slot-scope="{ node, data }">
            {{data.label}}({{data.id}})
          </template>
        </el-tree>
      </div>
    </div>
    <el-table :data="goodsList" :height="500" ref="multipleTable" @select="selectGoods" @select-all="selectGoodsAll(goodsList)">
      <el-table-column prop="goodsName" label="商品名称"/>
      <el-table-column prop="goodsId" label="商品ID"/>
      <el-table-column prop="standards" label="规格"/>
      <el-table-column prop="unit" label="单位"/>
      <el-table-column type="selection"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
export default {
  data(){
    return{
      dataTree:[],
      goodsList:[],
      checkGoodsList:[],
      categoryOneId:'',
      categoryTwoId:'',
      toggleSelectionList:[],
    }
  },
  watch:{
    'checkGoodsList'(e){
      console.log(e, 'yingxiaobao')
      this.$emit('getGoodFunction', this.checkGoodsList)
    }
  },
  mounted(){
    this.checkGoodsList=[]
    this.getaAllCategory()
  },
  methods:{
    // 商品单选
    selectGoods(a, row){
      console.log(row, 'kkkkkkk')
      let count=0
      let length= this.checkGoodsList.length
      for(let i=0; i<this.checkGoodsList.length; i++){
        if(this.checkGoodsList[i].goodsId === row.goodsId){
          this.checkGoodsList.splice(i, 1)
          return
        }else{
          count++
        }
      }
      console.log(count, length, 'lenght/count.....')
      if(count>=length){
          console.log('changduxiangtong....')
          this.checkGoodsList.push(row)
        }
      console.log(this.checkGoodsList, 'listllllllll')
    },
    // 商品全选
    selectGoodsAll(all){
      console.log(all,'alllllll')
        for(let i=0;i<all.length;i++){
          let count = 0
          let length = this.checkGoodsList.length
          for(let j=0;j<this.checkGoodsList.length;j++){
            if(this.checkGoodsList[j].goodsId === all[i].goodsId){
              this.checkGoodsList.splice(j, 1)
              continue
            }else{
              count++
            }
          }
          console.log(count, length, 'length....')
          if(count >= length){
            console.log('length....')
            this.checkGoodsList.push(all[i])
          }
        }
      console.log(this.checkGoodsList, 'nnnnnnnnn')
    },
    // 查询所有品类
    getaAllCategory(){
      getSecondCategory().then(res => {
        this.categoryOneId = res.info[0].id
        this.categoryTwoId = res.info[0].seconds[0].id
        this.getGoods()
        res.info.forEach(item => {
          let arr = {}
          arr.id = item.id
          arr.label = item.name
          arr.children = item.seconds
          arr.children = []
          item.seconds.forEach(a => {
            let obj = {}
            obj.id = a.id
            obj.label = a.name
            arr.children.push(obj)
          })
          this.dataTree.push(arr)
        });
      }).catch(err => {
        console.log(err)
        this.$message.error('查询品类出错！')
      })
    },
    // 品类树形选择处理
    changeHandle(e){
        this.categoryOneId = ''
        this.categoryTwoId = ''
      if(e.children){
        this.categoryOneId = e.id
        this.getGoods()
      }else{
        this.categoryTwoId = e.id
        this.getGoods()
      }
    },
    // 查询商品
    getGoods(){
      getGoods(this.categoryOneId, this.categoryTwoId).then(res => {
        if(res.status === 1){
          this.goodsList = res.info
          this.handleToggle(res.info, this.checkGoodsList)
        }else{
          this.$message.info('此品类下暂无商品！')
        }
      }).catch(err=> {
        console.log(err)
        this.$message.error('查询商品出错！')
      })
    },
    // 生成编辑回显数据
    handleToggles(rows,all) {
      rows.forEach(item => {
        if(JSON.stringify(all).includes(item.goodsId)){
          this.goodsList.forEach(e => {
            if(e.goodsId === item.goodsId){
              let index = this.goodsList.indexOf(e)
              this.toggleSelectionList.push(this.goodsList[index])
            }
          })
        }
      })
        this.toggleSelection(this.toggleSelectionList)
    },
    // 生成添加回显的数组
    handleToggle(rows,all) {
      rows.forEach(item => {
        if(JSON.stringify(all).includes(item.goodsId)){
          let index = this.goodsList.indexOf(item)
          this.toggleSelectionList.push(this.goodsList[index])
        }
      })
        this.toggleSelection(this.toggleSelectionList)
    },
    // 回显数据
    toggleSelection(rows) {
      let _this = this
      _this.$nextTick(function() {
        if (rows) {
          rows.forEach(row => {
            _this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          _this.$refs.multipleTable.clearSelection()
        }
      })
    },
  }
}
</script>
<style>
.categoryHeader{
    width: 260px;
    height:55px;
    background-color: #f0f2f3;
    text-align: center;
    line-height: 60px;
    color:#909399;
    font-weight: 700;
  }
  .goodsContainers{
    display:flex;
    flex-direction: row;
    width:80%;
  }
  .categoryBody{
    width:100px;
    height:745px;
    border:1px solid #f0f2f3;
    background-color:#FFFFFF;
  }
  el-tree{
    /* // width:200px; */
    height:746px;
    border:1px solid #f0f2f3;
  }
</style>
