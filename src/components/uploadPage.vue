<template>
  <mu-container>
    <div>
      <div style="width: 100%;display: inline-block;padding: 10px;float: left;background-color: #ffffff">
        <textarea id="inputId" wrap="physical" placeholder="这一刻的想法" v-model="text"
                  style="resize:none;font-size: 18px;width: 75%;padding-bottom: 15%;float: left;border: none;vertical-align:middle;"></textarea>
      </div>
      <div
        style="width: 100%;height: 20%;display: inline-block;float: left;padding:5px;margin-top: 20px;background-color: #ffffff;font-size: 14px;">
        <div
          style="width: 95%;height: 50%;display: inline-block;padding: 5px;border-bottom: 1px solid #dedede;float: left">
          <span style="float: left;">记录当前时间</span><span style="float: right;"> {{timeNow}}</span>
        </div>
        <div style="width: 95%;height: 50%;display: inline-block;padding: 5px;float:left;">
          <span style="float: left;">谁可以看</span><span style="float: right;">

          <mu-flex justify-content="center">
            <mu-button @click="openBotttomSheet">{{openText === ''?'亲友':openText}}</mu-button>
          </mu-flex>

      </span>
        </div>
      </div>
      <div
        style="width: 100%;display: inline-block;float: left;padding: 5px;margin-top: 20px;background-color: #ffffff">
        <ul style="width: 100%;height: 100%;" class="figure-list" v-if="sign !== 0">
          <li v-if="sign === '1'" v-for="item in localIds">
            <figure :style="'background-image:url(' + item + ')'">
            </figure>
          </li>
          <li v-if="sign === '2'">
            <video type="video.mp4" controls :src="path" class="video" id="video" muted="true"></video>
          </li>
          <li v-if="sign === '3'">
            <audio id="media" :src="path"
                   controls="controls"></audio>
          </li>
          <li><img src="" id="s"></li>
        </ul>

      </div>
      <div style="width: 20%;height: auto;border-radius: 2em;background-color: #00b7ee;
        position: absolute;top: 60%;left: 50%;transform: translate(-50%, -50%);text-align: center"
           @click="uploadImage">
        <span>发布</span>
      </div>
      <div id="result"></div>
    </div>
    <transition name="slide-fade">
      <div id="bottom-sheet" v-show="show" @click="closeBottomSheet">
        <SpaceAuthority @transferTabIndex="getTabIndex" id="authority"></SpaceAuthority>
      </div>
    </transition>

  </mu-container>
</template>

