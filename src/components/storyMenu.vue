<template>
  <div style="width: 100%;height: 100%;">
    <div id="tabs">
      <!--<div :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  center>-->
      <div style="width: 60%;height: 100%;display: block;clear: both;margin: 0 auto;">
        <label class="tab" :style="this.storys.active === 0 ? 'border-bottom:3px solid #ffffff;':''" @click="active = 0">故事</label>
        <label class="tab" :style="this.storys.active === 1 ? 'border-bottom:3px solid #ffffff;':''" @click="active = 1">儿歌</label>
        <label class="tab" :style="this.storys.active === 2 ? 'border-bottom:3px solid #ffffff;':''" @click="active = 2">诗词</label>
      </div>
    </div>
    <!--</div>-->
    <div id="part" v-show="active === 0">
      <div id="options">
        <label class="option" style="background-color: #0e90d2;-webkit-border-radius: 2em;
              -moz-border-radius: 2em;border-radius: 2em;">我要听故事</label>
        <label class="option">我要讲故事</label>
      </div>
    </div>
    <div id="box" class="demo-text" style="width: 100%;height: 77%;position: relative;top:9%;">
    </div>
  </div>
</template>

<script>

  export default {
    name: "storyMenu",
    data() {
      return {
        active:0,
        paused: true,
        context: {},
        aBall: [],
        num: 10,
        minSpeed: 1,
        maxSpeed: 3,
        animate:0,
        timeOutId: 0,
        /*active: 0,*/
        option: 0,
        tabs: [{
          active: 0,
          url: "https://qinqinyx.cn/timeLang/story/typeList"
          },
          {
            active: 1,
            url: "https://qinqinyx.cn/timeLang/childrenSong/typeList"
          },
          {
            active: 2,
            url: "https://qinqinyx.cn/timeLang/poem/typeList"
          }
        ],
        types: [/*"勇敢",
          "诚信",
          "互助",
          "亲情",
          "友情",
          "勤劳",
          "坚持",
          "坚强",
          "人文知识",
          "善良",
          "愚昧",
          "智慧"*/]

      }
    },
    created() {
      this.$nextTick(function () {
        let _self = this;
        let url = this.tabs[this.storys.active].url;
        $.ajax({
          url: url,
          data: {
            "userCode": 31,
          },
          dataType: 'json',
          success: function (result) {
            //alert(result.group.userCode + "===" + result.group.groupId);
            _self.types = result.data;
            _self.DOMrealize();
          }
        });
      });
    },
    methods: {
      getTypes: function () {
        let _self = this;
        let url = this.tabs[this.storys.active].url;
        $.ajax({
          url: url,
          data: {
            "userCode": 31,
          },
          dataType: 'json',
          success: function (result) {
            //alert(result.group.userCode + "===" + result.group.groupId);
            _self.types = result.data;
            _self.DOMrealize();
          }
        });
      },
      //分析：小球要实现随机的运动，应该具有不同的移动速度以及不同的运动方向
      //DOM实现
      DOMrealize: function () {
        $(".ball").remove();
        let _self = this;
        let array = [];//定义一个数组来接受小球
        //创建一个小球的对象
        function Ball() {
          this.init();
        };
        Ball.prototype = {
          init: function () {
            //给小球添加私有属性
            this.speedX = _self.random(_self.minSpeed, _self.maxSpeed);
            this.speedY = _self.random(_self.minSpeed, _self.maxSpeed);
            this.div = document.createElement('div');
            this.div.className = 'ball';
            this.div.style = `width: 3.8rem;height: 3.8rem;border-radius: 50%;position: absolute;
            `;
            //this.div.style.backgroundColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
            this.div.style.backgroundColor = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
            this.div.click =
            this.x = _self.random(0, window.innerWidth - 50);
            this.y = _self.random(0, window.innerHeight - 50);
          }
        };
        //造小球
        for (let i = 0; i < this.types.length; i++) {
          let ball = new Ball();
          document.getElementById("box").appendChild(ball.div);
          ball.div.id = "ball" + i;


          $("#ball" + i).val(_self.types[i].lsh);

          $("#ball" + i).html("<div style='position: absolute;width: 100%;line-height: 3.8rem;/*margin: 1.5em 0 0 0.7em;*/" +
            "text-align: center;font-size: 0.8rem;'>" + _self.types[i].typeName + "</div>");

          if (i === 1) {
            $("#ball" + i).css({
              "background-image": "url(https://qinqinyx.cn/site/static/images/story_bule_ico.png)",
              "background-size": "3.8rem 3.8rem",
              "background-repeat": "no-repeat"
            });
          } else if (i === 2) {
            $("#ball" + i).css({
              "background-image": "url(https://qinqinyx.cn/site/static/images/story_yellow_ico.png)",
              "background-size": "3.8rem 3.8rem",
              "background-repeat": "no-repeat"
            });
          } else if (i === 3) {
            $("#ball" + i).css({
              "background-image": "url(https://qinqinyx.cn/site/static/images/story_red_ico.png)",
              "background-size": "3.8rem 3.8rem",
              "background-repeat": "no-repeat"
            });
          }

          array.push(ball);
          $("#ball" + i).on('click',function (e) {
            //let typeId = e.target.value;
            /*let typeId = ;*//*let typeId = ;*/
            /*alert($("#ball" + i).val())*/
            _self.storys.typeId = $("#ball" + i).val();
            _self.$router.push({name:"storyList"});
          });
        }

        this.aBall = array;
        //小球运动
        this.move();
      },
      ballClick:function(e){

      },
      move: function () {
        let _self = this;
        //let array = this.aBall;
        for (let i = 0; i < this.aBall.length; i++) {
          this.draw(this.aBall[i]);
          this.update(this.aBall[i]);
        }

        this.timeOutId = setTimeout(function () {
          _self.animate = requestAnimationFrame(_self.move);

        }, 25);

      },

      draw: function (obj) {
        obj.div.style.top = obj.y + 'px';
        obj.div.style.left = obj.x + 'px';
      },

      update: function (obj) {
        obj.x = obj.div.offsetLeft + obj.speedX;
        obj.y = obj.div.offsetTop + obj.speedY;
        if (obj.x < 0) {
          obj.x = 0;
          obj.speedX *= (-1);
        }
        if (obj.y < 0) {
          obj.y = 0;
          obj.speedY *= (-1);
        }
        if (obj.x > ($("#box").width() - 50)) {
          obj.x = $("#box").width() - 50;
          obj.speedX *= (-1);
        }
        if (obj.y > ($("#box").height() - 50)) {
          obj.y = $("#box").height() - 50;
          obj.speedY *= (-1);
        }
      },
      random: function (min, max) {
        return ~~(Math.random() * (max - min) + min);
      },
      menu: function () {

      },
      //调整圆的位置坐标
      adjustPosition: function (circle) {
        //判断圆的运动坐标是否越界，越界则反向运动
        if (circle.x + circle.velocityX + circle.radius > this.context.canvas.width ||
          circle.x + circle.velocityX - circle.radius < 0) {
          circle.velocityX = -circle.velocityX;
        }

        if (circle.y + circle.velocityY + circle.radius > this.context.canvas.height ||
          circle.y + circle.velocityY - circle.radius < 0) {
          circle.velocityY = -circle.velocityY;
        }

        circle.x += circle.velocityX;
        circle.y += circle.velocityY;
      },
    },
    watch:{
      active(value,oldValue){
        /*alert(this.animate);
        alert(this.timeOutId);*/
        cancelAnimationFrame(this.animate );
        clearTimeout(this.timeOutId);
        //alert(value+"   "+oldValue);
        this.storys.active = value;
        this.getTypes();

      }
    }
  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
    font-size: 75%;
  }
  .ball {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    position: absolute;
  }

  #tabs {
    width: 100%;
    height: 9%;
    position: fixed;
    background-color: #0e90d2;
    top: 0;
  }

  .tab {
    width: 33.3%;
    height: 97%;
    float: left;
    display: block;
    text-align: center;
    line-height: 50px;
    color: #eeeeee;
    font-size: 1rem;
  }

  #part {
    width: 100%;
    height: 10%;
  }

  #options {
    width: 80%;
    height: 2rem;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    position: fixed;
    left: 10%;
    top: 10%;
    border: 1px solid #0b76ac;
    margin-top: 1em;

  }

  .option {
    font-size: 0.8rem;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 2rem;
    display: block;
    float: left;
  }

  /*.container {
    width: 100%;
    height: 100%;
    border: 1px solid #333;
    position: relative;
  }
  .ball {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid #999;
    !* alternate：动画先正常运行再反方向运行，并持续交替运行 *!
    animation: horizontal 10s linear 0s infinite alternate, vertical 6s linear 0s infinite alternate;
  }
  @keyframes horizontal {
    0% {

    }
    100% {
      !* 运动最大距离为盒子长度减去球的长度 *!
      left: calc(300px - 20px);
    }
  }
  @keyframes vertical {
    0% {

    }
    100% {
      !* 运动最大距离为盒子高度减去球的高度 *!
      top: calc(300px - 20px);
    }
  }*/
</style>
