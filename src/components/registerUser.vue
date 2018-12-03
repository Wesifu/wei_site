<template>
  <div style="width: 100%;height: 100%;">
    <div style="padding: 10px;">
      <div class="item">
        <div class="img">
          <img src="../assets/images/h_phone.png" class="pic">
        </div>
        <input id="userTelphone" type="text" placeholder="手机号码" v-model="userTelphone"
               style="width: 85%;height: 100%;border: none;float: left;float: left;text-indent: 1em;">
      </div>
      <div class="item">
        <div class="img">
          <img src="../assets/images/h_ver.png" class="pic" >
        </div>
        <input id="code" type="text" placeholder="验证码" v-model="checkCode"
               style="width: 65%;height: 100%;border: none;float: left;float: left;font-size: 14px;text-indent: 1em;">
        <div style="width: 20%;height: 100%;float: left;padding: 5px;">
          <button type="button" @click="sendCheckCode"
                  style=" width: 6em;height: 2em;border: 1px solid #4cc7ff;border-radius: 2em;float: right;
                  margin-top: 0.5em">获得验证码
          </button>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <img src="../assets/images/h_pwd.png" class="pic"></div>
        <input id="password" type="text" placeholder="密码（至少6位）" v-model="userPassword"
               style="width: 85%;height: 100%;border: none;float: right;float: left;text-indent: 1em;">
      </div>
    </div>
    <div style="width: 100%;height: 3.5em;display: inline-block;text-align: center;padding: 5px;margin-top: 1rem;">
      <button @click="registerUser" type="button" style="width: 90%;height: 100%;text-align:center;border-radius: 2em;background-color: #4cc7ff;;
        font-size: 16px;vertical-align:middle;">同意服务条款并注册
      </button>
    </div>
    <div style="width: 100%;text-align: center">
      <a href="#">点击阅读亲亲印象服务条款</a>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
  import toast from './common/toast'
  export default {
    name: "registUser",
    components:{
      toast,
    },
    data() {
      return {
        userTelphone: '',
        userPassword: '',
        checkCode: ''
      }

    },
    methods: {
      sendCheckCode: function(){

        //toast.toastText = "发送成功";

        $.ajax({
          url: 'https://qinqinyx.cn/timeLang/sendCheckCode',
          data: {
            "userTelphone": this.userTelphone,
          },
          dataType: "json",
          success: function (data) {
            //alert(JSON.stringify(data));
            this.$refs.toast.toast("发送成功");
          }
        });
      },
      registerUser: function () {
        alert(this.checkCode);
        let _this = this;
        $.ajax({
          url: 'https://qinqinyx.cn/timeLang/saveUser',
          data: {
            "userTelphone": this.userTelphone,
            "userNickName": '',
            "userPassword": this.userPassword,
            "checkCode": this.checkCode,
            "isThreeLogin": '0',
            "phoneDeviceCode": '',
            "phoneDeviceName": '',
            "threeLoginType": '',
            "threeLoginID": '',
            "sex": '',
            "userHead": '',
            "phoneDeviceType": ''
          },
          dataType: "json",
          success: function (data) {
            alert(JSON.stringify(data));
            /*$.each(data, function (i, item) {
              let result = item.result;
              let userCode = item.userCode;
              let groupId = item.groupId;
              if (result === 1) {
                //window.location.href = "<%=basePath%>/space?groupId=''&userCode=" + userCode;
                _this.$router.push({path: '/home/', query: {userCode: userCode, groupId: ''}});
              }
            });*/
            _this.global.userCode = data.userCode;
            _this.$router.push('/login');
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

  .item {
    width: 100%;
    height: 50px;
    float: left;
    display: inline-block;
    border-bottom: 1px solid #d7d7d7;

  }

  .pic {
    width: 100%;
    height: auto;
    float: left;
  }

  .img {
    width: 8%;
    text-align: center;
    display: inline-block;
    float: left;
    padding: 5px;
  }
</style>
