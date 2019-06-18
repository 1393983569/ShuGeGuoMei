<template>
  <div class="body-margin" style="display:float;">
    <el-button style="float:right;margin-bottom:10px;" @click="handleRelease">广告发布</el-button>
    <el-table :data="ADTable" :header-cell-style="headerStyle" center stripe>
      <el-table-column prop="releaseTime" label="发布时间" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="picture" label="轮播图" width="300px">
        <template>
          <el-carousel height="150px" style="background-color:red;">
            <el-carousel-item v-for="item in 3" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="上下架状态" />
      <el-table-column prop="operate" :width="460" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button>顶置</el-button>
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="putawayHandle">上架</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 广告详情 -->
    <ad-detail :show-ad-detail="showAdDetail" @handleClose="handleClose" />
    <!-- 广告编辑 -->
    <ad-edit :show-ad-edit="showAdEdit" @closeEdit="closeEdit" />
  </div>
</template>
<script>
import AdDetail from './ADDetail.vue'
import AdEdit from './AdEdit.vue'
export default {
  components: { AdDetail, AdEdit },
  data() {
    return {
      ADTable: [{}, {}],
      showAdDetail: false,
      showAdEdit: false
    }
  },
  methods: {
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
    },
    // 广告发布
    handleRelease() {
      this.$router.push({ name: 'ADRelease' })
    },
    // 查看详情
    handleDetail() {
      this.showAdDetail = true
    },
    // 关闭详情
    handleClose(e) {
      this.showAdDetail = e
    },
    // 编辑广告
    handleEdit() {
      this.showAdEdit = true
    },
    // 关闭编辑
    closeEdit(e) {
      this.showAdEdit = e
    },
    // 上架
    putawayHandle() {
      this.$alert('是否上架该条广告？', '上架广告', {
        confirmButtonTex: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '上架成功'
        })
      }).catch(() => {

      })
    }
  }
}
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 150px;
    align-items: center;
    margin: 0;
    text-align: center;
  }
</style>
