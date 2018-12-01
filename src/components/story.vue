<!--suppress ALL -->
<template>
  <div>
    <img :src="story.imageUrl" style="height: 100%;overflow: hidden;position: fixed;"/>
    <div style="width: 100%;height: 100%;background-color: #000000;
    opacity: 0.6;position: fixed;"></div>
    <div class="story-box">

      <div class="upper-part">
        <swiper :options="swiperOption" style="width: 100%;height: 100%;">
          <swiper-slide v-show="this.storys.active == 1?false:true">
            <div style="margin-top: 5%;">
              <div style="text-indent: 2em;line-height: 2em;padding:1rem 3rem 0 3rem;">
                {{story.introduction}}
              </div>
            </div>
          </swiper-slide>
          <swiper-slide ref="slide" id="slide" style="overflow: auto;">
            <div style="margin-top: 5%;">
              <article :class="this.storys.active == 2 ? 'article2':'article1'" ref="article">
              </article>
            </div>
            <scroll class="middle-r middleTime" ref="lyricList" :data="currentLyric && currentLyric.lines">
              <div class="lyric-wrapper">
                <div v-if="currentLyric">
                  <p ref="lyricLine" class="text" :class="{'current': currentLineNum ===index}"
                     v-for="(line, index) in currentLyric.lines" :key="index">
                    {{line.txt}}</p>
                </div>
              </div>
            </scroll>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

      </div>
      <div class="lower-part">
        <!--音频-->
        <audio id="player" controls style="display: none;" :src="this.storys.active == 1?story.songUrl:story.audioUrl"
               ref="audio"></audio>
        <!--音频时间-->
        <div id="time" style="width: 100%;height: 30px;text-align: center;color: #ffffff;">
          <span>{{currentTime === '' ? '00:00' : currentTime}} / {{datetimeFormatUtil(story.length)}}</span>
        </div>
        <!--进度条-->
        <div id="box"
             style="width: 85%;height: 5%;display: block;clear: both;margin: 0 auto;position: relative;">
          <div class="process-bar">
            <div class="rdy" ref="rdy"></div>
            <div class="cur" ref="cur">
              <span id="processBtn" class="process-btn c-btn"></span>
            </div>
          </div>
        </div>
        <!--控件-->
        <!--<div style="width: 100%;position: absolute;">-->
        <ul class="play-btn">
          <li><img class="image" src="../../static/images/play_loop.png"/></li>
          <li><img class="image" src="../../static/images/last_listen_ico.png"/></li>
          <li id="audio-btn" @click="togglePlaying">
            <img class="image"
                 :src="play?'https://qinqinyx.cn/site/static/images/suspend_listen_ico.png':
                 'https://qinqinyx.cn/site/static/images/start_listen_ico.png'"
                 id='switch'/>

          </li>
          <li><img class="image" src="../../static/images/next_listen_ico.png"/></li>
          <li><img class="image" :src="isCollect == 1 ? 'https://qinqinyx.cn/site/static/images/collection_true.png' :
              'https://qinqinyx.cn/site/static/images/collection_false.png'" @click="collect"/></li>
        </ul>
        <!--</div>-->
        <ul class="btn2">
          <li style="width: 12rem;">
            <div style="height: 2rem;border-radius: 2em;background-color: #0b76ac;
                color: #ffffff;text-align: center;line-height: 2rem;">
              <span>我来讲</span>
            </div>
          </li>
          <li>
            <router-link :to="{path:'/criticism'}">
              <img class="image" src="../../static/images/listen_comment_ico.png" @click="criticism = true"/>
            </router-link>
            <span>{{criticismCount}}</span>
          </li>
          <li><img class="image" :src="isPressGood == 1 ? 'https://qinqinyx.cn/site/static/images/love_true.png' :
              'https://qinqinyx.cn/site/static/images/ic_event_post_item_praise_dis.png'" @click="zan"/>
            <span>{{fabulousCount}}</span>
          </li>
          <li>
            <img class="image" src="../../static/images/play_list.png" @click="visible = true"/>
            <span style="font-size: 0.1em;">历史</span>.
          </li>
        </ul>
        <div id="box-btm">
          <div style="height: 3.5em;width: 60%;float: left;overflow: hidden">
            <div style="float: left;overflow: hidden;width: 3rem;">
              <img :src="story.imageUrl" style="height: 3rem"/>
            </div>
            <div style="float: left;color: #ffffff;padding: 5px;">
              <h3>{{this.storys.active == 1?story.songName:story.storyName}}</h3>
              <span>{{story.heardCount}}人阅读</span>
            </div>
          </div>

          <div style="float: right;height: 3.5em;width: 38%;">
            <label><img src="../../static/images/listen_share_ico.png"/> </label>
            <label><img src="../../static/images/listen_down_ico.png"/> </label>
          </div>

        </div>
      </div>
    </div>
    <!--历史-->
    <heard-list v-show="visible" :visible.sync="visible"></heard-list>
    <!--<criticism v-show="criticism"></criticism>-->
    <!--评论路由-->
    <router-view></router-view>
  </div>