<script>
  import SpaceAuthority from "./spaceAuthority";

  export default {
    name: "uploadPage",
    components: {SpaceAuthority},
    data() {
      return {
        text: '',
        timeNow: '',
        localIds: this.$route.params.localIds,
        accessToken: '',
        serverIds: '',
        userCode: '',
        groupId: '',
        sign: this.$route.params.sign,
        obj: this.$route.params.obj,
        path: this.$route.params.filePath,
        show: false,
        open: 1,
        openText: '',
        soundUrl: '',
        videoUrl: '',
        videoImg: '',
        userNickName: this.global.userInfo.userNickName,
        picURL: [],
        videoCover: {}

      }
    },
    created() {

      let d = new Date();
      this.timeNow = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

      this.$nextTick(function () {
        let _self = this;
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/getWxConfig?url=" + encodeURIComponent(window.location.href.split('#')[0]),
          type: "GET",
          jsonType: "json",
          success: function (result) {
            let obj = JSON.parse(result).data;
            _self.accessToken = obj.accessToken;
            wx.config({
              debug: false,
              appId: obj.appId,
              timestamp: obj.timestamp,
              nonceStr: obj.nonceStr,
              signature: obj.signature,
              jsApiList: ['chooseImage', 'uploadImage']
            });
          }
        });

        wx.error(function (res) {
          alert("upload failed.");
        });
      });
    },
    methods: {
      ajaxUp: function () {
        let _self = this;
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/uploadImage",
          dataType: "json",
          data: {
            "userCode": 31,
            "groupId": 70,
            "mediaId": this.serverIds,
            "accessToken": this.accessToken,
            "videoUrl": this.obj,
            "videoImg": this.videoImg,
            "soundUrl": this.soundUrl,
            "sign": this.text,
            "open": this.open,
            "type": this.sign
          },
          type: "POST",
          success: function (data) {
            /*alert("上传成功" + JSON.stringify(data));*/
            _self.toTimeAxis();
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("上传失败");
          }
        });
      },
      toTimeAxis(){
        this.$router.push({path: '/home/timeAxis'});
      },

      uploadPic: function(){
        let _self = this;
        let localId = this.localIds.pop();
        wx.uploadImage({

          localId: localId.toString(),
          // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1,
          // 默认为1，显示进度提示
          success: function (res) {
            //返回图片的服务器端ID
             _self.serverIds = _self.serverIds + "," + res.serverId;

            //_self.serverIds += serverId;

            //alert(_self.serverIds);

            if (_self.localIds.length > 0) {
              window.setTimeout(function () {
                _self.uploadPic();
              }, 100);
            } else {
              window.setTimeout(function () {
                //上传到服务器
                _self.serverIds = _self.serverIds.substring(1,_self.serverIds.length);
                /*alert("_self.serverIds  :  " + _self.serverIds);*/

                _self.ajaxUp();
                return _self.serverIds;

                //this.ajaxUp();
              }, 100);
            }
          }
        });
      },
      uploadImage: function () {

        if (this.sign === "1") {

          this.uploadPic();

        } else if (this.sign === "2") {

          this.videoImg = this.createImg();
          this.ajaxUp();

        } else if (this.sign === "3") {

          _self.ajaxUp();
        }
      },
      handleImage: function () {
        let video = $('#video').get(0);
        this.setMedia(video);
      },
      // 视频------视频截图 ~~ 视频播放状态 ~~
      setMedia: function (video, scale = 0.8) {

        // 拿到图片
        video.addEventListener('loadeddata', function (e) {
          let canvas = document.createElement('canvas');
          canvas.width = video.videoWidth * scale;
          canvas.height = video.videoHeight * scale;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          let src = canvas.toDataURL('image/png');
          //$("#image").attr("src", src);
          this.videoImg = src;
          // 设置属性
          video.setAttribute('poster', src);
        });

        //设置状态
        function vidplaySate(e) {
          if (video.paused) {
            video.play();
            playBtn.classList.add('pause');
          } else {
            video.pause();
            playBtn.classList.remove('pause');
          }
        }

      },

      timeAxisUp: function () {//
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/timeAxisUp",
          data: {
            "userCode": 31,
            "groupId": 70,
            "soundUrl": '',
            "videoUrl": this.videoUrl,
            "videoImg": '',
            "videoFileSize": '',
            "videoLength": '',
            "local": '',
            "sign": this.text,
            "time": this.timeNow,
            "picURL": JSON.stringify(this.picURL),
            "userNickName": 'wesifu',
            "type": this.sign,
            "open": this.open,
            "identify": '',
          },
          dataType: "json",
          success: function (data) {
            alert("上传成功" + JSON.stringify(data));
            this.$router.push({name: 'timeAxis'});
          }
        });
      },
      closeBottomSheet() {
        this.show = false;
      },
      openBotttomSheet() {
        this.show = true;
      },
      getTabIndex(open) {
        this.open = open;
        if (open === 0) {
          this.openText = '私密'
        } else if (open === 1) {
          this.openText = '亲友';
        } else {
          this.openText = '公开';
        }
      },
      uploadFiles: function () {//  1542161115000  1542177955000  1542178313000 1542178403000 1542178508000 1542178645000 1542179943000 1542180123000
        let _self = this;
        let cos = new COS({
          SecretId: 'AKIDy28G51J9DQfvdhQvb9nMly0snZ9XfnhP',
          SecretKey: 'tZ2NWTDm9JG1dItLchdlpiPyLXWJuLLD',
        });
        let fileSize = this.obj.size;
        if (fileSize >= 20 * 1024 * 1024) {
          alert("上传视频不能大于20M !!!");
        } else {
          let audioName;
          let timestamp = Date.parse(new Date());
          $("#inputId").val(timestamp);
          alert(timestamp);
          if (this.sign === "2") {
            audioName = timestamp + ".mp4";
          } else {
            audioName = timestamp + ".mp3";
          }
          //audioName = timestamp + ".mp4";
          cos.putObject({
            Bucket: 'timelang-1253895285',
            Region: 'ap-guangzhou',
            Key: "/android/" + audioName,
            StorageClass: 'STANDARD',
            Body: this.obj, // 上传文件对象
            onProgress: function (progressData) {
              console.log(JSON.stringify(progressData));
            }
          }, function (err, data) {
            alert(JSON.stringify(data));
            alert(data.Location);
            _self.videoUrl = "http://" + data.Location;
            _self.timeAxisUp();

          });
        }

      },
      //获取视频封面
      createImg: function () {
        let scale = 0.8;
        //let video = document.getElementById('video');
        let video = $('#video').get(0);
        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let imgSrc = canvas.toDataURL('image/png');
        $("#s").attr("src", imgSrc);
        let imgNum = imgSrc.split(";base64,");
        alert("imgSrc  :  " + imgNum[1]);
        return imgNum[1];

        /*let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let imgWidth = video.width();
        let imgHeight = video.height();
        ctx.drawImage(video, 0, 0, imgWidth, imgHeight);

        const imgSrc = canvas.toDataURL('image/png');
        $("#s").attr("src", imgSrc);
        let imgNum = imgSrc.split(";base64,");
        //imgBase = imgNum[1];
        //this.imgSrc = imgSrc;
        alert("imgSrc" + imgNum[1]);
        return imgNum[1];*/

        /*let blob = this.dataURLtoBlob(imgSrc, "image/png")//base64转blob，全局函数
        let file = new File([blob], "video_image.png", {type: "image/png", lastModified: Date.now()})//blob转file
        alert(file.size);
        this.videoCover = file;*/
        /*return file;*/
      },
      dataURLtoBlob: function (dataURI, type) {
        alert(dataURI.split(",")[1]);
        var binary = atob(dataURI.split(",")[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
      },
      uploadVideo() {
        let _self = this;
        let cos = new COS({
          SecretId: 'AKIDy28G51J9DQfvdhQvb9nMly0snZ9XfnhP',
          SecretKey: 'tZ2NWTDm9JG1dItLchdlpiPyLXWJuLLD',
        });
        this.createImg();
        let imgName = Date.parse(new Date()) + ".png";
        cos.putObject({
          Bucket: 'timelang-1253895285',
          Region: 'ap-guangzhou',
          Key: "/android/" + imgName,
          StorageClass: 'STANDARD',
          Body: this.videoCover, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          }
        }, function (err, data) {
          alert(JSON.stringify(data));
          alert(data.Location);
          let pics = new Array();
          pics.push("http://" + data.Location);
          _self.picURL = pics;

          /*this.picURL.push({message:data.Location});*/
          _self.uploadFiles();
        });
      },
      testWidthHeight: function (fileList) {

        let fileData = this.obj;
        let width;
        let height;
        let des = "高";
        let picObject = new Object();
        for (let i = 0; i < fileList.size; i++) {

          let fileSize = fileList[i].size;
          let reader = new FileReader();
          reader.onload = function (e) {
            let data = e.target.result;
            //加载图片获取图片真实宽度和高度
            let image = new Image();
            image.onload = function () {
              width = image.width;
              height = image.height;
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);

          if (width > height) {
            des = "宽";
          }
          picObject.width = width;
          picObject.height = height;
          picObject.des = des;
          picObject.fileSize = fileSize;
          picObject.createTime = '';
        }
        //读取图片数据

      },
      upload: function () {

        /*let formData = new FormData();

        formData.append('file', this.obj);
        formData.append('userCode', 31);
        formData.append('groupId', this.obj);*/

        $.ajax({
          url: "https://qinqinyx.cn/timeLang/uploadFiles",
          dataType: "json",
          data: {
            "userCode": 31,
            "groupId": 70,
            "file": new FormData(this.obj)
          },
          type: "POST",
          success: function (data) {
            /*alert("上传成功" + JSON.stringify(data));*/

          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("上传失败");
          }
        });
      }

    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .figure-list {
    margin: 0;
    padding: 0;
    width: 85%;
    height: auto;
    display: block;
    clear: both;
    margin: 0 auto;
  }

  .figure-list:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .figure-list li {
    list-style: none;
    float: left;
    width: 30%;
    margin: 0 2% 2% 0;
  }

  .figure-list figure {
    border: 1px solid #000;
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding-bottom: 100%; /* 关键就在这里 */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .figure-list figure a {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
  }

  .ul_bottom li {
    list-style: none;
    float: left;
    width: 8%;
    margin: 0 3% 2% 5%;
  }

  .ul_bottom li img {
    width: 100%;
    height: 100%;
  }

  .video {
    width: 100%;
    /*height: 200px;*/
  }

  #bottom-sheet {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, .3);
  }

  #authority {
    position: absolute;
    z-index: 10;
    top: 50%;
    background-color: #37acac;
    display: block;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
