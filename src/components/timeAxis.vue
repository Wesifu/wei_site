<template>
  <!--<html>
  <head>
    <base href="<%=basePath%>">
    <title>谁可以看</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=no"/>
    <link type="text/css" href="../assets/css/web-style.css"/>
  </head>

  <body>-->
  <div id="app">
    <div id="space_main" style="position: fixed;width: 100%;height: 100%;overflow: scroll">
      <div style="width: 100%;height: 100%;">
        <div id="upload">
          <router-link to="/choicePage">
            <img src="https://qinqinyx.cn/site/static/images/upload.png" style="width: 100%;height: 100%;">
          </router-link>
        </div>
        <div id="space">
          <div id="space_home">
            <img :src="imgUrl1"
                 style="border-bottom-right-radius: 1000px 50%;border-bottom-left-radius: 1000px 50%">
            <div style="width:100%;height: 100%;">

              <div v-if='group != null'>
                <div
                  style="position:absolute;width:5rem;height:5rem;z-index:1; left: 50%; top: 40%;
								transform: translate(-50%, -50%);border-radius: 50%;overflow: hidden">
                  <router-link to="/groupInfo">
                    <img :src="group.grouping"/>
                  </router-link>
                </div>
                <div style="height: 8%;left: 50%; top: 68%;position:absolute;width:auto;
							transform: translate(-50%, -50%);color: #ffffff;">
                  <span>{{group.groupName}}</span>
                </div>
              </div>

              <div v-else>
                <div id="user"
                     style="position:absolute;width:20%;height:20%;z-index:1; left: 50%; top: 40%;
								transform: translate(-50%, -50%);border-radius: 50%;">
                  <img :src="group.grouping" style="border-radius:50%;"/>
                </div>
                <div style="height: 8%;left: 50%; top: 68%;position:absolute;width:auto;
							transform: translate(-50%, -50%);color: #ffffff;">
                  <span>宝宝</span>
                </div>
              </div>

            </div>
          </div>
          <div v-if="result != 0">
            <div v-for="(item,index) in list">
              <!--<c:forEach items="${list}" var="content" varStatus="status">-->
              <!--            <input type="hidden" id="lsh_item.lsh" value="item.lsh">
                          <input type="hidden" id="userCode" value="item.userCode">
                          <input type="hidden" id="open_item.open" value="item.open">
                          <input type="hidden" id="groupId" value="item.groupId">-->
              <div id="space_content">
                <div id="module">
                  <div id="box">
                    <div id="time">
                      <div style="font-size: 15px;line-height: 65px;">
                        <img src="../assets/images/icon_day_mov.png"
                             style="width: 20px;height: 16px;left: -9px;position: relative;"/><span>{{item.time}}</span>
                      </div>
                    </div>
                    <div style="display:block;width: 95%;margin: 0 auto;clear: both">
                      <div id="box-content">
                        <div id="promulgator">
								<span><img :src="item.iconUrl" alt=""
                           style="width: 15px;height: 15px;border-radius:50%;"> {{item.userNickName}}</span>
                        </div>
                        <div id="content">
                          <div class="swipeboxEx">
                            <ul class="figure-list">
                              <li v-if="item.type === 1" v-for="pic in item.picURL">
                                <div class="pic"><!--:style="'background-image:url('+pic.thumbUrl+')'" >-->
                                  <!--<a :href="pic.picUrl" class="swipebox"
                                     :rel="'gallery_'+item.lsh"></a>-->
                                  <!--<a :href="pic.picUrl" :preview="index"></a>-->
                                  <img :src="pic.thumbUrl"
                                       :style="parseInt(pic.width) <= parseInt(pic.height) ? 'width: 100%' : 'height: 100%;'"
                                       :preview="index"/>
                                </div>


                              </li>
                              <li v-else-if="item.type === 2" style="width: 100%;height: auto">
                                <div style="width: 150px;">
                                  <img :src="item.picURL[0].thumbUrl" style="width: 100%;"
                                       @click="updateActive(index)"/>
                                  <video style="display: none;" type="video.mp4"
                                         controls="controls" :class="active === index?'audio1':''" >
                                    <source :src="item.videoUrl" type="video/mp4">
                                  </video>
                                </div>
                              </li>
                              <div v-else-if="item.type === 3">
                                <div>
                                  <figure>
                                    <audio id="media" :src="item.soundUrl"
                                           controls="controls"></audio>
                                  </figure>
                                </div>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div id="comment" style="display: inline-block;width: 95%;padding:10px 0 10px 0;">
                          <div style="width: 85%;">
                            <ul class="ul_bottom">
                              <li id="_zan" v-on:click="zan(item.lsh,index)">
                                <!--<div v-if="item.fabulousCount > 0">
                                  <img :id="'zan-img-'+item.lsh"
                                       src="../assets/images/love_true.png"
                                       alt="">
                                </div>
                                <div v-else>-->
                                <div> <!--style="width: 100%;height: 0;padding-bottom: 100%;"-->
                                  <img :id="'zan-img-'+item.lsh"
                                       :src="item.isPress == 0 ? 'https://qinqinyx.cn/site/static/images/ic_event_post_item_praise_dis.png' :
                                          'https://qinqinyx.cn/site/static/images/love_true.png'"
                                       alt="">
                                </div>
                                <!--</div>-->
                              </li>
                              <li>
                                <span :id="'zan-num-'+item.lsh" style="font-size:14px">
                                  {{item.fabulousCount === undefined ? 0 : item.fabulousCount}}
                                </span>
                              </li>
                              <li id="communicate">
                                <a
                                   class="show">
                                  <img src="../assets/images/comment_ico.png" alt="" @click="communicate(item.lsh)" />
                                </a>
                              </li>
                              <li v-show="item.open === 2">
                                <img src="https://qinqinyx.cn/site/static/images/share_ico.png" alt=""
                                     onclick="shareWebview();">
                              </li>
                            </ul>
                          </div>
                          <!--<div :id="'quickref-bubble-'+item.lsh" class="quickref-bubble"
                               style="width: 20px;height: 5px;float: right;">
                            <span @click="dialogs(item.lsh,item.open)">...</span>
                          </div>-->
                          <div :id="'quickref-bubble-'+item.lsh" class="quickref-bubble"
                               style="width: 20px;height: 5px;float: right;margin-right: 4px;">
                            <v-popover :lsh="item.lsh" :open="item.open">
                              <!--:title="popTitle" :content="popContent" :placement="popPlacement"-->
                              <button class="btn btn-primary" style="border: none;background-color: white">...</button>
                            </v-popover>
                          </div>
                        </div>
                        <div id="comment-msg">
                          <ul compact="compact">
                            <li v-for="msg in item.comments">
                              <span>{{msg.user.userNickName}} : {{msg.commentContent}}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div style="width: 20%;border-radius: 2em;background-color: #00b7ee;font-size: 18px;position: fixed;top: 50%;left: 50%;
                 display: inline-block;transform: translate(-50%, -50%);text-align: center;padding: 10px">
              <span>创建</span>
            </div>
            <div style="width: 15%;background-color: #00b7ee;font-size: 18px;position: fixed;top: 70%;left: 40%;
                 display: inline-block;transform: translate(-50%, -50%);">
              <!--<img src="../assets/icon_space_create.png">--></div>
            <div style="width: 15%;background-color: #00b7ee;font-size: 18px;position: fixed;top: 70%;left: 60%;
                 display: inline-block;transform: translate(-50%, -50%);">
              <!--<img src="../assets/icon_space_invite.png">--></div>
          </div>

        </div>
      </div>
    </div>
    <div class="box" v-show="replyShow" @click="changeReplyShow">
      <div class="box1" >

        <div id="_input_box"
             style="position: relative;top:92%;width: 100%;height: 40px;display: inline-block;padding: 2px;">
        <textarea id="inputId" wrap="physical" placeholder="回复" v-model="commentContent"
                  style="resize:none;font-size: 18px;width: 76%;height: 100%;float: left;border: none;vertical-align:middle;overflow:hidden;" ></textarea>
          <button type="button" id="btn" @click="upload"
                  style="width: 23%;height: 37px;vertical-align: middle;float: left;background-color: #e5e5e5;border: none;">
            评论
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--</body>
  </html>-->
