<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <breadcrumb>
      <el-button
        size="mini"
        type="primary"
        @click="submitForm('newsForm')"
        :loading="loadingState"
      >确定</el-button>
      <el-button size="mini" type="warning" @click="resetForm('newsForm')">取消</el-button>
    </breadcrumb>
    <el-form ref="newsForm" :model="newsForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="title">
          <el-input v-model="newsForm.title" style="width:400px;"/>
        </el-form-item>
        <el-form-item label="缩略图:" prop="thumbnail">
          <div>
            <el-upload
              class="avatar-uploader"
              :action="`${apiUrl}/basics/upload`"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-progress="handleProgress"
              :before-upload="beforeAvatarUpload"
            >
              <div slot="tip" class="el-upload__tip">建议上传120*80px图片，大小不超过1m</div>
              <el-progress
                v-if="0<percentage&&percentage<=100"
                type="circle"
                :percentage="percentage"
                :width="177"
                style="width:178px;height:178px;"
              ></el-progress>
              <img v-if="newsForm.thumbnail" :src="newsForm.thumbnail" class="avatar">
              <i
                v-else-if="!newsForm.thumbnail&&percentage>100||percentage<=0"
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="对象" prop="shopIds">
          <el-select v-model="newsForm.shopIds" clearable multiple style="width:300px;">
            <el-option
              v-for="(item, index) in objectList"
              :key="index"
              :value="`${item.id}:${item.name}`"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="newsForm.category" style="width:300px;">
            <el-option
              v-for="item in newsTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="newsForm.content" :height="300" :width="700"/>
        </el-form-item>
      </div>
      <!-- <el-form-item style="float:right;"> -->
      <el-form-item></el-form-item>
    </el-form>
    <hint v-model="showReturn" title="返回" text="是否放弃该内容？" @confirm="handleBack"/>
  </div>
</template>

