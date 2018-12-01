<template>
  <div class="v-popover-tag" @click.stop="pop($event)">
    <slot></slot>
  </div>
  <div class="v-popover-wrap" :style="{left: x + 'px', top: y + 'px', visibility: show ? 'visible' : 'hidden'}" v-el:pop>
    <div class="v-popover-box">
      <div class="v-popover-title">{{title}}</div>
      <div class="v-popover-content">{{content}}</div>
      <div :class="['v-popover-arrow', placement == 'top' ? 'v-popover-arrow-top' : 'v-popover-arrow-bottom']" :style="{left: arrowLeft + 'px'}"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "selectTip",
      methods:{
        pop(e) {
          if(this.show){
            this.show = false
            return
          }
          var target = e.target
          this.arrowLeft = target.offsetWidth / 2
          this.x = target.offsetLeft
          if(this.placement == 'top'){
            this.y = target.offsetTop - this.$els['pop'].offsetHeight - 3
          }else {
            this.y = target.offsetTop + target.offsetHeight + 3
          }
          this.show = true
        }
      }

    }
</script>

<style scoped>
  .v-popover-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    margin-left: -5px;
  }
  .v-popover-arrow :after{
    content: " ";
    margin-left: -4px;
    border: 4px solid transparent;
    position: absolute;
    width: 0;
    height: 0;
  }
  .v-popover-arrow-top{
    border-bottom-width: 0;
    border-top-color: #d9d9d9;
    bottom: -5px;
  .v-popover-arrow-top :after{
    border-top-color: #fff;
    bottom: -3px;
  }
</style>
