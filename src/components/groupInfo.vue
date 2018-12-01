<template>
  <div>
    <div id="user">
      <div style="width: 30%;height: 100%;float: left;">
        <figure :style="'background-image:url('+space.grouping+')'" class="figure">
        </figure>
      </div>

      <div style="padding:2% 0 2% 0;width: 20%;height: 30%;float: right;border-bottom-left-radius: 2em;border-top-left-radius: 2em;background-color: #ff6b77;text-align: center;font-size: 16px;vertical-align:middle;">
        <span>邀请</span>
      </div>
    </div>
    <div id="member">
      <div style="width: 100%;height: 100%;background-color: #f5f5f5;text-align: center;">
        <ul>
            <li v-for="(user,index) in users">
              <div style="width: 100%;height: 100%;padding-top: 10%">

                <div style="width: 60%;overflow: hidden;border-radius: 50%;display: block;clear: both;margin: 0 auto;">
                  <figure :style="'background-image:url('+user.userHead+')'" class="figure">
                  </figure>
                </div>
                <div style="float:left;font-size: 10px;font-family:Tahoma, 宋体;overflow: hidden;margin-top: 10%;text-align: center">
                  <span>昵称:</span>{{user.userNickName}}<br/>
                  <span>称呼:</span>{{user.callName}}
                </div>
              </div>
            </li>
        </ul>
      </div>
    </div>
    <div id="group" style="font-size: 14px;font-family: Consolas;">
      <div style="display: block;width:100%;height: 100%;background-color: #f6f6f6;display: block;clear: both;margin: 0 auto;">
        <div style="width: 95%;padding: 10px;">
          <span class="groupLeft">空间名称</span>
          <span class="groupRight" style="float: right">
            <input type="text" placeholder="宝宝" style="border:none;float: right;text-align: right;height: 0" v-model="groupName"/>
          </span>
        </div>
        <div style="border-top: 1px solid #f1f1f1;width: 95%;padding: 10px;">
          <span class="groupLeft">空间简介</span>
          <span class="groupRight" style="float: right">
            <textarea v-model="text" placeholder="说点什么" style="float: right;text-align: right;border: none;"></textarea>
          </span>
        </div>
      </div>
    </div>
    <div id="authority" style="font-size: 14px; font-family: Consolas;">
      <div style="padding-left: 10px;width: 95%;">
        <span>权限转让</span>
      </div>
    </div>
    <div id="save" v-on:click="revise">
      <div style=" width:100%;background-color: #f6f6f6;padding: 5% 0 5% 0;">
        <span>保存修改</span>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "groupInfo",
      data(){
        return{
          userCode:'',
          groupId:'',
          space:{},
          users:[],
          msgCount:'',// 该空间的未读消息量

          groupName:'',
          text:''
        }
      },
      methods:{
        revise : function () {
          $.ajax({
            url: "https://qinqinyx.cn/timeLang/groupEdit",
            data:{
              "userCode":this.userCode,
              "groupId":this.groupId,
              "groupName":this.groupName,
              "grouping":'',
              "des":this.text,
              "babyName":'',
              "babySex":'',
              "babyBirthday":''
            },
            type: "POST",
            jsonType:"json",
            success: function (result) {
              alert("修改成功");
            }
          });
        }
      },
      created() {
        let _this = this;
        this.$nextTick(function () {
          $.ajax({
            url: "https://qinqinyx.cn/timeLang/onegroup",
            data: {
              "groupId": this.global.groupId,
              "userCode": this.global.userCode
            },
            dataType: 'json',
            success: function (result) {
              //alert(result.group.userCode + "===" + result.group.groupId);
              let obj = result.data;
              _this.userCode = obj.space.userCode;
              _this.groupId = obj.space.groupId;
              _this.space = obj.space;
              _this.users = obj.users;
              _this.msgCount = obj.msgCount;
              _this.groupName = obj.space.groupName;
              _this.text = obj.space.des;
            }
          })
        })
      },
    }
</script>

<style scoped>

  * {
    padding: 0;
    margin: 0;
    /*background-color: #a9aaab;*/
  }

  #user {
    width: 100%;
    height: 30%;
    float: left;
    display: inline-block;
    background-color: #f3f3f3;
    padding: 10% 0 10% 0;
    position: relative;
  }

  #member {
    width: 100%;
    height: auto;
    display: inline-block;

    padding: 5% 0 3% 0;
  }

  #group {
    width: 100%;
    height: 20%;
    display: inline-block;
    padding: 5% 0 5% 0;
  }

  #authority {
    width: 100%;
    height: 20%;
    display: inline-block;
    background-color: #f6f6f6;
    padding: 4% 0 4% 0;
  }

  #save {
    width: 100%;
    height: 20%;
    display: inline-block;
    padding: 10% 0 10% 0;
    text-align: center;
    font-size: 12px;
  }

  #member ul {
    width: 95%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    clear: both;

  }

  #member ul li {
    width: 23%;
    height: 100px;
    float: left;
    list-style-type: none;
    display: inline-block;
    padding: 5px;
  }

  /*#group ul {
      display: inline-block;
      padding: 5px;
      width: 100%;
      height: 100%;
  }

  #group ul li {
      list-style-type: none;
      width: 100%;
      height: 100%;
  }*/
  .figure {
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
</style>
