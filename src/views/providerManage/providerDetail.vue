<template>
  <div>
    <Breadcrumb :stateShow="stateShowBreadcrumb">
      <el-button size="mini" type="primary" @click="editPush">编辑</el-button>
    </Breadcrumb>
    <p>供应商ID：{{providerObj.id}}</p>
    <!-- <p>供应商名称：{{providerObj.name}}</p> -->
    <div style="display:flex;flex-direction:row;align-items: flex-start;">门头照片：
      <img
        v-if="providerObj.headerPic"
        :src="providerObj.headerPic"
        style="width: 200px;height:200px;"
      >
    </div>
    <p>联系人：{{providerObj.contactName}}</p>
    <p>手机号：{{providerObj.mobile}}</p>
    <p>座机号：{{providerObj.phone}}</p>
    <p>微信：{{providerObj.wechat}}</p>
    <p>QQ：{{providerObj.qq}}</p>
    <p>邮箱：{{providerObj.email}}</p>仓库地址：
    <span>{{province}}</span>
    <span>{{city}}</span>
    <span>{{area}}</span>
    <p>详细地址：{{providerObj.addressDetail}}</p>
    <p>
      仓库面积：{{providerObj.area}}m
      <sup>2</sup>
    </p>
    <p>备注：{{providerObj.remark}}</p>
    <div style="display:flex;flex-direction: row;">可配送店铺列表：
      <span v-for="item in providerObj.providerShopList">
        <i style="font-style:normal;" v-if="item">{{item.name}},</i>
      </span>
    </div>
    <p>供应商品：
      <el-table
        style="margin-top:10px;margin-left:10px;"
        :data="categoryTable"
        center
        border=""
        :span-method="arraySpanMethod"
      >
        <el-table-column prop="childrenName" label="一级品类">
          <template slot-scope="scope">
            {{ scope.row.childrenName }}
            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(scope.row)">{{ scope.row.childrenName }}</el-checkbox>
                <el-checkbox-group>
                  <el-checkbox :label="scope.row">{{ scope.row.childrenName }}</el-checkbox>
            </el-checkbox-group>-->
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
            </el-checkbox-group>-->
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称"/>
        <el-table-column prop="goodsId" label="商品ID"/>
        <el-table-column prop="standards" label="规格"/>
        <el-table-column prop="unit" label="单位"/>
      </el-table>
    </p>
    <div style="display:flex;flex-direction:row;align-items: flex-start;">资质照片：
      <img :src="providerObj.qualificationPics" style="width:300px;">
    </div>
    <div style="margin-top:10px;">
      评分：{{averageScore}}
      <el-button style="margin-left:20px;" size="mini" type="success" @click="dialogVisible">去评分</el-button>
      <!-- <el-button style="margin-left:20px;" size="mini" type="success" v-else disabled>去评分</el-button> -->
      <gradeDetail
        style="margin-left:20px;margin-top:10px;"
        :grade="gradeDetail"
        @getTotal="getTotalHandle"
      ></gradeDetail>
    </div>
    <!-- 评分弹框 -->
    <grade
      @getCloseState="getCloseState"
      @getGradeObject="getGradeObject"
      @getGradeDetail="getGradeDetail"
      :gradeObject="gradeObject"
      :showState="showState"
      :providerId="providerId"
      :adminId="adminId"
    ></grade>
  </div>
