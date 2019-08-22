<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="折扣包名称：" prop="name">
        <el-input v-model="ruleForm.name" style="width:300px;" placeholder="请输入折扣包名称"></el-input>
      </el-form-item>
      <el-form-item label="选择店铺：" prop="shopId">
        <el-select v-model="shopId" placeholder="请选择">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品：" prop="name">
        <div class="goodsContainer">
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
          <el-table :data="goodsList" :height="500" ref="multipleTable" @select="selectGoods" @select-all="selectGoodsAll">
            <el-table-column prop="goodsName" label="商品名称"/>
            <el-table-column prop="goodsId" label="商品ID"/>
            <el-table-column prop="standards" label="规格"/>
            <el-table-column prop="unit" label="单位"/>
            <el-table-column type="selection"></el-table-column>
          </el-table>
        </div>
        <span class="hint">*S>2V参与计算，否则DR=100%</span>
        <!-- <textarea cols="24" rows="20" style="border:1px solid #FFFFFF;">
          <div style="width:200px;height:200px;background-color:red;">
          </div>
        </textarea> -->
      </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAllShop } from '@/api/shop.js'
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
export default {
  data(){
    return {
      shopList:[],
      shopId:'',
      ruleForm:{},
      rules:{},
      dataTree:[],
      checkGoodsList:[],
      categoryOneId: '',
      categoryTwoId: '',
      goodsList:[],
      toggleSelectionList:[],
    }
  },
  mounted(){
    this.getaAllCategory()
    this.getAllShopList()
  },
  methods:{
    // 查询所有店铺
    getAllShopList() {
      getAllShop().then(res => {
        this.shopList = res.info
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
    },
    // 商品单选
    selectGoods(a, row){
      console.log(this.checkGoodsList, row,  this.checkGoodsList.includes(row))
      if(JSON.stringify(this.checkGoodsList).includes(JSON.stringify(row))) {
        let index = this.checkGoodsList.indexOf(row)
        this.checkGoodsList.splice(index, 1)
      }else{
        this.checkGoodsList.push(row)
      }
      console.log(this.checkGoodsList,row, 'danxuan ')
    },
    // 商品全选
    selectGoodsAll(all){
      console.log(all, 'all')
      if(this.checkGoodsList.length) {
        let arr = all.filter(res => {
          return this.checkGoodsList.every(item => {
            return res.goodsId !== item.goodsId
          })
        })
        // console.log(arr)
        this.checkGoodsList = this.checkGoodsList.concat(arr)
      }else{
        all.forEach(temp => {
          this.checkGoodsList.push(temp)
        })
      }
      console.log(this.checkGoodsList, 'quanxuan ')
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
    // 必填项验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置必填项
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
  .goodsContainer{
    display:flex;
    flex-direction: row;
    width:90%;
  }
  .categoryBody{
    width:260px;
    height:445px;
    border:1px solid #f0f2f3;
    background-color:#FFFFFF;
  }
  el-tree{
    /* // width:200px; */
    height:445px;
    border:1px solid #f0f2f3;
  }
  .hint{
    color: rgba(102, 102, 102, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
</style>
