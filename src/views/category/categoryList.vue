<template>
  <div>
    <el-dialog
      title="编辑一级品类"
      :visible.sync="stair"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <p>一级品类ID：01</p>
        <el-form-item label="一级品类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stair = false">取 消</el-button>
        <el-button type="primary" @click="stair = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑二级品类"
      :visible.sync="second"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <p>一级品类ID：01</p>
        <p>一级品类：瓜</p>
        <p>二级品类ID：01</p>
        <el-form-item label="一级品类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="second = false">取 消</el-button>
        <el-button type="primary" @click="second = false">确 定</el-button>
      </span>
    </el-dialog>
    <hint v-model="hintState" :title="'删除'" :text="'是否删除该数据?'" @confirm="deleteUser" />
    <el-table
      :data="dataList"
      :span-method="objectSpanMethod"
      stripe
      border
    >
      <el-table-column
        prop="date"
        label="一级品类"
        width="280"
      >
        <template slot-scope="scope">
          <div style="margin-bottom: 5px;">{{ scope.row.stairName }}</div>
          <el-button
            size="mini"
            type="primary"
            @click="editStair(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row, '一级')"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="一级品类ID"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.stairId }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="二级品类"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.childrenName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="二级品类ID"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.childrenId }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editData(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row, '二级')"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import hint from '@/components/Hint'
  import { getSecondCategory, deleteCategoryOne, delCategoryTwo } from '@/api/category/categoryList'
  import clonedeep from 'clonedeep'
  export default {
    name: 'categoryList',
    components: {
      hint
    },
    props: {
      row: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        dataList: [],
        ruleForm: [],
        rules: [],
        // 一级品类
        stair: false,
        // 二级品类
        second: false,
        hintState: false,
        listIndex: '',
        listRow: {},
        spanArr: [],
        selectIndex: '',
        selectRow: {},
        removeState: ''
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getSecondCategory().then(res => {
          this.getCategoryList(res.info)
          this.spanArr = this.gteRule(this.dataList)
        }).catch(err => {
          console.log(err)
        })
      },
      // 展开后台返回的品类数据
      getCategoryList(arr) {
        this.dataList = []
        arr.forEach(item => {
          if (item.seconds.length !== 0) {
            item.seconds.forEach(itemx => {
              let data = {}
              data.stairName = item.name
              data.stairId = item.id
              data.childrenName = itemx.name
              data.childrenId = itemx.id
              data.childrenName = itemx.name
              data.childrenCategoryOneId = itemx.categoryOneId
              this.dataList.push(data)
            })
          } else {
            let data = {}
            data.stairName = item.name
            data.stairId = item.id
            this.dataList.push(data)
          }
        })
      },
      // 编辑
      editData(index, row) {
        this.stair = true
      },
      // 删除一级品类
      removeStair(row) {
        deleteCategoryOne(row.stairId).then(res => {
          let list = []
          let cloneList = clonedeep(this.dataList)
          list = cloneList.filter((item, i) => {
            if (row.stairId !== item.stairId) {
              return cloneList[i]
            }
          })
          // 重置合并规则
          this.spanArr = this.gteRule(list)
          this.dataList = clonedeep(list)
          this.hintState = false
        }).catch(err => {
          console.log(err)
        })
      },
      // 删除二级
      removeChildren(row) {
        delCategoryTwo(row.childrenId).then(res => {
          let list = []
          let cloneList = clonedeep(this.dataList)
          list = cloneList.filter((item, i) => {
            if (row.childrenId !== item.childrenId) {
              return cloneList[i]
            }
          })
          // 重置合并规则
          this.spanArr = this.gteRule(list)
          this.dataList = clonedeep(list)
          this.hintState = false
        }).catch(err => {
          console.log(err)
        })
      },
      // 删除
      removeData(index, row, state) {
        this.selectRow = row
        this.selectIndex = index
        this.removeState = state
        this.hintState = true
      },
      // 删除用户
      deleteUser() {
        if (this.removeState === '一级') {
          this.removeStair(this.selectRow)
        } else {
          this.removeChildren(this.selectRow)
        }
      },
      // 合并列
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 1) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      // 得到合并规则
      gteRule(err) {
        let listIndex = 0
        let listRule = []
        err.forEach((item, index) => {
          if (index === 0) {
            listRule.push(1)
            listIndex = 0
          } else {
            if (err[index].stairId === err[index - 1].stairId) {
              listRule[listIndex] += 1
              listRule.push(0)
            } else {
              listRule.push(1)
              listIndex = index
            }
          }
        })
        return listRule
      },
      // 编辑一级品类
      editStair(index, row) {
        console.log(index, row)
      }
    }
}
</script>

<style scoped>

</style>