</template>

<script>
  import popover1 from '../components/common/popover1'
  import preview from 'vue-photo-preview'
  import 'vue-photo-preview/dist/skin.css'
  import Vue from "vue";

  Vue.use(preview)
  /*Vue.component('v-popover',popover1);*/

  export default {

    name: "timeAxis",
    components: {
      /*'v-popover': components.popover*/
      "v-popover": popover1,
      preview
    },
    data() {
      return {
        replyShow: false,
        active:'',
        imgUrl1: require('./../assets/images/bg.png'),
        //imgUrl2: require('./../assets/images/check_true.png'),
        /*        userCode: this.$route.query.userCode,
                groupId: this.$route.query.groupId,*/
        group: {},
        list: [],
        user: {},
        result: 1,
        dialogLsh: '',
        openID: '',
        show: false,
        commentsMsgLsh: '',
        commentContent: '',
        popTitle: '我是标题',
        popContent: '气泡内容气泡内容',
        popPlacement: 'top',
        curPage: 1,
        pageRows: 10,
      }
    },
    created() {
      let _this = this;
      this.$nextTick(function () {
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/timeAxis",
          data: {
            "userCode": _this.global.userCode,
            "groupId": _this.global.groupId,
            "cur":this.curPage,
            "rows":this.pageRows,
          },
          dataType: 'json',
          success: function (result) {
            _this.group = result.group;
            _this.user = result.user;
            _this.list = result.list;
          }
        })
      });

      this.$preview.on('imageLoadComplete', (e, item) => {
        console.log(this.$preview.self)
      });


    },
    beforeRouteLeave(to,from,next){
      if(this.active !== ''){
        this.active = '';
      }else if (this.replyShow){
        this.replyShow = false;
      } else{
        next();
      }
    },
    mounted() {

      document.getElementById("space_main").addEventListener('scroll', this.handleScroll, true);
    },
    methods: {
      changeReplyShow(){
        this.replyShow = false;
      },
      updateActive(index){
        this.active = index;
      },
      updateData: function () {
        let _this = this;
        this.curPage = this.curPage + 1;
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/timeAxis",
          data: {
            "userCode": _this.global.userCode,
            "groupId": _this.global.groupId,
            "cur":_this.curPage,
            "rows":_this.pageRows,
          },
          dataType: 'json',
          success: function (result) {

            _this.list = _this.list.concat(result.list);
          }
        })
      },
      handleScroll: function () {

        let scrollTop = document.getElementById("space_main").scrollTop;
        let clientHeight = document.getElementById("app").offsetHeight;
        let scrollHeight = document.getElementById("space_main").scrollHeight;
        console.log("clientHeight", clientHeight);
        console.log("scrollTop", scrollTop);
        console.log("scrollHeight", scrollHeight);
        console.log("=======", clientHeight + scrollTop >= scrollHeight - 100);
        if (clientHeight + scrollTop >= scrollHeight - 100) {
          this.updateData();
        }
      },
      zan: function (timeAxisId,index) {
        let num = $("#zan-num-" + timeAxisId).val();
        this.list[index].isPress = 1;
        if (num === 0) {
          $("#zan-img-" + timeAxisId).attr('src', "https://qiniqnyx.cn/site/static/images/love_true.png");
        }
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/fabulousPress",
          data: {
            "lsh": timeAxisId,
            "userCode": this.global.userCode,
            "isPress": 1,
            "count": 1
          },
          dataType: 'json',
          success: function (result) {
            $.each(result, function (i, item) {
              let new_count = item.new_count;
              $("#zan-num-" + timeAxisId).html(new_count);
            });
          }
        });
      },
      communicate(lsh) {

        this.commentsMsgLsh = lsh;
        /*document.querySelector('#inputId').scrollIntoView();
        jQuery('.box').css('visibility', 'visible');
        jQuery("#inputId").focus();*/
        this.replyShow = true;
      },
      upload: function () {
        //alert(this.commentsMsgLsh + "  " + this.userCode + "    " + this.commentContent);
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/commentUp",
          data: {
            "lsh": this.commentsMsgLsh,
            "userCode": this.global.userCode,
            "commentContent": this.commentContent
          },
          dataType: 'json',
          success: function (result) {
            //alert("========");
            location.reload();
          }
        });
      },
      test() {
      }
    }
  }
  /*$(document).ready(function () {
    $('.swipebox').swipebox({
      useSVG: true,
      HooCeffeButoNoMobile: false,
      initialIndexOnArray: 0,
      hideBarsDelay: 3000,
      ReaveBaysMobile: false
    });

    $(".box").on("tap", function () {
      jQuery('.box').css('visibility', 'hidden');
    });
    $(document).on("click", function () {
      this.show = false;
    });
  })*/
