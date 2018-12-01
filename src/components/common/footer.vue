<template>
    <div>
      <ul class="nav">
        <li v-for="(item,index) in arr">
          <router-link :to="{name: item.link}" >
            <!--<i class="icon" :class="index===page?item.iconClassActive:item.iconClass"></i>-->
            <img src="../../assets/images/check_true.png"/>
            <span :class="{active:index===page}">{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>
  export default {
    name: "footer",
    props: ['page'],
    data() {
      return {
        show: false,
        arrowLeft: 0,
        x: 0,
        y: 0,
        arr: [
          {
            title: "首页",
            url: "Financing",
            iconClass: "icon_index",
            iconClassActive: "icon_indexActive",
            icon: '../../assets/images/home_1.png',
            link:'timeAxis'
          }, {
            title: "创作",
            url: "ProductList",
            iconClass: "icon_product",
            iconClassActive: "icon_productActive",
            icon: '../../assets/images/production_ico_false.png',
            link:'storyMenu'
          }, {
            title: "发现",
            url: "Personal",
            iconClass: "icon_user",
            iconClassActive: "icon_userActive",
            icon: '../../assets/images/home_2.png',
            link:'timeAxis'
          }, {
            title: "我的",
            url: "Personal",
            iconClass: "icon_user",
            iconClassActive: "icon_userActive",
            icon: '../../assets/images/home_3.png',
            link:'timeAxis'
          }
        ],
      }
    },
    methods: {
    },
  }
</script>

<style scoped="less">
  * {
    margin: 0;
    padding: 0;
  }
  #content{
    width: 100%;
    height: 90%;
    overflow: auto;
    position: absolute;
  }
  #footer {
  }

  .nav {
    left: 0;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #dcdcdc;
    padding: .12rem 0;
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
    height: .44rem;
    width: 100%;
    margin: 0 auto;
  }

  .nav li .icon_index {
    background: url("../../assets/images/check_true.png") no-repeat center;
    background-size: .41rem .4rem;
  }

  .nav li .icon_indexActive {
    background: url("../../assets/images/check_true.png") no-repeat center;
    background-size: .41rem .4rem;
  }

  .nav li .icon_product {
    background: url("../../assets/images/check_true.png") no-repeat center;
    background-size: .32rem .42rem;
  }

  .nav li .icon_productActive {
    background: url("../../assets/images/check_true.png") no-repeat center;
    background-size: .32rem .42rem;
  }

  .nav li .icon_user {
    background: url("../../assets/images/check_true.png") no-repeat center;
    background-size: .44rem .44rem;
  }

  .nav li .icon_userActive {
    background: url("../../assets/images/check_true.png") no-repeat center;
    background-size: .44rem .44rem;
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


