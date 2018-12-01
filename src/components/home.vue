<template>
  <div id="all">
    <div id="content">
      <router-view></router-view>
    </div>
    <div>
      <ul class="nav">
        <li v-for="(item,index) in arr">
          <router-link :to="{path:item.link}">
            <i class="icon" :class="index===page?item.iconClassActive:item.iconClass"></i>
            <!--<img :src="item.icon"/>-->
            <span :class="{active:index===page}">{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
      <!--<mu-container>
        <mu-bottom-nav>
          <mu-bottom-nav-item title="Recents" icon="restore" class=".icon_index"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="Favorites" icon="favorite" class=""></mu-bottom-nav-item>
          <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-container>-->
    </div>
  </div>
</template>

<script>

  export default {
    name: "home",
    props: ['page'],
    data() {
      return {
        userCode:this.$route.query.userCode,
        groupId:this.$route.query.groupId,
        show: false,
        arrowLeft: 0,
        x: 0,
        y: 0,
        bottomNav: 'movies',
        arr: [
          {
            title: "首页",
            url: "Financing",
            iconClass: "icon_index",
            iconClassActive: "icon_indexActive",
            icon: '../assets/images/home_1.png',
            link: '/home/timeAxis',
            tag:0
          }, {
            title: "创作",
            url: "ProductList",
            iconClass: "icon_create",
            iconClassActive: "icon_createActive",
            icon: '../assets/images/production_ico_false.png',
            link: '/home/storyMenu',
            tag:1
          }, {
            title: "发现",
            url: "Personal",
            iconClass: "icon_find",
            iconClassActive: "icon_findActive",
            icon: '../assets/images/home_2.png',
            link: '/home/timeAxis',
            tag:2
          }, {
            title: "我的",
            url: "Personal",
            iconClass: "icon_user",
            iconClassActive: "icon_userActive",
            icon: '../assets/images/home_3.png',
            link: '/home/timeAxis',
            tag:3
          }
        ],
      }
    },
    methods: {
      tag: function (tag) {
        this.global.tag = tag;
      }
    },
    created() {
      /*this.$nextTick(function () {
        this.$router.push({path:'/home/timeAxis',query:{userCode:this.userCode,groupId:this.groupId}});
      })*/
    }
  }
</script>

<style scoped="less">
  * {
    margin: 0;
    padding: 0;
  }

  #content {
    width: 100%;
    height: 90%;
    /*overflow: auto;*/
    position: absolute;
  }

  #footer {
  }

  .nav {
    left: 0;
    width: 100%;
    height: 10%;
    background: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #dcdcdc;
    padding: 10px 0 0 0;
    list-style-type: none;

  }

  .nav li {
    width: 25%;
    float: left;
    text-align: center;
    font-size: .14rem;
    list-style: none;
  }

  .nav li .icon {
    display: block;
    /*height: .44rem;*/
    width: 30%;
    height: 0;
    padding-bottom: 30%;
    margin: 0 auto;
  }

  .nav li .icon_index {
    background: url("../assets/images/home_1.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li .icon_indexActive {
    background: url("../assets/images/home_1.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li .icon_create {
    background: url("../assets/images/production_ico_false.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li .icon_createActive {
    background: url("../assets/images/production_ico_false.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;

  }
  .nav li .icon_find {
    background: url("../assets/images/home_2.png") no-repeat center;
   /* background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li .icon_findActive {
    background: url("../assets/images/home_2.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li .icon_user {
    background: url("../assets/images/home_3.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li .icon_userActive {
    background: url("../assets/images/home_3.png") no-repeat center;
    /*background-size: .150rem .80rem;*/
    background-size: 100% 100%;
  }

  .nav li span {
    display: block;
    color: #747682;
    padding-top: .1rem;
  }

  .nav li span.active {
    color: #D2A330;
  }
</style>
