<template>
  <div id="pop_content">
    <div class="v-popover-tag" @click.stop="pop($event)">
      <slot></slot>
    </div>
    <div id="mask" v-if="show" @click.stop="pop($event)"></div>
    <div class="v-popover-wrap" :style="{left: x + 'px', top: y + 'px', visibility: show ? 'visible' : 'hidden'}"
         ref="pop">
      <div class="v-popover-box" :style="{width: width + 'px'}">
        <!--<div class="v-popover-title">{{title}}</div>-->
        <div class="v-popover-content" @click="authority">{{content_1}}</div>
        <div class="v-popover-content" @click="delDialog">{{content_2}}</div>
        <div :class="['v-popover-arrow', placement === 'top' ? 'v-popover-arrow-top' : 'v-popover-arrow-bottom']"
             :style="{left: arrowLeft + 'px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "popover",
    props: {
      title: {
        type: String,
        default: '标题'
      },
      content_1: {
        type: String,
        default: '谁可以看'
      },
      content_2: {
        type: String,
        default: '删除'
      },
      placement: {
        type: String,
        default: 'top'
      },
      lsh: '',
      open: '',
      userCode: ''
    },
    data() {
      return {
        show: false,
        arrowLeft: 0,
        x: 0,
        y: 0,
        width: 250
      }
    },
    methods: {
      pop(e) {
        if (this.show) {
          this.show = false;
          return
        }
        //this.width = $(document).offsetWidth / 3;
        let target = e.target;
        this.arrowLeft = /*target.offsetWidth / 2 +*/ this.width - (target.offsetWidth / 2);
        this.x = target.offsetLeft - this.width + target.offsetWidth;
        let clientHeight = document.body.clientHeight;
        if (this.placement === 'top') {
          this.y = target.offsetTop - clientHeight - this.$refs['pop'].offsetHeight - 3
        } else {
          this.y = target.offsetTop -clientHeight + target.offsetHeight + 3
        }
        this.show = true
      }
      ,
      delDialog: function () {
        if (window.confirm('你确定要删除吗？')) {
          $.ajax({
            url: "https://qinqinyx.cn/timeLang/timeAxisDel",
            data: {
              "timeAxisId": this.lsh,
              "userCode": this.userCode
            },
            success: function (result) {
              location.reload();
            }
          });
          return true;
        } else {
          close();
          return false;
        }
      },
      authority: function () {
        this.$router.push({name: "spaceAuthority", params: {lsh: this.lsh, open: this.open, userCode: this.userCode}});
      }
    }
  }
</script>
<style lang="scss">
  //popover
  .v-popover-tag {
    display: inline-block;
  }

  .v-popover-wrap {
    position: absolute;
    z-index: 1;
  }

  .v-popover-box {
    box-sizing: border-box;
    //width: 177px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-shadow: 0 1px 6px hsla(0, 0%, 39%, .2);
    position: relative;
  }

  /*.v-popover-title{
    padding: 0 16px;
    line-height: 32px;
    height: 32px;
    border-bottom: 1px solid #e9e9e9;
    color: #666;
  }*/
  .v-popover-content {
    padding: 8px 16px;
    color: #666;
    word-break: break-all;
    text-align: center;
  }

  .v-popover-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    // left: 50%;
    margin-left: -8px;
    &:after {
      content: " ";
      margin-left: -8px;
      border: 8px solid transparent;
      position: absolute;
      width: 0;
      height: 0;
    }
  }

  .v-popover-arrow-top {
    border-bottom-width: 0;
    border-top-color: #d9d9d9;
    bottom: -8px;
    &:after {
      border-top-color: #fff;
      bottom: -8px;
    }
  }

  .v-popover-arrow-bottom {
    border-top-width: 0;
    border-bottom-color: #d9d9d9;
    top: -8px;
    &:after {
      border-bottom-color: #fff;
      top: -8px;
    }
  }

  #mask {
    height: 100%;
    width: 100%;
    opacity: 0.6;
    background: rgba(0, 0, 0, 0.5);;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;

  }
</style>
