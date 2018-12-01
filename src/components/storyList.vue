<template xmlns="http://www.w3.org/1999/html">
  <div style="width: 100%;height: 100%;background-color: white">
    <div v-for="(item,index) in storyList">
      <div class="card-box"
           :id="'card'+index" :style="'z-index:'+storyList.length-index">
        <div class="card" @touchstart="down('card'+index)"
             @touchmove="move('card'+index)"
             @touchend="end('card'+index)" @click="showStory(item.lsh)">

          <div class="card-header">
            <div class="card-avatar">
              <img :src="item.imageUrl" style="width: 100%;height: 100%;"/>
              <div class="card-media">
                <p> {{item.storyName}} 简介<br/>
                  {{item.introduction}}</p>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="author-image">
              <img src="../assets/images/test.jpg" style="width: 100%;height: 100%;">
            </div>
            <div class="author-info">
              <div class="author-info2">
                <span>故事名：{{active === 1?item.songName:item.storyName}}</span><br>
                <span>创作者：{{item.author}}</span><br>
                <span>时长：5：06</span>
              </div>
            </div>
            <div class="zan-num" style="float: right;text-align: center;padding-top: 10px;">
              <span>{{item.fabulousCount}}</span><br>
              <span>被点赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "storyList",
    data() {
      return {
        active:this.storys.active,
        flags: false,
        position: {x: 0, y: 0},
        nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
        clientWidth: $(document).width(),
        clientHeight: $(document).height(),
        storyList: [],
        /*typeId: this.$route.params.typeId,*/
        /*active: this.$route.params.active,*/
        tabs: {
          '0': 'https://qinqinyx.cn/timeLang/story/storyInfo',
          '1': 'https://qinqinyx.cn/timeLang/childrenSong/childrenSongList',
          '2': 'https://qinqinyx.cn/timeLang/poem/poemInfo',
        },
        story: {
          '0': 'https://qinqinyx.cn/timeLang/story/showStory',
          '1': 'https://qinqinyx.cn/timeLang/childrenSong/querySongById',
          '2': 'https://qinqinyx.cn/timeLang/poem/showPoem',
        },
        curPage: 1,
        pageRows: 5,
        rows: 0,
      }
    },
    created() {
      this.$nextTick(function () {
        let _self = this;
        let url = this.tabs[this.storys.active];
        this.curPage = 1;
        $.ajax({
          url: url,
          data: {
            "typeId": this.storys.typeId,
            "curPage": this.curPage,
            "pageRows": this.pageRows,
            "userCode": this.global.userCode
          },
          dataType: 'json',
          success: function (result) {

            _self.storyList = result.data.pageResult;
            _self.rows = _self.storyList.length;
          }
        });
      });
    },
    methods: {
      findStory: function () {
        let _self = this;
        let url = this.tabs[this.storys.active];
        this.curPage = this.curPage + 1;
        $.ajax({
          url: url,
          data: {
            "typeId": this.storys.typeId,
            "curPage": this.curPage,
            "pageRows": this.pageRows,
            "userCode": this.global.userCode
          },
          dataType: 'json',
          success: function (result) {

            _self.storyList = _self.storyList.concat(result.data.pageResult);
            _self.rows = _self.storyList.length;
          }
        });
      },
      showStory: function (lsh) {
        let _self = this;
        this.storys.storyId = lsh;
        let url = this.story[this.storys.active];
        this.$router.push({path: '/story', query: {url: url}});
        /*$.ajax({
          url: url,
          data: {
            storyId:lsh,
            userCode:_self.global.userCode
          },
          dataType: 'json',
          success: function (result) {
            alert("111111111"+JSON.stringify(result));
            _self.$router.push({name:'story',params:{result:result.data}});
          }
        });*/
      },
      // 实现移动端拖拽
      down(id) {
        //let moveDiv = document.getElementById('moveDiv');
        //let id = e.target.id;
        let moveDiv = document.getElementById(id);
        this.flags = true;
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;

        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;

      },
      move(id) {
        //let id = e.target.id;
        let moveDiv = document.getElementById(id);
        if (this.flags) {
          let touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          this.ny = touch.clientY - this.position.y;
          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;
          moveDiv.style.left = this.xPum + "px";
          moveDiv.style.top = this.yPum + "px";
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          /*document.addEventListener("touchmove", function () {
            event.preventDefault();
          }, false);*/
        }
      },
      //鼠标释放时候的函数
      end(id) {
        //let id = e.target.id;
        let moveDiv = document.getElementById(id);
        /*        moveDiv.style.left = "12%";
                moveDiv.style.top = "15%";*/
        /*let clientWidth = $(document).width();
        let clientHeight = $(document).height();*/
        let _self = this;
        let left = parseInt(moveDiv.style.left);
        let width = $('#' + id).width();
        let top = parseInt(moveDiv.style.top);
        let height = $('#' + id).height();
        if (left < 0 || left + width > this.clientWidth) {
          /*moveDiv.remove();*/
          this.rows = this.rows - 1;
          this.storyList.pop();
          if (this.storyList.length === 0) {
            _self.findStory();
          }
          return;
        } else if (top < 0 || top + height > this.clientHeight) {
          /*moveDiv.remove();*/
          this.storyList.pop();
          this.rows = this.rows - 1;

          if (this.storyList.length === 0) {
            _self.findStory();
          }
          return;
        } else {
          moveDiv.style.left = "12%";
          moveDiv.style.top = "15%";
        }
      },
    },
    watch: {
      rows(value, oldValue) {
        if (value === 1) {

        }
      }
    },


    directives: {}
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    font-size: 100%;
  }

  .card-box {
    position: absolute;
    top: 15%;
    width: 76%;
    height: 65%;
    left: 12%;
    display: inline-block;

  }

  .card {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #c1c1c1;
    border-radius: 1em;
    background-color: #ffffff;
    display: block;
  }

  .card-header {
    width: 100%;
    height: 70%;
    display: block;
  }

  .card-avatar {
    width: 86%;
    height: 93%;
    margin: 7% 0 0 7%;
    display: block;
  }

  .card-media {
    width: 86%;
    height: 20%;
    background-color: rgba(0, 0, 0, 0.62);
    position: absolute;
    top: 50%;
    left: 7%;
    overflow: hidden;
    color: #ffffff;
    font-size: 1em;
  }

  .card-footer {
    height: 30%;
    padding: 0 7% 0 7%;
    margin-top: 1em;
    font-size: 0.8em;
  }

  /*.card-footer figuer{
    border: 1px solid #000;
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding-bottom: 100%; !* 关键就在这里 *!

    background-size: cover;
  }*/
  .author-image {
    position: relative;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    float: left;
  }

  .author-info {
    float: left;
    height: 5rem;
    padding: 5px;
    /*font-size: 0.8em;*/
    width: 8rem;
    overflow: hidden;
  }
  .author-info2{
    height: 5rem;
    width: 15rem;
  }
</style>
