;(function (Vue, window) {
  var template = `
  <div class="v-popover-tag" @click.stop="pop($event)">
    <slot></slot>
  </div>
  <div class="v-popover-wrap" :style="{left: x + 'px', top: y + 'px', visibility: showPop ? 'visible' : 'hidden'}" ref="pop">
    <div class="v-popover-box">
      <div class="v-popover-title">{{title}}</div>
      <div class="v-popover-content">{{content}}</div>
      <div :class="['v-popover-arrow', placement === 'top' ? 'v-popover-arrow-top' : 'v-popover-arrow-bottom']" :style="{left: arrowLeft + 'px'}"></div>
    </div>
  </div>`;

  var popover = Vue.extend({
    template,
    props: {
      title: {
        type: String,
        default: '标题'
      },
      content: {
        type: String,
        default: '内容'
      },
      placement: {
        type: String,
        default: 'top'
      }
    },
    data() {
      return {
        showPop: false,
        arrowLeft: 0,
        x: 0,
        y: 0
      }
    },
    methods: {
      pop(e) {
        if(this.showPop){
          this.showPop = false;
          return
        }
        var target = e.target;
        this.arrowLeft = target.offsetWidth / 2;
        this.x = target.offsetLeft;
        if(this.placement === 'top'){
          //alert(this.$refs.pop.offsetHeight);
          this.y = 20;/*target.offsetTop - $("#v-popover-wrap").offsetHeight - 3;*/
           // alert($("#v-popover-wrap").offsetHeight);
        }else {
          this.y = target.offsetTop + target.offsetHeight + 3
        }
        this.showPop = true;
        alert(this.showPop)
      }
    }
  });

  components.popover = popover
})(Vue, function () {
  window.components = window.components ? window.components : {};
  return window.components
}());
