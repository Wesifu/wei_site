<template>
  <div>
    <img src="../assets/images/publish_bg.jpg" style="width: 100%;height: 100%;position: fixed;">
    <div style="width: 100%;position: absolute;left: 0; top: 60%;">
      <ul>

        <li>
          <router-link :to="{name:'uploadPage',params:{sign:0}}">
            <img src="../assets/images/publish_text_icon.png" class="image"/>
            <label>文字</label>
          </router-link>
        </li>
        <li @click="chooseImage">
          <!--<router-link :to="{path:'/uploadPage',query:{sign:1}}">-->
          <img src="../assets/images/publish_image_icon.png" class="image"/>
          <label>图片</label>
          <!--</router-link>&lt;!&ndash;&ndash;&gt;-->
        </li>
        <li>
          <label for="videoFile">
            <input type="file" id="videoFile" ref="file" style="display: none;"
                   @change="chooseVideo('videoFile')"/>
            <img src="../assets/images/publish_video_icon.png" class="image"/>
            视频</label>
        </li>
        <li>
          <label for="audioFile"><input type="file" id="audioFile" ref="file" accept="video/mp3" style="display: none;"
                                        @change="chooseVideo('audioFile')"/>
            <img src="../assets/images/publish_audio_icon.png" class="image"/>
            <label>语音</label>
          </label>
        </li>
      </ul>

    </div>
    <div style="position:absolute;width:10%;z-index:1; left: 50%; top: 90%;
                 transform: translate(-50%, -50%);border-radius: 50%;">
      <img src="../assets/images/icon_cancel.png" style="width: 100%;"/>
    </div>

    <!--<div id="box" v-show="show">
      <div class="item" style="border-bottom: 1px solid #0d0d0d"><label for="videoFile">视频</label></div>
      <input type="file" id="videoFile" accept="video/avi,video/mp4" style="display: none;"/>
      <div class="item">录制</div>
      <div></div>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: "choicePage",
    data() {
      return {
        show: false,
        imgBase: ''
      }
    },
    created() {
      this.$nextTick(function () {
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/getWxConfig?url=" + encodeURIComponent(window.location.href.split('#')[0]),
          type: "GET",
          jsonType: "json",
          success: function (result) {
            var obj = JSON.parse(result).data;
            wx.config({
              debug: false,
              appId: obj.appId,
              timestamp: obj.timestamp,
              nonceStr: obj.nonceStr,
              signature: obj.signature,
              jsApiList: ["chooseImage", "onMenuShareQQ"]
            });
          }
        });

        wx.ready(function () {
          /*alert("wx.config success.");*/
        });
        wx.error(function (res) {
          alert(res.error);
          alert("wx.config failed.");
        });
      })
    },
    methods: {
      chooseImage: function () {
        let _self = this;
        wx.ready(function () {
          wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

              _self.$router.push({name: "uploadPage", params: {localIds: res.localIds, sign: '1'}});
              //window.location.href = "<%=basePath%>uploadPage?localIds=" + localIds + "&userCode=${userCode}&groupId=${groupId}";
            }
          });
        });
      },
      chooseVideo: function (text) {

        //let files = this.$refs.file.files;
        let file = document.getElementById(text).files[0];

        let filePath = this.getObjectURL(file);
        let _self = this;
        setTimeout(
          function () {
            let reader = new FileReader();
            let imgBase = '';
            reader.readAsDataURL(file);//调用自带方法进行转换
            reader.onload = function (e) {

              let img = e.target.result;
              alert(e.target.result);
              let imgNum = img.split(";base64,");
              //alert("imgNum[1]  :  "+imgNum[1]);
              _self.$router.push({name: "uploadPage", params: {obj: imgNum[1], filePath: filePath, sign: '2'}});
            };
           // alert("imgBase:  "+_self.imgBase);

          },
          2000);
      },

      fileToBase64: function (text) {
        //var file = this.obj;
        let _self = this;
        let file = document.getElementById(text).files[0];
        let reader = new FileReader();
        let imgBase = '';
        reader.readAsDataURL(file);//调用自带方法进行转换
        reader.onload = function (e) {

          let img = e.target.result;
          let imgNum = img.split(";base64,");
          imgBase = imgNum[1];
        };
        _self.imgBase = imgBase;
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        }
        return url;
      },
      onFileChange: function (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        //视频上传
        /*if(this.typeName === '视频'){
          let _this = this;

          //视频预览
          var reader = new FileReader();
          this.file = files[0];
          reader.onload = function () {
            _this.$refs.video.src = this.result;
          };
          reader.readAsDataURL(this.file);
        }*/
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  ul {
    width: 100%;
    float: left;
  }

  li {
    width: 25%;
    list-style-type: none;
    float: left;
    /*padding: 2.5%;*/
    text-align: center;
    margin: 0;
    /*padding-bottom: 100%;*/
    overflow: hidden;
    height: auto;
  }

  .image {
    width: 70%;
    display: block;
    clear: both;
    margin: 0 auto;
  }

  #box {
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: 0;
    display: block;
    z-index: 999;
    background-color: white;
    font-size: 16px;
  }

  .item {
    width: 100%;
    height: 50%;
    float: left;
    position: relative;
    text-align: center;
    padding: 20px;
  }

  /*figure {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding-bottom: 100%; !* 关键就在这里 *!
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }*/
</style>
