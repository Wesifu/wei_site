<template>
  <div class="body">
    <div class="content">
      <div class="type">登录</div>
      <div class="longin-boder">
        <div class="image">
          <img src="../assets/images/h_phone.png">
        </div>
        <input id="userTelphone" class="input" type="text" placeholder=" 用户名" v-model="userName"/>
      </div>
      <!--End用户名输入框-->
      <div class="longin-boder">
        <div class="image">
          <img style="" src="../assets/images/h_pwd.png">
        </div>
        <input id="password" class="input" type="password" placeholder=" 密码" v-model="userPassword"/>
      </div>
      <!--End密码输入框-->
      <div class="button" v-on:click="loginUser">登录</div>

      <div class="selected">
        <span class="selected_left">
          <router-link to="/registerUser">注册新用户</router-link>
        </span>
        <span class="selected_right">
            <a>忘记密码</a>
        </span>
      </div>
    </div>
    <div style="width: 98%;margin-top: 10%;">
      <div class="way">
        <span>其他登录方式</span>
      </div>
      <div class="img" style="width: 100%;margin: 5% auto;">
        <div style="width: 50%;float: left;">
          <div style="width: 60px;height: 60px;clear: both; display: block;margin: 0 auto;" onclick="login(0)">
            <a><img style="max-width:100%;" src="../assets/images/qq.png" alt=""></a>
          </div>
        </div>
        <div style="width: 50%;float: left;">
          <div style="width: 60px;height: 60px;clear: both; display: block;margin: 0 auto;" @click="wxLogin">
            <a><img style="max-width:100%;" src="../assets/images/weichat.png" alt=""></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        userName: '',
        userPassword: '',
        userCode: '',
        groupId: ''

      }
    },
    created(){
      this.global.clientWidth = document.body.clientWidth;
      this.global.clientHeight = document.body.clientHeight;
    },
    methods: {

      loginUser: function () {
        if (this.userPassword === '') {
          alert("密碼不爲空");
        } else {

          let _this = this;
          $.ajax({
            url: 'https://qinqinyx.cn/timeLang/userLogin',
            data: {
              "userName": this.userName,
              "threeLoginID": '',
              "password": this.userPassword,
              "threeLoginType": '',
              "phoneDeviceCode": '',
              "phoneDeviceName": '',
              "userCity": ''
            },
            dataType: "json",
            success: function (data) {
              // alert(data.userCode);
              _this.global.userCode = data.userCode;
              _this.global.groupId = data.groupId;
              _this.global.userInfo = data;
              $.ajax({
                url: 'https://qinqinyx.cn/timeLang/groups',
                data: {
                  "userCode": _this.global.userCode,
                },
                dataType: "json",
                success: function (data) {
                  let obj1 = data[0];
                  _this.global.groupId = obj1.groupId;

                  _this.$router.push({path: '/home/timeAxis'});
                }
              });
              /*window.location.href = "<%=basePath%>/space?groupId=&userCode=" + data.userCode;*/
            }
          });
        }
      },
      getQueryString: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
       // let r = window.location.search.substr(1).match(reg);
        alert(window.location)
        let r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      },

      wxLogin: function () {
        let appId = "wx42e58d40d776790f";
        let URI = this.$route.path;
        let REDIRECT_URI=encodeURIComponent(URI);
        let SCOPE="snsapi_userinfo";//snsapi_login

        window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=" + SCOPE + "&state=STATE#wechat_redirect";

        let code = this.getQueryString('code');

        $.ajax({
          url: 'https://qinqinyx.cn/timeLang/getWxLogin',
          data: {"code": code},
          dataType: "json",
          success: function (result) {
            //alert(obj.data);
            let obj = result.data;
            /*alert(obj.openID);*/
            $.ajax({
              url: '<%=basePath%>/saveUser',
              data: {
                "userTelphone": '',
                "userNickName": obj.nickName,
                "userPassword": '',
                "checkCode": '',
                "isThreeLogin": 1,
                "phoneDeviceCode": '',
                "phoneDeviceName": '',
                "threeLoginType": 'weixin',
                "threeLoginID": obj.unionid,
                "sex": '',
                "userHead": obj.headimgurl,
                "phoneDeviceType": ''
              },
              dataType: "json",
              success: function (result) {
                let o = jQuery.parseJSON(result);
                let obj = JSON.parse(result);

              }
            });

          }
        });

      }
    }
  }

</script>

<style scoped>
  .body {
    width: 100%;
    height: auto;
    margin-top: 25%;
  }

  .content {
    width: 93%;

    text-align: center;
    -webkit-box-shadow: 0px 1px 5px;
    -moz-box-shadow: 0px 1px 5px;
    box-shadow: 0px 1px 5px;
    background-color: #ffffff;
    padding-top: 5%;
    margin: 0 auto;
  }

  .longin-boder {
    width: 85%;
    height: 3rem;
    line-height: 3rem;
    border: 1px solid #dddddd;
    border-radius: 5px;
    background-color: #efefef;
    display: block;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 1.5rem;
  }

  .image {
    height: 2.9rem;
    float: left;
    display: block;
    width: 15%;

  }

  .input {
    width: 85%;
    float: left;
    height: 2.8rem;
    line-height: 37px;
    border: 0px;
    color: #333333;
    background-color: #ffffff;

  }

  .button {
    height: 40px;
    width: 85%;
    margin-top: 30px;
    margin-left: 7.5%;
    font-size: 16px;
    font-family: "微软雅黑";
    font-weight: bold;
    line-height: 38px;
    border-radius: 5px;
    color: #ffffff;
    background-color: #2f87ca;

  }

  .button:active {
    background-color: #37a3b9;
  }

  .type {
    font-size: 20px;
    font-family: "微软雅黑";
    font-weight: bold;
    line-height: 38px;
    color: #0d8ddb;
  }

  .selected {
    margin-top: 10%;
    margin-left: 10%;
    width: 80%;
    height: 30px;
    font-family: "微软雅黑";
    color: #0d8ddb;
  }

  .selected_left {
    float: left;
  }

  .selected_right {
    float: right;
  }

  .way {
    width: 100%;
    text-align: center;
    font-size: 13px;
    clear: both;
    display: block;
    margin: 0 auto;

  }
</style>
