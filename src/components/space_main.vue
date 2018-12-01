<!--
<template>
  <div id="all">
    <div id="space_main">
      <div id="upload">
        <a :href="'https://qinqinyx.cn/timeLang/uploadSpace?userCode='+group.userCode+'&groupId='+group.groupId">
          <img src="../assets/images/check_true.png" style="width: 100%;height: 100%;"></a>
      </div>
      <div id="space">
        <div id="space_home">
          <img src="../assets/images/bg.png"
               style="border-bottom-right-radius: 1000px 50%;border-bottom-left-radius: 1000px 50%">
          <div style="width:100%;height: 100%;">

            <div v-if='group != null'>
              <div
                style="position:absolute;width:20%;height:20%;z-index:1; left: 50%; top: 40%;
								transform: translate(-50%, -50%);border-radius: 50%;">
                <a :href="'https://qinqinyx.cn/timeLang/groupInfo?groupId='+group.groupId+'&userCode='+group.userCode"><img
                  :src="group.grouping" style="border-radius:50%;"/></a>
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
        &lt;!&ndash;<c:choose>
          <c:when test="${result != 0}">&ndash;&gt;
        <div v-if="result != 0">
          <div v-for="item in list">
            &lt;!&ndash;<c:forEach items="${list}" var="content" varStatus="status">&ndash;&gt;
            <input type="hidden" id="lsh_item.lsh" value="item.lsh">
            <input type="hidden" id="userCode" value="item.userCode">
            <input type="hidden" id="open_item.open" value="item.open">
            <input type="hidden" id="groupId" value="item.groupId">
            <div id="space_content">

              <div id="module">

                <div id="box">


                  <div id="time">

                    <div style="font-size: 15px;line-height: 65px;">
                      <img src="../assets/images/icon_day_mov.png"
                           style="width: 20px;height: 16px;left: -9px;position: relative;"/><span>
										&lt;!&ndash;<fmt:parseDate value="${content.time}" pattern="yyyy-MM-dd" var="receiveDate"></fmt:parseDate>
          <fmt:formatDate value="${receiveDate}" pattern="yyyy-MM-dd"></fmt:formatDate>&ndash;&gt;{{item.time}}</span>
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
                            &lt;!&ndash;<c:choose>
                              <c:when test="${content.type == 1}">&ndash;&gt;
                            <div v-if="item.type === 1">

                              &lt;!&ndash;<c:forEach items="${content.picURL}" var="pic">&ndash;&gt;
                              <div v-for="pic in item.picURL">
                                <li>
                                  <figure :style="'background-image:url('+pic.thumbUrl+')'">

                                    <a :href="pic.picUrl" class="swipebox"
                                       :rel="'gallery_'+item.lsh"></a>

                                  </figure>
                                </li>
                                &lt;!&ndash;</c:forEach>
                              </c:when>&ndash;&gt;
                              </div>
                            </div>
                            &lt;!&ndash;<c:when test="${content.type == 2}">&ndash;&gt;
                            <div v-else-if="item.type === 2">
                              <li>

                                <div style="width: 100px;height: 200px">
                                  <video style="width: 100%;height: 100%;" type="video.mp4"
                                         controls="controls">
                                    <source :src="item.videoUrl" type="video/mp4">
                                  </video>
                                </div>

                              </li>
                            </div>
                            &lt;!&ndash;</c:when>&ndash;&gt;

                            &lt;!&ndash; <c:when test="${content.type == 3}">&ndash;&gt;
                            <div v-else-if="item.type === 3">
                              <div>
                                <figure>
                                  <audio id="media" :src="item.soundUrl"
                                         controls="controls"></audio>
                                </figure>
                              </div>
                            </div>
                            &lt;!&ndash; </c:when>
                             </c:choose>&ndash;&gt;
                          </ul>
                        </div>

                      </div>

                      <div id="comment" style="display: inline-block;width: 95%;padding:10px 0 10px 0;">
                        <div style="width: 85%;">
                          <ul class="ul_bottom">
                            <li id="_zan" v-on:click="zan(item.lsh)">
                              &lt;!&ndash;<c:choose>
                                <c:when test="${content.fabulousCount > 0}">&ndash;&gt;
                              <div v-if="item.fabulousCount > 0">
                                <img :id="'zan-img-'+item.lsh"
                                     src="../assets/images/love_true.png"
                                     alt="">
                              </div>
                              &lt;!&ndash;</c:when>
                              <c:otherwise>&ndash;&gt;
                              &lt;!&ndash;<div v-else>
                                  <img id="zan-img-{{item.lsh}}"
                                       src="../assets/ic_event_post_item_praise_dis.png"
                                       alt="">
                              </div>&ndash;&gt;
                              &lt;!&ndash;</c:otherwise>
                            </c:choose>&ndash;&gt;
                            </li>
                            <li>
                              <span :id="'zan-num-'+item.lsh" style="font-size:14px">{{item.fabulousCount}}</span>
                            </li>
                            <li id="communicate">
                              <a v-on:click="communicate(item.lsh)"
                                 class="show">
                                <img src="../assets/images/comment_ico.png" alt="">
                              </a>

                            </li>
                            <li v-if="item.open === 2">
                              <img src="../assets/images/share_ico.png" alt=""
                                   onclick="shareWebview();">
                            </li>
                          </ul>
                        </div>
                        <div id="quickref-bubble-item.lsh" class="quickref-bubble"
                             style="width: 20px;height: 5px;float: right;">
                          <span onclick="dialogs(item.lsh,item.open);">...</span>
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

            &lt;!&ndash;</c:forEach>&ndash;&gt;
          </div>
        </div>
        &lt;!&ndash;<c:otherwise>&ndash;&gt;
        <div v-else>
          <div style="width: 20%;border-radius: 2em;background-color: #00b7ee;font-size: 18px;position: fixed;top: 50%;left: 50%;
                 display: inline-block;transform: translate(-50%, -50%);text-align: center;padding: 10px">
            <span>创建</span>
          </div>
          <div style="width: 15%;background-color: #00b7ee;font-size: 18px;position: fixed;top: 70%;left: 40%;
                 display: inline-block;transform: translate(-50%, -50%);">
            &lt;!&ndash;<img src="../assets/icon_space_create.png">&ndash;&gt;</div>
          <div style="width: 15%;background-color: #00b7ee;font-size: 18px;position: fixed;top: 70%;left: 60%;
                 display: inline-block;transform: translate(-50%, -50%);">
            &lt;!&ndash;<img src="../assets/icon_space_invite.png">&ndash;&gt;</div>
        </div>
        &lt;!&ndash; </c:otherwise>
           </c:choose>&ndash;&gt;
      </div>
    </div>
    <div class="box">
      <div class="box1">

        <div id="_input_box"
             style="position: relative;top:92%;width: 100%;height: 40px;display: inline-block;padding: 2px;">
        <textarea id="inputId" wrap="physical" placeholder="回复"
                  style="resize:none;font-size: 18px;width: 76%;height: 100%;float: left;border: none;vertical-align:middle;overflow:hidden;"></textarea>
          <button type="button" id="btn" onclick="upload();"
                  style="width: 23%;height: 37px;vertical-align: middle;float: left;background-color: #e5e5e5;border: none;">
            评论
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  var space = new Vue({
    el: '#all',
    data: {
      userCode: 31,
      groupId: 70,
      list: '',
      group: '',
      users: ''
    }
  });
  export default {
    name: "timeAxis"
  }

  $(document).ready(function () {

    /*$.ajax({
      url: "https://qinqinyx.cn/timeLang/timeAxis",
      data: {
        "userCode": 31,
        "groupId": 70
      },
      dataType: 'json',
      success: function (result) {
        space.userCode = result.group.userCode;
        space.groupId = result.group.groupId;
        space.group = result.group;
        space.list = result.list;
        space.users = result.users;
      }
    });*/

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
  });

  var commentsMsgLsh = "";

  function zan(timeAxisId) {

    /*var timeAxisId = $("#spaceId").val();*/
    const num = $("#zan-num-" + timeAxisId).val();
    if (num == 0) {
      $("#zan-img-" + timeAxisId).attr('src', "<%=basePath%>images/weisite/love_true.png");
    }
    $.ajax({
      url: "${basePath}/fabulousPress",
      data: {"lsh": timeAxisId, "userCode": $("#userCode").val(), "isPress": 1, "count": 1},
      dataType: 'json',
      success: function (result) {

        $.each(result, function (i, item) {
          var new_count = item.new_count;
          $("#zan-num-" + timeAxisId).html(new_count);
        });
      }
    });
  }

  function upload() {
    /*alert(commentsMsgLsh + "  " + $("#userCode").val() + "  " + $("#inputId").val())*/
    $.ajax({
      url: "${basePath}/commentUp",
      data: {"lsh": commentsMsgLsh, "userCode": $("#userCode").val(), "commentContent": $("#inputId").val()},
      dataType: 'json',
      success: function (result) {
        location.reload();
      }
    });
  }

  var dialogLsh = "";
  var openID = "";

  function dialogs(lsh, open) {
    openID = open;
    dialogLsh = lsh;
    var d = dialog({
      id: "dialogColor",
      content: '<div style="width: 100%;height=100%;float:left;font-size: 10px;">' +
        '<div id="see" style="width:100%;height: 100%;text-align: center;display: block;float:left;padding:10px 0 10px 0;" onclick="authority();">' +
        '<span>谁都可以看</span></div>' +
        '<div id="del" style="width:100%;height: 100%;text-align: center;display: block;float:left;padding:10px 0 10px 0;" onclick="deleteDialog();">' +
        '<span>删除</span></div></div>',
      quickClose: true,// 点击空白处快速关闭
      width: $(window).width() - 100,
      height: "auto",
      padding: 0,
      backgroundColor: "#fff1d3"
      /*lock: true*/

    });
    /*dialog.get("dislogColor").style()*/
    d.show(document.getElementById("quickref-bubble-" + lsh));
  }

  /*function deleteDialog() {

    if (window.confirm('你确定要取消交易吗？')) {
      $.ajax({
        url: "<%=basePath%>/timeAxisDel",
        data: {"timeAxisId": dialogLsh, "userCode": this.userCode,
        success: function (result) {
          location.reload();
        }
      });
      return true;
    } else {
      close();
      return false;
    }
  }
*/
  function authority() {
    window.location.href = "<%=basePath%>authority?userCode=" + $('#userCode').val() + "&open=" + openID + "&spaceId='" + dialogLsh + "'&groupId=" + $('#groupId').val();
  }

  function communicate(lsh) {
    commentsMsgLsh = lsh;
    /*$(".box").css({'height': $(document).height(), 'width': $(document).width()});
    jQuery('.box').show()*/
    /*jQuery('#_input_box').css('height',$(document).height() * 0.08);*/
    document.querySelector('#inputId').scrollIntoView();

    jQuery('.box').css('visibility', 'visible');
    jQuery("#inputId").focus();
  }

  /*function openShare() {
    shareWebview();
  }

  mui.plusReady(function () {
    ws = plus.webview.currentWebview();
    //关闭splash页面；
    plus.navigator.closeSplashscreen();
  })*/
  var sharew;
  var ws = null;

  /**
   *分享窗口
   */
  function shareWebview() {
    ws = plus.webview.currentWebview();
    if (sharew) { // 避免快速多次点击创建多个窗口
      return;
    }
    var top = plus.display.resolutionHeight - 134;
    var href = "share.html";
    sharew = plus.webview.create(href, "share.html", {
      width: '100%',
      height: '134',
      top: top,
      scrollIndicator: 'none',
      scalable: false,
      popGesture: 'none'
    }, {
      shareInfo: {
        "href": "www.baidu.com",
        "title": "【加工跟单】新的订单详情",
        "content": "欢迎使用加工跟单APP,点击查看订单详情！",
        "pageSourceId": ws.id
      }
    });
    sharew.addEventListener("loaded", function () {
      sharew.show('slide-in-bottom', 300);
    }, false);
    // 显示遮罩层
    ws.setStyle({
      mask: "rgba(0,0,0,0.5)"
    });
    // 点击关闭遮罩层
    ws.addEventListener("maskClick", closeMask, false);
  }

  function closeMask() {
    ws.setStyle({
      mask: "none"
    });
    //避免出现特殊情况，确保分享页面在初始化时关闭
    if (!sharew) {
      sharew = plus.webview.getWebviewById("share.html");
    }
    if (sharew) {
      sharew.close();
      sharew = null;
    }
  }
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
    font-family: Consolas;
    /*font-size: 4vw;*/
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
    right: 15%;
    bottom: 10%;
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
    z-index: 1;
    top: 0;
    margin: 0;
    padding: 0;
    visibility: hidden;
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
    visibility: hidden;
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
</style>
&lt;!&ndash;<template>
  &lt;!&ndash; 主界面菜单同时移动 &ndash;&gt;
  &lt;!&ndash; 侧滑导航根容器 &ndash;&gt;
  <div class="mui-off-canvas-wrap mui-draggable">
    &lt;!&ndash; 主页面容器 &ndash;&gt;
    <div class="mui-inner-wrap">
      &lt;!&ndash; 主页面标题 &ndash;&gt;
      <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">标题</h1>
      </header>
      <nav class="mui-bar mui-bar-tab">
        <a class="mui-tab-item mui-active">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </a>
        <a class="mui-tab-item">
          <span class="mui-icon mui-icon-phone"></span>
          <span class="mui-tab-label">创作</span>
        </a>
        <a class="mui-tab-item">
          <span class="mui-icon mui-icon-email"></span>
          <span class="mui-tab-label">发现</span>
        </a>
        <a class="mui-tab-item">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">我的</span>
        </a>
      </nav>
      &lt;!&ndash; 主页面内容容器 &ndash;&gt;
      <div class="mui-content mui-scroll-wrapper">
        <div class="mui-scroll">
          &lt;!&ndash; 主界面具体展示内容 &ndash;&gt;
          &lt;!&ndash;<timeAxis></timeAxis>&ndash;&gt;
        </div>
      </div>
      <div class="mui-off-canvas-backdrop"></div>
    </div>
  </div>
