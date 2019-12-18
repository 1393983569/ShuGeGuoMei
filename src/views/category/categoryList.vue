<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button size="mini" v-if="bottonList.includes('操作')" type="primary" @click="dialogStair = true, stairInput = [{value: ''}]">添加一级品类</el-button>
      <el-button  size="mini" v-else type="primary" disabled>添加一级品类</el-button>
      <el-button  size="mini" v-if="bottonList.includes('操作')" type="primary" @click="dialogChildren = true, childrenInput = [{value: ''}], optionValue = ''">添加二级品类</el-button>
      <el-button  size="mini" v-else type="primary" disabled>添加二级品类</el-button>
    </breadcrumb>
    <el-dialog
      title="编辑一级品类"
      :visible.sync="stair"
      width="50%">
      <p>一级品类ID：{{showStairData.stairId}}</p>
      <div style="display: flex; line-height: 36px">
        <div style="display: inline-block; width: 30%;">一级品类名称：</div>
        <el-input v-model="showStairData.stairName" style="display: inline-block;"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stair = false">取 消</el-button>
        <el-button type="primary" @click="editStair">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑二级品类"
      :visible.sync="second"
      width="50%">
      <p>一级品类ID：{{showSecondData.stairId}}</p>
      <p>一级品类：{{showSecondData.stairName}}</p>
      <p>二级品类ID：{{showSecondData.childrenId}}</p>
      <div style="display: flex; line-height: 36px">
        <div style="display: inline-block; width: 30%;">二级品类名称：</div>
        <el-input v-model="showSecondData.childrenName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="second = false">取 消</el-button>
        <el-button type="primary" @click="editSecond">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加一级品类"
      :visible.sync="dialogStair"
      width="40%"  >
        <virtual-list :remain="9" :size="40">
          <el-input style="margin-bottom: 5px;" v-for="(item, index) in stairInput" :key="`${index}_s`" v-model="item.value" placeholder="请输入品类">
          <i
            style="margin-top:10px;cursor: pointer;"
            class="el-icon-circle-close"
            slot="suffix"
            @click="handleIconClick(index)">
          </i>
        </el-input>
        <el-button @click="addStairInput">+</el-button>
      </virtual-list>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogStair = false">取 消</el-button>
        <el-button type="primary" @click="addStair">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加二级品类"
      :visible.sync="dialogChildren"
      width="40%">
      <!-- :key="`${item.id}_o`" -->
    <el-select v-model="optionValue" placeholder="请选择一级品类" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsStair"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <virtual-list :remain="9" :size="40">
        <el-input style="margin-bottom: 5px" v-for="(item, index) in childrenInput" :key="`${index}_s`" v-model="item.value" placeholder="请输入品类">
          <i
            style="margin-top:10px;cursor: pointer;"
            class="el-icon-circle-close"
            slot="suffix"
            @click="handleSecondIconClick(index)">
          </i>
        </el-input>
        <el-button @click="addChildrenInput">+</el-button>
      </virtual-list>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChildren = false">取 消</el-button>
        <el-button type="primary" @click="addChildren">确 定</el-button>
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
            v-if="bottonList.includes('操作')"
            @click="edit(scope.$index, scope.row, '一级')"
          >编辑</el-button>
          <el-button v-else disabled size="mini" type="primary">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="bottonList.includes('操作')"
            @click="removeData(scope.$index, scope.row, '一级')"
          >删除</el-button>
          <el-button v-else disabled size="mini" type="danger">删除</el-button>
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
        <template slot-scope="scope" v-if="scope.row.childrenId">
          <el-button
            size="mini"
            type="primary"
            v-if="bottonList.includes('操作')"
            @click="edit(scope.$index, scope.row, '二级')"
          >编辑</el-button>
          <el-button v-else disabled size="mini" type="danger">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="bottonList.includes('操作')"
            @click="removeData(scope.$index, scope.row, '二级')"
          >删除</el-button>
          <el-button v-else disabled size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import virtualList from 'vue-virtual-scroll-list'
  import hint from '@/components/Hint'
  import { getSecondCategory, deleteCategoryOne, delCategoryTwo, addCategoryOne, selectAll, addCategoryTwo, editCategoryTwo, updateCategoryOne } from '@/api/category/categoryList'
  import clonedeep from 'clonedeep'
  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'categoryList',
    components: {
      hint,
      Breadcrumb,
      virtualList
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
        removeState: '',
        dialogStair: false,
        dialogChildren: false,
        // 品类输入框数组
        stairInput: [{value: ''}],
        childrenInput: [{value: ''}],
        optionsStair: [],
        optionValue: '',
        indexSecond: '',
        rowSecond: '',
        editState: '',
        showStairData: {
          stairName: '',
          stairId: ''
        },
        showSecondData: {
          stairName: '',
          stairId: '',
          childrenId: '',
          childrenName: ''
        },
        bottonList:[],
      }
    },
    beforeRouteEnter (to, form, next) {
    console.log(to)
      next(mv => {
        mv.getButton(mv.$store.getters.buttonRoleList, to.name)
      })
    },
    mounted() {
      this.getList()
      this.getStair()
    },
    methods: {
      getButton(list, name) {
        list.forEach(item => {
          if (item.name === name) {
            this.bottonList = item.checkList
          }
        })
      },
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
          this.$message.success('删除成功！')
          this.getStair()
        }).catch(err => {
          console.log(err)
        })
      },
      // 删除二级
      removeChildren(row) {
        delCategoryTwo(row.stairId,row.childrenId).then(res => {
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
          if(res.status ===1){
            this.$message.success('删除成功！')
            this.getStair()
          }
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
      edit(index, row, state) {
        this.indexSecond = index
        this.rowSecond = row
        this.editState = state
        if (state === '一级') {
          this.stair = true
          this.showStairData.stairId = row.stairId
          this.showStairData.stairName = row.stairName
        } else {
          this.second = true
          this.showSecondData.stairId = row.stairId
          this.showSecondData.stairName = row.stairName
          this.showSecondData.childrenId = row.childrenId
          this.showSecondData.childrenName = row.childrenName
        }
      },
      // ID补位
      addIdOne(data, i) {
        let intData = parseInt(data)
        let value = ''
        if (intData < 9) {
         if((intData+i)<10){
           value = `0${intData + i}`
         }else{
           value = intData + i+''
         }
        }else{
          value = intData + i+''
        }
        return value
      },
      addIdTwo(data, i) {
        let intData = parseInt(data)
        let value = ''
        if (intData < 9&&(intData+i)<10) {
         value = `00${intData + i}`
        } else if((intData>9&&intData<99)||((intData+i)>=10&&(intData+i)<100)) {
          value = `0${intData + i}`
        }else{
          value = intData + i + ''
        }
        return value
      },
      addStair() {
        let arr = this.dataList
        let id = ''
        let stairList = []
        let addId = ''
        if(this.dataList.length>0){
          for (let i = arr.length -1, tmp; i > 0; i--) {
            for (let j = 0; j < i; j++) {
              tmp = this.dataList[j]
              if (parseInt(tmp.stairId) > parseInt(this.dataList[j+1].stairId)) {
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp
              }
            }
          }
          id = arr[arr.length - 1].stairId
        }else{
          id = '01'
        }
        // 排序一级品类
        // for (let i = arr.length -1, tmp; i > 0; i--) {
        //   for (let j = 0; j < i; j++) {
        //     tmp = this.dataList[j]
        //     if (parseInt(tmp.stairId) > parseInt(this.dataList[j+1].stairId)) {
        //       arr[j] = arr[j + 1]
        //       arr[j + 1] = tmp
        //     }
        //   }
        // }
        // id = arr[arr.length - 1].stairId
        let count = 0
        let lentCount = 0
        let i = 0
        // console.log(this.stairInput, 'stairInput//////')
        if(this.dataList.length>0){
          i = 1
        }
        this.stairInput.forEach((item, index) => {
          if(item.value){
            if(item.value.length<=6){
              console.log(id, index, )
              stairList.push({
                id: this.addIdOne(id, index+i),
                name: item.value
              })
            }else{
              lentCount++
            }
          }else{
            count++
          }
        })
        if(count>0){
          this.$message.warning('一级品类的名称不能存在空值！')
          return
        }
        if(lentCount>0){
          this.$message.warning('一级品类的名称不能超过6个字符！')
          return
        }

        // console.log(stairList, 'stairList....')
        // return
        addCategoryOne(stairList).then(res => {
          this.dialogStair = false
          this.getList()
          this.getStair()
        }).catch(err => {
          console.log(err)
        })
      },
      // 添加二级品类
      addChildren() {
        let arr = []
        let id = ''
        let listChildren = []

        arr = this.dataList.filter(item => {
          if (item.childrenId) return item
        })
        if(arr.length>0){
          let quickSort = (list) => {
           let len = list.length
            if (len < 2) {
              return list
            } else {
              let flag = list[0]
              let left = []
              let right = []
              for (let i = 1; len > i; i++) {
                let tmp = list[i]
                if (parseInt(flag.childrenId) > parseInt(tmp.childrenId)) {
                  left.push(tmp)
                } else {
                  right.push(tmp)
                }
              }
              return quickSort(left).concat(flag, quickSort(right))
            }
          }
          id = quickSort(arr)[arr.length - 1].childrenId
          console.log('id:', id, 'quickSort(arr):', quickSort(arr))

        }else{
          id='001'
        }
        let count = 0
        let lenCount = 0
        let i= 0
        this.dataList.map(item=> {
          if(item.childrenName){
            i= 1
            return
          }
        })
        this.childrenInput.forEach((item, index) => {
          if(!item.value){
            count++
          }
          if(item.value.length>6){
            lenCount++
          }
          let data = {
            id: this.addIdTwo(id, index+i),
            categoryOneId : this.optionValue,
            name: item.value
          }
          listChildren.push(data)
        })
        if(count>0){
          this.$message.warning('二级品类名称不能存在空值！')
          return
        }
        if(lenCount>0){
          this.$message.warning('二级品类名称不能超过6个字符！')
          return
        }

        // return
        addCategoryTwo(listChildren).then(res => {
          this.dialogChildren = false
          this.getList()
        }).catch(err => {
          console.log(err)
        })
      },
      // 添加一级品类input数组
      addStairInput() {
        let count = 0
        this.stairInput.forEach(item => {
          if(item.value.length>6){
            count++
          }
        })
        if(count>0){
          this.$message.warning('一级品类名称不超过6个汉字!')
          return
        }
        this.stairInput.push({
          value: ''
        })
      },
      // 添加二级品类input数组
      addChildrenInput() {
        let count = 0
        this.childrenInput.forEach(item => {
          if(item.value.length>6){
            count++
          }
        })
        if(count>0){
          this.$message.warning('二级品类名称超过6个汉字！')
          return
        }
        this.childrenInput.push({
          value: ''
        })
      },
      // 获取一级品类
      getStair() {
        this.optionsStair = []
        selectAll().then(res => {
          this.optionsStair.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      // 编辑二级
      editSecond() {
        if(!this.showSecondData.childrenName){
          this.$message.warning('二级品类的名称不能为空！')
          return
        }
        if(this.showSecondData.childrenName.length>6){
          this.$message.warning('二级品类的名称长度不能超过6汉字！')
          return
        }
        let data = {
          name: this.showSecondData.childrenName,
          id: this.showSecondData.childrenId,
          categoryOneId: this.showSecondData.stairId
        }

        editCategoryTwo(data).then(res => {
          if(res.status === 1){
            this.second = false
            this.$message.success('修改成功！')
            this.getList()
          }
        }).catch(err => {

        })
      },
      // 编辑一级
      editStair() {
        if(!this.showStairData.stairName){
          this.$message.warning('品类名称不能为空')
          return
        }else if(this.showStairData.stairName.length>6){
          this.$message.warning('品类名称不能超过6个汉字！')
          return
        }
        let data = {
          id: this.showStairData.stairId,
          name: this.showStairData.stairName,
        }
        updateCategoryOne(data).then(res => {
          if(res.status ===1){
            this.stair = false
            this.getList()
            this.$message.success('修改成功！')
          }
        }).catch(err => {

        })
      },
      handleIconClick(index){
        if(this.stairInput.length<=1){

        }else{
          this.stairInput.splice(index, 1)
        }
      },
      handleSecondIconClick(index){
        if(this.childrenInput.length<=1){

        }else{
          this.childrenInput.splice(index, 1)
        }

      },
    }
}
</script>

<style scoped>
.a{

}
</style>
