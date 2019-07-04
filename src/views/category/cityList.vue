<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="name"
        label="省">
        <template slot-scope="scope" v-if="scope.row.childrenId">
          <el-button
            size="mini"
            type="primary"
            @click="edit(scope.$index, scope.row, '一级')"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row, '一级')"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="市">
        <template slot-scope="scope" v-if="scope.row.childrenId">
          <el-button
            size="mini"
            type="primary"
            @click="edit(scope.$index, scope.row, '二级')"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row, '二级')"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="区/县">
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
        <template slot-scope="scope" v-if="scope.row.childrenId">
          <el-button
            size="mini"
            type="primary"
            @click="edit(scope.$index, scope.row, '三级')"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row, '三级')"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加二级品类"
      :visible.sync="dialogChildren"
      width="40%">
      <el-select v-for="" v-model="optionValue" placeholder="请选择一级品类" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsStair"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="addChildrenInput">+</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChildren = false">取 消</el-button>
        <el-button type="primary" @click="addChildren">确 定</el-button>
      </span>
    </el-dialog>
    <select-area>

    </select-area>
  </div>
</template>

<script>
  import {selectSysProvince, selectSysCity, selectSysArea} from '@/api/category/cityList'
  import selectArea from '_c/selectArea'
  export default {
    name: 'cityList',
    components: {
      selectArea
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

      },
      edit() {

      },
      removeData() {

      }
    }
  }
</script>

<style scoped>

</style>