</template>

<script>
  import heardList from './story/heardList';
  import criticism from './common/criticism';
  /*组件方式引用*/
  import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Lyric from 'lyric-parser'
  import scroll from './base/scroll'

  export default {
    name: "story",
    components: {
      'heard-list': heardList,
      swiper,
      swiperSlide,
      criticism,
      scroll,
      Lyric
    },
    data() {
      return {
        criticism: false,
        setInterval: 0,
        swiperOption: {
          autoplay: false,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        visible: false,
        story: {},
        play: false,
        interval: 0,
        currentTime: '',
        isCollect: '',
        isPressGood: '',
        fabulousCount: '',
        criticismCount: '',
        /*lyrics: [],
        currentLineNum:''*/
        lrcTimeArray: [],
        arrays: [],
        currentLyric: null,
        currentLineNum: 0,
        lyric: ''

      }
    },

    created() {

      this.$nextTick(function () {
        let _self = this;
        $.ajax({
          url: this.$route.query.url,
          data: {
            storyId: this.storys.storyId,
            userCode: this.global.userCode,
            songId: this.storys.storyId
          },
          dataType: 'json',
          success: function (result) {
            //_self.$router.push({name: 'story.js', params: {result: result.data}});
            _self.storys.story = result.data;
            _self.story = result.data;
            _self.isCollect = result.data.isCollect;
            _self.isPressGood = result.data.isPressGood;
            _self.fabulousCount = result.data.fabulousCount;
            _self.criticismCount = result.data.criticismCount;

            if (_self.storys.active !== 1) {
              let text = _self.story.storyText.storyText.trim().replace(/\r\n/g, "</p><p>");
              let str = "<p>" + text + "</p>";
              $("article").html(str);

            } else {
              //格式化歌词
              this.lyrics = result.data.songText.split("&&");
              let clause;
              let lyricStr = '';
              for (var i = 0; i < this.lyrics.length; i++) {
                lyricStr += this.lyrics[i] + "\n";
              }

              _self.currentLyric = new Lyric(lyricStr, _self.handleLyric);

            }
          }
        });
      })
    },
    methods: {
      togglePlaying() {
        // 停止/播放当前歌词播放
        if (this.currentLyric) {
          console.log("togglePlaying  "+this.currentLyric)
          this.currentLyric.togglePlay();
        }
        this.play = !this.play;
      },
      handleLyric({lineNum, txt}) {
        let _self = this;
        console.log(lineNum);
        this.currentLineNum = lineNum;
        // 若当前行大于5,开始滚动,以保歌词显示于中间位置
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5];
          console.log("lineEl" + lineEl);
          // 结合better-scroll，滚动歌词
          _self.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          _self.$refs.lyricList.scrollTo(0, 0, 1000);
        }
      },

      showCriticism: function () {
        this.$router.push({name: 'criticism', params: {lsh: this.story.lsh}})
      },
      zan: function () {
        this.isPressGood = this.isPressGood == 1 ? 0 : 1;
        if (this.isPressGood == 1) {
          this.fabulousCount = parseInt(this.fabulousCount) + 1;
        } else {
          this.fabulousCount = parseInt(this.fabulousCount) - 1;
        }
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/story/storyGood",
          data: {
            "userCode": this.global.userCode,
            "isPress": this.isPressGood,
            "storyId": this.story.lsh
          },
          dataType: 'json',
          success: function (result) {
            /*alert(JSON.stringify(result));*/
          }
        });
      },
      collect: function () {
        this.isCollect = this.isCollect == 1 ? 0 : 1;
        $.ajax({
          url: "https://qinqinyx.cn/timeLang/story/storyCollect",
          data: {
            "userCode": this.global.userCode,
            "isPress": this.isCollect,
            "storyId": this.story.lsh
          },
          dataType: 'json',
          success: function (result) {
            /* alert(JSON.stringify(result));*/
          }
        });
      },
      datetimeFormatUtil: function (longTypeDate) {
        let dateTypeDate = "";
        let date = new Date();
        date.setTime(longTypeDate);
        dateTypeDate += this.getMinutes(date);		//分
        dateTypeDate += ":" + this.getSeconds(date);		//分
        return dateTypeDate;
      },
      //分
      getMinutes: function (date) {
        var minute = "";
        minute = date.getMinutes();
        if (minute < 10) {
          minute = "0" + minute;
        }
        return minute;
      },
      //秒
      getSeconds: function (date) {
        var second = "";
        second = date.getSeconds();
        if (second < 10) {
          second = "0" + second;
        }
        return second;
      },

      validateTime: function (number) {
        var value = (number > 10 ? number + '' : '0' + number).substring(0, 2);
        return isNaN(value) ? '00' : value;
      },
      //更新进度条
      updateProcess: function () {
        /*var audio = this.$refs.audio;*/
        var audio = document.getElementById("player");
        var buffer = audio.buffered;
        var bufferTime = buffer.length > 0 ? buffer.end(buffer.length - 1) : 0;
        var duration = audio.duration;
        var currentTime = audio.currentTime;
        $("#endTime").text(this.validateTime(duration / 60) + ":" + this.validateTime(duration % 60));
        $(".rdy").css("width", bufferTime / duration * 100 + '%');
        //alert(bufferTime / duration * 100 + '%');
        $(".cur").css("width", currentTime / duration * 100 + '%');
        //$("#curTime").text(this.validateTime(currentTime / 60) + ":" + this.validateTime(currentTime % 60));

        this.currentTime = this.validateTime(currentTime / 60) + ":" + this.validateTime(currentTime % 60);
        console.log("this.currentTime   " + this.currentTime)
      },

    },
    watch: {
      /* 播放按钮点击 */

      play(value, oldValue) {
        if (value) {
          this.$refs.audio.play();
          this.interval = 0
        } else {
          this.$refs.audio.pause();
          this.interval = 1;
        }
        let _self = this;
        if (!value) {
          clearInterval(_self.setInterval);
        }

        this.setInterval = setInterval(function () {

          if (value) {
            _self.updateProcess();
            if (_self.$refs.audio.paused) {
              _self.play = false;
            }
          } else {
            console.log(value);
            clearInterval(_self.setInterval);
          }
        }, 1000);
      },

    },
    beforeRouteUpdate(to,from,next){
      this.play = false;
      clearInterval(this.setInterval);
      this.currentLyric.stop();
      next();
    },

    beforeRouteLeave(to, from, next) {

      this.play = false;
      clearInterval(this.setInterval);

      next();
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    font-size: 100%;
  }

  .story-box {
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .upper-part {
    width: 100%;
    height: 60%;
    color: #ffffff;
    overflow: auto
  }

  .article1 {
    text-indent: 2em;
    line-height: 2em;
    padding: 1rem 3rem 0 3rem;
  }

  .article2 {
    text-align: center;
    line-height: 2em;
    padding: 1rem 3rem 0 3rem;
  }

  .lower-part {
    width: 100%;
    height: 40%;
    position: fixed;
    bottom: 0;
  }

  .process .process-bar {
    position: relative;
    width: 98%;
    top: 50%;
    background-color: #615D5C;
  }

  .process-bar .rdy {
    background-color: #B1ADAC;
    height: 2px;

  }

  .process-bar .cur {
    width: 0;
    background-color: #4cb1ff;
    height: 2px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .cur .process-btn {
    cursor: pointer;
    background-image: url(../assets/images/process-btn.png);
    background-size: cover;
    position: absolute;
    top: -4px;
    right: -5px;
    width: 10px;
    height: 10px;
    margin-left: -11px;
  }

  .play-btn {
    float: left;
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    width: 18rem;
  }

  .play-btn li {
    /*width: 13%;*/
    width: 2rem;
    display: block;
    float: left;
    margin: 0.6rem;
    margin-top: 1rem;
  }

  #audio-btn {
    width: 4rem;
    margin-top: 0;
  }

  .btn2 {
    width: 95%;
    display: block;
    position: absolute;
    left: 50%;
    margin-top: 5rem;
    transform: translate(-50%, 0);
  }

  .btn2 li {
    width: 2rem;
    height: 2rem;
    float: left;
    display: block;
    float: left;
    padding: 0.3rem;
    margin: 0 0.4rem 0 0.4rem;
    color: #ffffff;
    text-align: center;
    font-size: 0.5em;
  }

  .btn2 li img {
    height: 1rem;
  }

  .image {
    width: 100%;

  }

  #box-btm {
    width: 100%;
    height: 3.5em;
    position: absolute;
    bottom: 0;
    margin: 0.5em;
  }

  #box-btm label {
    width: 2em;
    margin: 1em;
  }

  /* 歌词部分 */
  .lyric-wrapper {
    width: 100%;
    margin: 0 auto;
    overflow: auto;
    text-align: center;
  }

  .text {
    line-height: 3em;
    color: hsla(0, 0%, 98%, 0.5);
    font-size: 1em;
    overflow: hidden;
  }

  .current {
    color: #ff8ebd;
    font-size: 1.5em;
  }

  .middle-r {
    width: 100%;
    height: 100%;
    float: left;
    /*transform: translate3d(2em, 0, 0);*/
    position: absolute;
    top: 0;
  }

  .middleTime {
    transition: transform 0.5s;
  }
</style>
