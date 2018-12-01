<template xmlns="http://www.w3.org/1999/html">
  <transition @before-enter="beforeEnter" @after-enter="afterEnter">
    <div style="width: 100%;height: 100%;position: fixed;">
  <div id="heard-box">
    <div id="heard-head">
      <div style="float: left;width: 100%;display: block;position: absolute;bottom: 0;">
      <label style="width: 75%;margin-left: 1rem;">播放列表</label>
      <label style="left: 78%;width: 2rem;">收藏</label>
      <label style="right: 1rem;"><img style="width:1.5em" src="../../assets/images/popup_del_ico.png" /> </label>
      </div>
    </div>
    <ul id="heard-ul">
      <li v-for="(item,index) in heardList" :ref="'item_'+item.lsh">
        <label style="line-height: 3.5rem;">《{{active === 1?item.songName:item.storyName}}》-- {{item.author}}</label>
        <label style="left: 78%;line-height: 4rem;width: 1.5rem;height: 1.5rem;">
          <img style="width: 1.5rem;" :src="item.isCollect == 0?'https://qinqinyx.cn/site/static/images/collection_false.png':
            'https://qinqinyx.cn/site/static/images/collection_true.png'" @click="collect(item.lsh,item.isCollect,index )"/>
        </label>
        <label style="right: 1rem;line-height: 4rem;">
          <img style="width: 1.5em;" src="../../assets/images/popup_del_x.png" @click="deleteHeard(item.lsh,index)"/> </label>
      </li>
    </ul>
    <div id="heard-foot">
      <button @click="changeVisible">关闭</button>
    </div>
  </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: "heardList",
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active:this.storys.active,
        heardList: [],
        curPage:1,
        pageRows:10,
        bool:true,
        heard: {
          '0': 'https://qinqinyx.cn/timeLang/story/showHeardStory',
          '1': 'https://qinqinyx.cn/timeLang/childrenSong/showHeardChildrenSong',
          '2': 'https://qinqinyx.cn/timeLang/poem/showHeardPoem',
        },
        collects: {
          '0': 'https://qinqinyx.cn/timeLang/story/storyCollect',
          '1': 'https://qinqinyx.cn/timeLang/childrenSong/childrenSongCollect',
          '2': 'https://qinqinyx.cn/timeLang/poem/peomCollect',
        },
        delete:{
          '0': 'https://qinqinyx.cn/timeLang/story/deleteHeardStory',
          '1': 'https://qinqinyx.cn/timeLang/childrenSong/deleteHeardChildrenSong',
          '2': 'https://qinqinyx.cn/timeLang/poem/deleteHeardPoem',
        }
      }
    },
    created() {
      this.curPage = 1;
      this.updateData();
    },
    mounted(){
        document.getElementById("heard-ul").addEventListener('scroll', this.handleScroll, true);
    },
    watch:{
      bool(value,oldValue){
        if(!value){
          document.getElementById("heard-ul").removeEventListener('scroll', this.handleScroll, true);
        }
      }
    },
    methods: {
      updateData:function(){
        let _self = this;
        let url = this.heard[this.storys.active];
        $.ajax({
          url: url,
          data: {
            "userCode": this.global.userCode,
            "curPage": this.curPage,
            "pageRows": this.pageRows
          },
          dataType: 'json',
          success: function (result) {

            let data = [];
            data = result.data.pageResult;
            if(data.length !== 0) {
              _self.heardList = _self.heardList.concat(data);
            }else{
              _self.bool = false;
            }
          }
        });
      },
      handleScroll: function(){

        let scrollTop = document.getElementById("heard-ul").scrollTop;
        let clientHeight = document.getElementById("heard-box").offsetHeight;
        let scrollHeight = document.getElementById("heard-ul").scrollHeight;
        console.log("clientHeight",clientHeight);
        console.log("scrollTop",scrollTop);
        console.log("scrollHeight",scrollHeight);
        if(clientHeight + scrollTop >= scrollHeight-10){
          this.updateData();
          this.curPage += 1;
        }
      },
      collect: function (lsh,isCollect,index) {
        isCollect = isCollect === 1 ? 0 : 1;
        this.heardList[index].isCollect = isCollect;
        let url = this.collects[this.storys.active];
        $.ajax({
          url: url,
          data: {
            "userCode": this.global.userCode,
            "isPress": isCollect,
            "storyId": lsh,
            "childrenSongId": lsh
          },
          dataType: 'json',
          success: function (result) {
          }
        });
      },
      deleteHeard: function(lsh,index){
        this.heardList.splice(index,1);
        let url = this.delete[this.storys.active];
        $.ajax({
          url: url,
          data: {
            "userCode": this.global.userCode,
            "storyIds": lsh,
            childrenSongIds:lsh
          },
          dataType: 'json',
          success: function (result) {
          }
        });

      },
      changeVisible:function () {
        this.$emit('update:visible',false);
      },
      beforeEnter: function(e) {
        e.style.top = "0";
      },
      afterEnter: function(e) {
        e.style.top = "40%";
      },
      showHeard: function () {

      }
    }

  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  #heard-box {
    width: 100%;
    height: 60%;
    position: fixed;
    bottom: 0;
    border: 1px solid #bcbcbc;
    background-color: #ffffff;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
  }

  #heard-head {
    width: 100%;
    height: 15%;
    position: relative;
    top: 0;
    border-bottom: 1px solid #bcbcbc;
  }

  #heard-head label{
    display: block;
    margin-bottom: 0.5em;
    position: absolute;
    bottom: 0;
   }

  #heard-ul {
    width: 100%;
    height: 70%;
    position: relative;
    overflow: auto;
  }

  #heard-ul li {
    width: 100%;
    height: 3.5rem;
    float: left;
    list-style: none;
    border-bottom: 1px solid #bcbcbc;

  }

  #heard-ul li label{
    position: absolute;
  }
  #heard-foot {
    width: 100%;
    height: 15%;
    position: relative;
    border-top: 1px solid #bcbcbc;
  }
  #heard-foot button {
    border: none;
    width: 5rem;
    height: 3rem;
    font-size: 1rem;
    display: block;
    clear: both;
    margin: 0 auto;
    background-color: #ffffff;
  }
</style>
