<template>
  <div>
    <el-dialog
      title="编辑一级品类"
      :visible.sync="stair"
      width="50%"
      :before-close="handleClose">
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
      width="50%"
      :before-close="handleClose">
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
    <hint v-model="hintState" :title="'删除'" :text="'是否删除该后台用户？'" @confirm="deleteUser" />
    <el-table
      :data="dataList"
      center
      stripe
    >
      <el-table-column
        prop="date"
        label="一级品类"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="一级品类ID"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="二级品类"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="二级品类ID"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
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
            @click="removeData(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import hint from '@/components/Hint'
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
        dataList: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        ruleForm: [],
        rules: [],
        // 一级品类
        stair: false,
        // 二级品类
        second: false,
        hintState: false,
        listIndex: '',
        listRow: {}
      }
    },
    mounted() {

  },
  methods: {
    // 编辑
    editData(index, row) {
      this.dialogVisible = true
    },
    methods: {
      // 编辑
      editData(index, row) {
        this.stair = true
      },
      // 删除
      removeData(index, row) {
        this.hintState = true
        this.listIndex = index
        this.listRow = row
      },
      // 删除用户
      deleteUser() {
        this.dataList.splice(this.listIndex, 1)
        // 成功后隐藏
        this.hintState = false
      }
    }
  }
}
</script>

<style scoped>

</style>
