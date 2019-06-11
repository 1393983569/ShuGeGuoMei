<template>
  <div style="margin:20px;">
    <el-table :data="ADTable" border :header-cell-style="headerStyle" center>
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
        <template>
          <el-button>查看详情</el-button>
          <el-button>顶置</el-button>
          <el-button>编辑</el-button>
          <el-button>上架</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ADTable: [{}, {}]
    }
  },
  methods: {
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
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