</template>
<script>
import virtualList from "vue-virtual-scroll-list";
import Breadcrumb from "@/components/Breadcrumb";
import gradeDetail from "./gradeDetail.vue";
import grade from "./grade.vue";
import { getProviderDetail } from "@/api/provider.js";
import { addGrade, getGrade } from "@/api/providerGrade.js";
export default {
  name: "providerDetail",
  components: { gradeDetail, grade, Breadcrumb },
  data() {
    return {
      averageScore: 0,
      stateShowBreadcrumb: false,
      showState: false,
      providerObj: {},
      imgList: [],
      mergeList: [],
      categoryTable: [],
      city: "",
      province: "",
      area: "",
      adminId: "",
      providerId: 0,
      gradeObject: {},
      gradeDetail: {},
      grade: {
        adminId: "",
        qualification: 0,
        price: 0,
        quality: 0,
        service: 0,
        amount: 0,
        providerId: ""
      },
      buttonList: []
    };
  },
  beforeRouteEnter(to, form, next) {
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name);
    });
  },
  mounted() {
    this.stateShowBreadcrumb = true;
    this.adminId = this.$store.state.user.roleId;
    if (JSON.stringify(this.$route.params) !== "{}") {
      this.providerId = this.$route.params.id;
      this.getProviderDetail(this.providerId);
    } else if (JSON.stringify(this.$store.state.user.providerObject) !== "{}") {
      this.providerId = this.$store.state.user.providerObject.id;
      this.getProviderDetail(this.providerId);
    }
  },
  methods: {
    getGradeObject(e) {
      this.averageScore =
        (e.amount + e.price + e.qualification + e.quality + e.service) / 5;
    },
    getTotalHandle(e) {
      this.averageScore = e;
    },
    getButton(list, name) {
      console.log();
      list.forEach(e => {
        if (e.name === name) {
          this.buttonList = e.checkList;
        }
      });
    },
    getProviderDetail(id) {
      getProviderDetail(id)
        .then(res => {
          this.providerObj = res.info;
          this.scoreRturn();
          if (res.info.provinceDomain) {
            this.province = res.info.provinceDomain.name;
          }
          if (res.info.cityDomain) {
            this.city = res.info.cityDomain.name;
          }
          if (res.info.areaDomain) {
            this.area = res.info.areaDomain.name;
          }
          this.categoryTable = this.recursionTableData(
            this.providerObj.providerGoodsList
          );
          this.getMergeList();
        })
        .catch(err => {
          console.log(err);
          window.history.go(-1);
          this.$message.error("查询供应商详情失败！");
        });
    },
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowData = this.mergeList[rowIndex];
        const colData = rowData > 0 ? 1 : 0;
        return {
          rowspan: rowData,
          colspan: colData
        };
      }
      if (columnIndex === 1) {
        const rowData = this.mergeList[rowIndex];
        const colData = rowData > 0 ? 1 : 0;
        return {
          rowspan: rowData,
          colspan: colData
        };
      }
    },
    // 递归单元格
    recursionTableData(arr) {
      const res = [];
      arr.forEach((item, index) => {
        let data = {};
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
        console.log(item, "item.........");
        data = {
          childrenId: item.categoryOneId,
          childrenName: item.categoryOneName,
          id: item.categoryTwoId,
          name: item.categoryTwoName,
          categoryOneId: item.categoryOneId,
          goodsName: item.goodsName,
          standards: item.standards,
          goodsId: item.goodsId,
          unit: item.unit
        };
        res.push(data);
      });
      return res;
    },
    // 生成合并数组
    getMergeList() {
      this.mergeList = [];
      this.categoryTable.forEach((item, index) => {
        if (index === 0) {
          this.mergeList.push(1);
          this.position = index;
        } else {
          if (item.childrenId === this.categoryTable[index - 1].childrenId) {
            this.mergeList[this.position] += 1;
            this.mergeList.push(0);
          } else {
            this.mergeList.push(1);
            this.position = index;
          }
        }
      });
    },
    dialogVisible() {
      this.showState = true;
      this.getProviderDetail(this.providerId);
      // 将查询结果放入评分修改框
      this.scoreRturn();
    },
    getCloseState(e) {
      if (!e) {
        this.showState = false;
      }
    },
    // 评分回显
    scoreRturn() {
      this.grade.adminId = this.adminId;
      this.grade.providerId = this.providerId;
      this.grade.qualification = this.providerObj.qualificationScore;
      this.grade.price = this.providerObj.priceScore;
      this.grade.quality = this.providerObj.qualityScore;
      this.grade.service = this.providerObj.serviceScore;
      this.grade.amount = this.providerObj.deliverShopScore;
      this.gradeObject = this.grade;
      this.gradeDetail = this.grade;
      this.averageScore =
        (this.grade.qualification +
          this.grade.price +
          this.grade.quality +
          this.grade.service +
          this.grade.amount)/5;
    },
    getGradeDetail(a) {
      this.gradeDetail = a;
    },
    editPush() {
      this.$router.push({
        name: "providerAddEdit"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #b3b3b3;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.botton {
  display: flex;
  > div {
    flex: 1;
    display: inline-block;
    text-align: center;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    &:active {
      background-color: #dddddd;
    }
  }
}
.dialog-footer {
  margin: 0px;
  padding: 0px;
}
.dialogBorder {
  text-align: center;
  border-top: 1px #dddddd solid;
  border-bottom: 1px #dddddd solid;
  padding: 40px 30px;
}
.categoryHeader {
  width: 260px;
  height: 55px;
  background-color: #f0f2f3;
  text-align: center;
  line-height: 60px;
  color: #909399;
  font-weight: 700;
}
.goodsContainer {
  display: flex;
  flex-direction: row;
  width: 90%;
}
.categoryBody {
  width: 260px;
  height: 745px;
  border: 1px solid #f0f2f3;
  background-color: #ffffff;
}
el-tree {
  // width:200px;
  height: 746px;
  border: 1px solid #f0f2f3;
}
</style>
