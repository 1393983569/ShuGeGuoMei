<template>
  <div style="margin:20px;">
    <!-- 头部查询 -->
    <div class="size-color" style="display:float;">
      查询类型：<el-select v-model="dateType">
        <el-option v-for="item in dateTypeList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div v-if="dateState === 2">整年：<el-date-picker v-model="year" type="year" placeholder="选择年" /></div>
      <div v-else-if="dateState === 3">整月：<el-date-picker v-model="month" type="month" placeholder="选择月" /></div>
      <div v-else>日期：<el-date-picker v-model="datePick" type="date" placeholder="选择日期" /></div>
      消息类别：<el-select v-model="newsType">
        <el-option v-for="item in newsTypeList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="float:right;">
        <el-dropdown split-button>
          个人设置
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 列表 -->
    <div class="size-color table-margin-top">
      <el-table :header-cell-style="tableHeaderColor" :data="newsTable" center stripe>
        <el-table-column prop="releaseTime" label="发布时间" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="object" label="对象" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="operate" label="操作" width="220px">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)">查看详情</el-button>
            <el-button @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 删除确认弹框 -->
    <el-dialog :visible.sync="showDelete" center width="380px" title="上架商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否上架该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="deleteNews">确定</el-button>
      </div>
    </el-dialog>
    <!-- 消息详情 -->
    <news-detail :show-detail="showDetail" @isCloseDetail="isCloseDetail" />
  </div>
</template>
<script>
import newsDetail from './newsDetail.vue'
export default {
  components: { newsDetail },
  data() {
    return {
      // 日期选择
      dateType: 1,
      dateTypeList: [
        {
          id: 1,
          name: '日期'
        },
        {
          id: 2,
          name: '整年'
        },
        {
          id: 3,
          name: '整月'
        }
      ],
      year: '',
      month: '',
      datePick: '',
      dateState: 1,
      // 消息类别
      newsType: '',
      newsTypeList: [],
      // 消息列表
      newsTable: [{}],
      // 删除确认
      showDelete: false,
      // 消息详情
      showDetail: false
    }
  },
  watch: {
    'dateType'(e) {
      this.dateState = e
    }
  },
  methods: {
    // 列表头样式设置
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
    },
    // 消息删除确认
    handleDelete(row) {
      this.showDelete = true
    },
    // 删除消息
    deleteNews() {
      this.showDelete = false
    },
    // 显示详情页
    handleDetail(row) {
      this.showDetail = true
    },
    // 关闭详情页
    isCloseDetail(e) {
      this.showDetail = e
    }
  }
}
</script>
<style>
.loginOut{
  float:right;
}
</style>