</script>
<style scoped lang="scss">

  * body {
    margin: 0;
    padding: 0;
    font-family: Consolas, serif;
    /*font-size: 4vw;*/
  }

  #app {
    width: 100%;
    height: 100%;
  }

  #space_home {

    display: block;
    max-height: 100%;
    max-width: 100%;
    display: block;
    position: relative;
  }

  #space_home img {
    width: 100%;
    display: block;
    text-align: left;
  }

  #space_content {
    margin-top: 5%;
  }

  #time {
    width: 100%;
    height: 65px;
    float: left;
  }

  #module {
    width: 100%;
    float: left;
  }

  /*#axis {
      width: 6%;
      !*border-bottom: #0d8ddb 2px solid;
      border-right: #0d8ddb 2px solid;*!
      float: left;
      height: 100%;
      display: block;

  }*/

  #box {
    width: 93%;
    float: left;
    height: 100%;
    margin-left: 5%;
    border-left: #36b1db 2px solid;
    display: block;
  }

  #box-content {
    width: 100%;
    height: 100%;
    /*-webkit-box-shadow: 0 3px 0;
    -moz-box-shadow: 0 3px 0;*/
    background-color: #f3fcff;
    box-shadow: 0 3px 0 #b0b1b2;
    float: left;
    border-radius: 8px;
  }

  .figure-list {
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
    width: 5rem;
    height: 5rem;
    margin: 0 2% 2% 0;
    overflow: hidden;
  }

  .figure-list .pic {
    border: 1px solid #000;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    //padding-bottom: 100%; /* 关键就在这里 */
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

  #promulgator {
    height: 40px;
    font-size: 11px;
    line-height: 40px;
    text-align: right;
    margin-right: 15px;
  }

  .ul_bottom {
    width: 85%;
    margin: 0;
    padding: 0;
    height: auto;
    display: block;
    clear: both;
    margin: 0 auto;
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

  #user img {
  }

  #icon_day_mov {
    width: 20px;
    height: 10px;
    left: -10px;
    position: relative;
  }

  #upload {
    width: 15%;
    position: fixed;
    right: 10%;
    top: 78%;
    z-index: 1;
  }

  #comment-msg {
    width: 100%;
    display: inline-block;
    padding: 0 0 10px 0;
  }

  #comment-msg ul {
    width: 85%;
    display: block;
    clear: both;
    margin: 0 auto;
    font-size: 12px;
  }

  #comment-msg ul li {
    display: block;
    width: 100%;
    text-align: left;
    line-height: 20px;
  }

  .box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9;
    top: 0;
    margin: 0;
    padding: 0;
  }

  .box2 {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 0;
    margin: 0;
    padding: 0;
  }

  .box1 {
    width: 100%;
    height: auto;
    position: fixed;
    /*left: 100%; top: 100%;*/
    /*margin-left: -250px;*/
    /*border: 1px solid #000000;*/
    bottom: 0;
    background-color: white;
  }

  .box3 {
    width: 100%;
    height: auto;
    position: fixed;
    /*left: 100%; top: 100%;*/
    /*margin-left: -250px;*/
    /*border: 1px solid #000000;*/
    bottom: 0;
    background-color: white;
  }

  .audio1{
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #000000;
  }
</style>