<script>
import virtualList from "vue-virtual-scroll-list";
import Tinymce from "@/components/Tinymce";
import { addNews } from "@/api/news.js";
import { getAllShop } from "@/api/shop.js";
import hint from "@/components/Hint";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "NewsRelease",
  // name: 'TinymceDemo',
  components: { Tinymce, hint, Breadcrumb },
  data() {
    const istitle = (rule, value, callback) => {
      // console.log(value, 'hhhhhhhhh')
    };
    return {
      newsForm: {
        title: "",
        shopIds: [],
        category: "",
        content: "",
        deleteStatus: 0,
        // shopJson: [],
        thumbnail: ""
      },
      showReturn: false,
      apiUrl: "",
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
            validate: "istitle"
          }
        ],
        shopIds: [{ required: true, message: "请输入对象", trigger: "blur" }],
        category: [{ required: true, message: "请输入类别", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        thumbnail: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      content: "",
      newsTypeList: [
        {
          id: 0,
          name: "通知"
        },
        {
          id: 1,
          name: "资讯"
        }
      ],
      objectList: [],
      // shopArray: [],
      shopIdList: [],
      loadingState: false,
      percentage: 0,
      form: {
        adType: 0
      }
    };
  },
  watch: {
    newsForm(e) {
      // console.log(e, 'eeeee')
    },
    "object.shopId"(e) {
      e.forEach(element => {
        const temp = {};
        temp.id = parseInt(element.split(":")[0]);
        temp.name = element.split(":")[1];
        this.shopList.push(temp);
      });
    },
    "newsForm.title"(title) {
      // 标题超出上限的验证
      if (title.length > 40) {
        this.$message.warning("该标题已超出字符上限，请重新输入！");
        this.newsForm.title = "";
      }
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API;
    this.getAllShop();
  },
  methods: {
    addNewsHandle() {
      this.loadingState = true;
      const addArray = {};
      addArray.title = this.newsForm.title;
      addArray.category = this.newsForm.category + "";
      addArray.content = this.newsForm.content;
      addArray.deleteStatus = this.newsForm.deleteStatus + "";
      addArray.thumbnail = this.newsForm.thumbnail;
      let shopIdList = [];
      let shopJson = [];
      this.newsForm.shopIds.map(item => {
        let arr = item.split(":");
        shopIdList.push(arr[0]);
        let ob = {};
        ob.id = arr[0];
        ob.name = arr[1];
        shopJson.push(ob);
      });
      addArray.shopJson = JSON.stringify(shopJson);
      addArray.shopIds = shopIdList.toString();
      addNews(addArray)
        .then(res => {
          if (res.status === 1) {
            this.loadingState = false;
            this.shopIds = [];
            this.newsForm = {};
            this.$message.success("添加消息成功");
            this.$router.push({ name: "news" });
          }
        })
        .catch(err => {
          this.loadingState = false;
          // console.log(err)
          if (err === "该消息标题已发布") {
            this.$message.error("消息名称不可重复！");
          } else {
            this.$message.error("添加消息失败！");
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addNewsHandle();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.showReturn = true;
    },
    handleBack() {
      this.showReturn = false;
      this.$router.back();
    },
    // 查询所有商铺
    getAllShop() {
      getAllShop()
        .then(res => {
          // console.log(res, 'kkkkkkk')
          if (res.info.length > 0) {
            this.objectList = res.info;
          } else {
            this.$message.error("商铺暂无数据！");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err);
        });
    },
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 1;
      if (!isLt20M) {
          this.$message.error('上传图片的大小不能超过 1M!');
          return false
      }
    },
    // beforeAvatarUpload(file) {
    //   const fileTypeName = file.name.substring(
    //     file.name.lastIndexOf(".") * 1 + 1 * 1
    //   ); // 获取后缀名
    //   // （0图片，1视频，2文字,3声音）
    //   let supportFormat = [
    //     "mp3",
    //     "mkv",
    //     "wav",
    //     "ogg",
    //     "3gp",
    //     "mp4",
    //     "m4a",
    //     "aac",
    //     "ts",
    //     "flac",
    //     "3gp",
    //     "mp4",
    //     "mkv",
    //     "txt",
    //     "jpg",
    //     "png",
    //     "gif",
    //     "JPEG"
    //   ];
    //   if (this.form.adType === 0) {
    //     supportFormat = ["jpg", "png", "gif", "JPEG"];
    //   }
    //   let index = supportFormat.indexOf(fileTypeName);
    //   if (index == -1) {
    //     // 说明核实不符合
    //     this.$message.warning("上传文件的格式不合符，请重新上传！");
    //     return false;
    //   } else {
    //     // 图片文件大小限制，限制宽高分别为1280px和800px
    //     if (this.form.adType == 0) {
    //       let _this = this;
    //       let imgWidth = "";
    //       let imgHight = "";
    //       const isSize = new Promise(function(resolve, reject) {
    //         let width = 302;
    //         let height = 302;
    //         let _URL = window.URL || window.webkitURL;
    //         let img = new Image();
    //         img.onload = function() {
    //           imgWidth = img.width;
    //           imgHight = img.height;
    //           let valid = img.width == width && img.height == height;
    //           valid ? resolve() : reject();
    //         };
    //         img.src = _URL.createObjectURL(file);
    //       }).then(
    //         () => {
    //           return file;
    //         },
    //         () => {
    //           _this.$message.warning({
    //             message:
    //               "上传文件的图片大小不合符标准,宽需要为302px，高需要为302px。当前上传图片的宽高分别为：" +
    //               imgWidth +
    //               "px和" +
    //               imgHight +
    //               "px",
    //             btn: false
    //           });
    //           return Promise.reject();
    //         }
    //       );
    //       console.log(isSize);
    //       return isSize;
    //     } else {
    //       return true;
    //     }
    //   }
    // },
    handleAvatarSuccess(res) {
      this.percentage = 101;
      this.newsForm.thumbnail = res.info;
    },
    handleProgress(event, file, fileList) {
      this.percentage = event.percent;
      this.newsForm.thumbnail = "";
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
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
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

