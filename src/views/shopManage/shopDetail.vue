<template>
  <div>
    <breadcrumb :stateShow="breadState"></breadcrumb>
    <!-- 详情显示 -->
    <!-- <el-dialog :visible="showDetail" width="1000px" height="700" :before-close="handleCloseDetail"> -->
      <!-- <div slot="title" class="title-size-color">店铺详情</div> -->
      <div class="size-color div-margin">
        <span class="font-weight">店铺ID：</span>{{ shopObject.id }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺名称：</span>{{ shopObject.name }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺简称：</span>{{ shopObject.simpleName }}
      </div>
      <div class="size-color div-margin" style="display:flex;flex-direction:row;align-items: flex-start;">
        <span class="font-weight">店铺图片：</span> <div style="margin-left:4px;"  v-for="url in urlList"><img :src="url" style="width:100px;height:100px;"></div>
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">掌柜姓名：</span>{{ shopObject.adminName }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">手机号：</span>{{ shopObject.adminPhone }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">初始密码：</span> {{ shopObject.adminPassword }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">店铺地址：</span>{{ shopObject.detailsAddress }}
      </div>
      <div class="size-color div-margin">
        <span class="font-weight"> 店铺面积：</span>{{ shopObject.area }} m&sup2;
      </div>
      <div class="size-color div-margin">
        <span class="font-weight">经营品类：</span>
        <!-- <el-table :data="categoryTable" :header-cell-style="tableHeaderColor" :span-method="objectSpanMethod"> -->
        <el-table
            :data="categoryTable"
            center
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="id" label="一级品类">
              <template slot-scope="scope">
                {{ scope.row.childrenName }}
                <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(scope.row)">{{ scope.row.childrenName }}</el-checkbox>
                <el-checkbox-group>
                  <el-checkbox :label="scope.row">{{ scope.row.childrenName }}</el-checkbox>
                </el-checkbox-group> -->
              </template>
            </el-table-column>
            <el-table-column prop="id" label="一级品类ID">
              <template slot-scope="scope">
                <p>{{ scope.row.childrenId }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="二级品类">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="ids" label="二级品类ID">
              <template slot-scope="scope">
                {{ scope.row.id }}
                <!-- <el-checkbox-group v-show="scope.row.id">
                  <el-checkbox :label="scope.row">{{ scope.row.id }}</el-checkbox>
                </el-checkbox-group> -->
              </template>
            </el-table-column>
          </el-table>
      </div>
      <!-- <div class="" style="margin:10px;display:flex;flex-direction: row;font-size:18px;color:#6e7b99;font-weight:bold;"> -->
      <div>
        <span style="font-weight:bold;">职员人数：</span>
        <staff :staffTable ="staffTable"></staff>
      </div>
      <div class="size-color">
        <span class="font-weight">经营模式：</span>{{ shopObject.management }}
      </div>
      <div class="size-color">
        <span class="font-weight">成本结构：</span>
      </div>
      <div class="size-color">
        <span class="font-weight">会员人数(人)：</span> {{shopObject.members}}
      </div>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import staff from './staff.vue'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'shopDetail',
  // props: {
  //   shopObject: {
  //     type: Object,
  //     default: Array
  //   }
  // },
  components:{staff, Breadcrumb},
  data() {
    return {
      employeeTable: [],
      categoryTable: [],
      mergeList: [],
      shopObject: {},
      urlList: [],
      staffTable:[],
      breadState:false,
    }
  },
  watch: {
   'shopObject'(e) {
    //  console.log(this.shopObject.imge, 'jjjjj')
     console.log(this.shopObject, 'jjjjj')

      let arr = JSON.parse(this.shopObject.categoryJson)
      this.recursionTableData(arr)
      this.getMergeList()
   }
  },
  mounted() {
    this.breadState = true
    // console.log(JSON.stringify(this.$route.params) == '{}', 'canshuooooooo')
    if(JSON.stringify(this.$route.params) !== '{}'){
      this.urlList= this.$route.params.imge.split(',')
      this.shopObject = this.$route.params
      let arr = JSON.parse(this.shopObject.categoryJson)
      this.staffTable = this.shopObject.shopStaffList
      this.categoryTable = this.recursionTableData(arr)
      this.getMergeList()
    }else{
      // this.$router.push({name: 'shop'})
      window.history.go(-1)
    }
  },
  methods: {
    handleCloseDetail() {
      this.$emit('isCloseDetail', false)
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei; '
      }
    },
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
        if (item.seconds && item.seconds.length) {
          for (const secondsItem of item.seconds) {
            data = {
              childrenId: item.id,
              childrenName: item.name,
              id: secondsItem.id,
              name: secondsItem.name,
              categoryOneId: secondsItem.categoryOneId
            }
            res.push(data)
          }
          this.recursionTableData(item.seconds)
        } else {
          data = {
            childrenId: item.id,
            childrenName: item.name
          }
          res.push(data)
        }
      })
      return res
    },
    // 生成合并数组
    getMergeList() {
      this.mergeList = []
      // console.log(this.categoryTable, '4444444')
      this.categoryTable.forEach((item, index) => {
        // console.log(index, '6666666')
        if (index === 0) {
          this.mergeList.push(1)
          this.position = index
        } else {
          if (item.childrenId === this.categoryTable[index - 1].childrenId) {
            // console.log(this.mergeList[], '8888888')
            this.mergeList[this.position] += 1
            // console.log(this.mergeList, '8888888')
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
