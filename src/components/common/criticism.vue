<template>
  <div id="criticism-box">
      <ul>
        <li v-for="(item,index) in criticismList">
            <div class="imgdiv">
              <img class="imgcss" :src="item.userVo.userHead"/>
            </div>
            <div class="conmment_details">
                <span class="comment_name">{{item.userVo.userNickName}}</span>
                <span style='font-size:10px'>{{item.criticismtTime}}</span>

              <!--<div class="del">
                <i class="icon layui-icon">赞()</i>
              </div>-->
              <div class="comment_content"> 
                {{item.criticismContent}}
              </div>
            </div>
        </li>
      </ul>

    <div id="criticism">
      <input type="text" style="border: none;" placeholder="说点什么，评论一下" v-model="text"/>
      <button @click="uploadCriticism">评论</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "criticism",
    /*props:{
      lsh: {
        type:Number,
        default:''
      }
    },*/
    data() {
      return {
        criticismList: [],
        size:false,
        lsh:this.$route.params.lsh,
        text:''
      }
    },
    created() {
      let url = "https://qinqinyx.cn/timeLang/story/showStoryCriticism";
      let _self = this;
      $.ajax({
        url: url,
        data: {
          "userCode": this.global.userCode,
          "curPage": 1,
          "pageRows": 10,
          "storyId":this.storys.storyId
        },
        dataType: 'json',
        success: function (result) {
          _self.criticismList = result.data.pageResult;

        }
      });
    },
    methods:{
      uploadCriticism: function () {
        if(this.text !== "") {
          let url = "https://qinqinyx.cn/timeLang/story/storyCriticism";
          $.ajax({
            url: url,
            data: {
              "userCode": this.global.userCode,
              "storyId": this.lsh,
              "criticismContent": this.text
            },
            dataType: 'json',
            success: function (result) {
              window.reload();
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  #criticism-box{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    background-color: #ffffff;
  }
  #criticism-box ul{
    width: 100%;
    height: 90%;
    position: fixed;
    top: 5%;
    overflow: auto;
    display: block;
    border-top: 1px solid #e6e6e6;
  }
  #criticism-box ul li{
    width: 100%;
    height: 5rem;
    border-bottom: 1px solid #e3e3e3;
    display: block;
  }


  .conmment_details{
    width: 85%;
    height: 5rem;
    position: absolute;
    right: 0;
    margin-top: 2px;
  }

  p {
    text-indent: 2em;
    font-size: 18px;
  }

  .NavLinks img {
    width: 100%;
    height: 100%;
  }


  .hitShowPic span {
    font-size: 15px;
    text-align: center;
  }

  .comment_content {
    clear: both;
    margin: 5px 25px;
    font-size: 16px;
    font-family: Consolas;
  }

  .imgdiv {
    width: 10%;
    float: left;
    margin: 0.5rem;
  }

  .imgcss {
    width: 100%;
    border-radius: 50%;
  }

  .comment_name {
    margin:0.5rem;
    font-size: 1em;
    font-weight: bolder;
  }

  #criticism{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5em;
    z-index: 99;
    background-color: #f9f9f9;
    line-height: 5em;
  }

  #criticism input{
    width: 70%;
    height: 3rem;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    background-color: #e1e1e1;
    text-indent: 1em;
    margin-left: 1em;
  }
  #criticism button{
    width: 4em;
    height: 5em;
    display: block;
    margin-right: 1rem;
    border: none;
    background-color:#f9f9f9;
    float: right;

  }

</style>
