<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="手机号：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="角色：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="初始密码：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        label="用户名"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="手机号"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建时间"
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
  name: 'CategoryList',
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
      dialogVisible: false,
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
</script>

<style scoped>

</style>
