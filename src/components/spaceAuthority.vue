<template>
  <!--<html>
  <head>
    <base href="<%=basePath%>">
    <title>谁可以看</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
  </head>

  <body>-->
  <div style="width: 100%;height: 100%;background-color: #ffffff">
    <div style="width: 100%;" id="box">
      <ul style="">
        <li @click="updateOpen(2);">
          <span style="font-size: 18px;font-weight: bold;">公开</span>
          <span id="open_2">
                    <img v-if="open === 2" src="../assets/images/check_true.png"
                         style="width: 5%;float: right;">
                    </span>
          <br/>
          <span style="font-size: 14px;">展示在发现中，所有用户可以看到</span>
        </li>
        <li @click="updateOpen(1);">
          <span style="font-size: 18px;font-weight: bold;">亲友</span>
          <span id="open_1">
                    <img v-if="open === 1" src="../assets/images/check_true.png"
                         style="width: 5%;float: right;">
                </span>
          <br/>
          <span style="font-size: 14px;">展示在宝宝空间中,加入空间的亲友可以查看</span>
        </li>
        <li @click="updateOpen(0);">
          <span style="font-size: 18px;font-weight: bold;">私密</span>
          <span id="open_0">
                    <img v-if="open === 0" src="../assets/images/check_true.png"
                         style="width: 5%;float: right;">
                </span>
          <br/>
          <span style="font-size: 14px;">展示在宝宝空间中</span>
        </li>
      </ul>
    </div>
  </div>
  <!--</body>
  </html>-->
</template>

<script>

  export default {
    name: "spaceAuthority",
    data() {
      return{
        open: this.$route.params.open,
        userCode: this.global.userCode,
        lsh: this.$route.params.lsh
      }
    },
    methods: {
      updateOpen: function (open) {
        this.open = open;
        if (this.userCode === "" || this.userCode === 'undefined') {
          $.ajax({
            url: "https://qinqinyx.cn/timeLang/updateTimeAxisOpen",
            data: {
              "userCode": this.userCode,
              "lsh": this.lsh,
              "open": open
            },
            type: 'get',
            dataType: 'json',
            timeout: 1000,
            success: function (results) {
              //var op = $("open").val();
              //$("#image").remove();
              //$("#open_" + open).append('<img src="<%=basePath%>images/weisite/check_true.png" style="width: 5%;float: right;" id="image">');
              //this.open = results
              //window.location.href = "<%=basePath%>space?groupId=${groupId}&userCode=${userCode}"
              alert("修改成功");
            },
            fail: function (err, status) {
              console.log(err)
            }
          })
        }else{
          this.$emit("transferTabIndex",open);
        }
      },
      getOpen: function () {
        alert(this.open+"=====");
        return this.open;
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .box ul {
    width: 100%;
    height: auto;
  }

  li {
    width: 100%;
    height: 20%;
    list-style-type: none;
    float: left;
    display: block;
    padding: 10px;
    border: 1px solid #d6d6d6;
    /*background-color: #c7c1bb;*/
    margin: 8px 0 8px 0;
    /*box-shadow: 0 4px 10px 0;*/
  }
</style>