</template>

<script>
  import timeAxis from './components/timeAxis';

  export default {
    name: 'App',
    components: {timeAxis}
  }

  //mui初始化
  /* mui.init();
   mui('.mui-scroll-wrapper').scroll({});*/
  /*(function($){
    $(".mui-scroll-wrapper").scroll({
      //bounce: false,//滚动条是否有弹力默认是true
      indicators: false, //是否显示滚动条,默认是true
      deceleration: 0.0005
    });
  })(mui);*/
  //mui初始化
  mui.init();
  let subpages = ['timeAxis', 'timeAxis', 'timeAxis', 'timeAxis'];
  let subpage_style = {
    top: '45px',
    bottom: '51px'
  };

  let aniShow = {};

  //创建子页面，首个选项卡页面显示，其它均隐藏；
  mui.plusReady(function() {
    let self = plus.webview.currentWebview();
    for (var i = 0; i < 4; i++) {
      let temp = {};
      let sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
      if (i > 0) {
        sub.hide();
      }else{
        temp[subpages[i]] = "true";
        mui.extend(aniShow,temp);
      }
      self.append(sub);
    }
  });
  //当前激活选项
  let activeTab = subpages[0];
  let title = document.getElementById("title");
  //选项卡点击事件
  mui('.mui-bar-tab').on('tap', 'a', function(e) {
    let targetTab = this.getAttribute('href');
    if (targetTab == activeTab) {
      return;
    }
    //更换标题
    title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
    //显示目标选项卡
    //若为iOS平台或非首次显示，则直接显示
    if(mui.os.ios||aniShow[targetTab]){
      plus.webview.show(targetTab);
    }else{
      //否则，使用fade-in动画，且保存变量
      let temp = {};
      temp[targetTab] = "true";
      mui.extend(aniShow,temp);
      plus.webview.show(targetTab,"fade-in",300);
    }
    //隐藏当前;
    plus.webview.hide(activeTab);
    //更改当前活跃的选项卡
    activeTab = targetTab;
  });
  //自定义事件，模拟点击“首页选项卡”
  document.addEventListener('gohome', function() {
    let defaultTab = document.getElementById("defaultTab");
    //模拟首页点击
    mui.trigger(defaultTab, 'tap');
    //切换选项卡高亮
    let current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
    if (defaultTab !== current) {
      current.classList.remove('mui-active');
      defaultTab.classList.add('mui-active');
    }
  });

</script>&ndash;&gt;

-->
