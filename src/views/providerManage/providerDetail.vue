<template>
  <div>
    <p>供应商ID：{{providerObj.id}}</p>
    <!-- <p>供应商名称：{{providerObj.name}}</p> -->
    <div style="display:flex;flex-direction:row;align-items: flex-start;">门头照片：<img :src="providerObj.headerPic" style="width: 200px;height:200px;"/></div>
    <p>联系人：{{providerObj.contactName}}</p>
    <p>手机号：{{providerObj.mobile}}</p>
    <p>座机号：{{providerObj.phone}}</p>
    <p>微信：{{providerObj.wechat}}</p>
    <p>QQ：{{providerObj.qq}}</p>
    <p>邮箱：{{providerObj.email}}</p>
    仓库地址：<span>{{province}}</span>
    <span>{{city}}</span>
    <span>{{area}}</span>
    <p>详细地址：{{providerObj.addressDetail}}</p>
    <p>仓库面积：{{providerObj.area}}m<sup>2</sup></p>
    <p>备注：{{providerObj.remark}}</p>
    <p>可配送店铺列表：<span v-for="item in providerObj.providerShopList">{{item.name}},</span></p>
    <p>供应商品：
      <el-table
            :data="categoryTable"
            center
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="childrenName" label="一级品类">
              <template slot-scope="scope">
                {{ scope.row.childrenName }}
                <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(scope.row)">{{ scope.row.childrenName }}</el-checkbox>
                <el-checkbox-group>
                  <el-checkbox :label="scope.row">{{ scope.row.childrenName }}</el-checkbox>
                </el-checkbox-group> -->
              </template>
            </el-table-column>
            <el-table-column prop="childrenId" label="一级品类ID">
              <template slot-scope="scope">
                <p>{{ scope.row.childrenId}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="二级品类">
              <template slot-scope="scope">
                <p>{{ scope.row.name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="二级品类ID">
              <template slot-scope="scope">
                {{ scope.row.id }}
                <!-- <el-checkbox-group v-show="scope.row.id">
                  <el-checkbox :label="scope.row">{{ scope.row.id }}</el-checkbox>
                </el-checkbox-group> -->
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称"/>
            <el-table-column prop="goodsId" label="商品ID"/>
            <el-table-column prop="standards" label="规格"/>
            <el-table-column prop="unit" label="单位"/>
          </el-table>
    </p>
    <!-- <p>资质照片：<img v-for="url in imgList" :src="url" /></p> -->
    <div>
      评分：
      <div style="margin-left:50px;">
        <span>资质：{{providerObj.qualificationScore}}</span>&nbsp;&nbsp;<span>满分=5</span><el-button style="margin-left:20px;" size="mini" type="success">去评分</el-button><br/>
        <span>价格分：{{providerObj.priceScore}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>品质分：{{providerObj.qualityScore}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>服务分：{{providerObj.serviceScore}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>配送店铺数量分：{{providerObj.deliverShopScore}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
      </div>
    </div>
  </div>
</template>
<script>
import {getProviderDetail} from '@/api/provider.js'
export default {
  name: 'providerDetail',
  data() {
    return {
      providerObj:{},
      imgList:[],
      mergeList:[],
      categoryTable: [],
      city:'',
      province:'',
      area:''
    }
  },
  mounted(){
    console.log(this.$route.params,'HHHHHH')
    if(JSON.stringify(this.$route.params)!== '{}') {
      console.log(this.$route.params.id,'kkkkkkkkkkk')
      getProviderDetail(this.$route.params.id).then(res => {
          this.providerObj = res.info
          if(res.info.provinceDomain){
            this.province = res.info.provinceDomain.name
          }
          if(res.info.cityDomain){
            this.city = res.info.cityDomain.name
          }
          if(res.info.areaDomain){
            this.area = res.info.areaDomain.name
          }
          this.categoryTable =this.recursionTableData(this.providerObj.providerGoodsList)
          this.getMergeList()
      }).catch(err => {
        console.log(err)
        window.history.go(-1)
        this.$message.error('查询供应商详情失败！')
      })
    }else{
      this.$message.warning('此供应商暂无详情！')
    }
  },
  methods:{
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowData = this.mergeList[rowIndex]
        const colData = rowData > 0 ? 1 : 0
        return {
          rowspan: rowData,
          colspan: colData
        }
      }
      if (columnIndex === 1) {
        const rowData = this.mergeList[rowIndex]
        const colData = rowData > 0 ? 1 : 0
        return {
          rowspan: rowData,
          colspan: colData
        }
      }
    },
    // 递归单元格
    recursionTableData(arr) {
      const res = []
      arr.forEach((item, index) => {
        let data = {}
      //   if (item.seconds && item.seconds.length) {
      //     for (const secondsItem of item.seconds) {
      //       data = {
      //         childrenId: item.id,
      //         childrenName: item.name,
      //         id: secondsItem.id,
      //         name: secondsItem.name,
      //         categoryOneId: secondsItem.categoryOneId
      //       }
      //       res.push(data)
      //     }
      //     this.recursionTableData(item.seconds)
      //   } else {
      //     data = {
      //       childrenId: item.id,
      //       childrenName: item.name
      //     }
      //     res.push(data)
      //   }
      // })
      console.log(item , 'item.........')
        data = {
          childrenId: item.categoryOneId,
          childrenName: item.categoryOneName,
          id: item.categoryTwoId,
          name: item.categoryTwoName,
          categoryOneId: item.categoryOneId,
          goodsName:item.goodsName,
          standards:item.standards,
          goodsId:item.goodsId,
          unit:item.unit,
        }
        res.push(data)
      })
      return res
    },
    // 生成合并数组
    getMergeList() {
      this.mergeList = []
      this.categoryTable.forEach((item, index) => {
        if (index === 0) {
          this.mergeList.push(1)
          this.position = index
        } else {
          if (item.childrenId === this.categoryTable[index - 1].childrenId) {
            this.mergeList[this.position] += 1
            this.mergeList.push(0)
          } else {
            this.mergeList.push(1)
            this.position = index
          }
        }
      })
    },
  }
}
</script>
<style>

</style>
