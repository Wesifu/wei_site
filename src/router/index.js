import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import timeAxis from '@/components/timeAxis'
import space_main from '@/components/space_main'
import groupInfo from '@/components/groupInfo'
import login from '@/components/login'
import registerUser from '@/components/registerUser'
import choicePage from '@/components/choicePage'
import home from '@/components/home'
import footer from '@/components/common/footer'
import spaceAuthority from '@/components/spaceAuthority'
import uploadPage from '@/components/uploadPage'
import storyMenu from '@/components/storyMenu'
import storyList from '@/components/storyList'
import story from '@/components/story'
import criticism from '@/components/common/criticism'

Vue.use(Router);

export default new Router({

 /* mode: 'history', // 路由模式,此处为history模式,需修改nginx配置文件
  base: '/',*/
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    /*{
      path: '/footer',
      name:footer,
      component:footer
    },*/
     {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path:'/home/',
      component: home,
      children:[
        {
          path:'timeAxis',
          component:timeAxis
        },
        {
          path:'storyMenu',
          name:"storyMenu",
          component:storyMenu
        },
      ]
    },
    {
      path:'/story',
      component: story,
      name:story,
      children:[
        {
          path:'/criticism',
          name:"criticism",
          component:criticism
        },
      ]
    },
    {
      name:"groupInfo",
      path:'/groupInfo',
      component:groupInfo
    },
    {
      path:'/registerUser',
      name:"registerUser",
      component:registerUser
    },
    {
      path:'/choicePage',
      name:"choicePage",
      component:choicePage
    },
    {
      path:'/spaceAuthority',
      name:"spaceAuthority",
      component:spaceAuthority
    },
    {
      path:'/uploadPage',
      name:"uploadPage",
      component:uploadPage
    },
    {
      path:'/storyList',
      name:"storyList",
      component:storyList
    },
    /*{
      path:'/story',
      name:"story",
      component:story
    },*/


    /*{
      path: '/home',
      name: 'home',
      components:{
        app:home
      }
    },
     {
      path: '/registerUser',
      name: 'registerUser',
      component: registerUser
    },
    {
      path:'/timeAxis',
      name: 'timeAxis',
      component: timeAxis
    },
    {
      path:'/choicePage',
      name: 'choicePage',
      component: choicePage
    },
    {
      path:'/groupInfo',
      name: 'groupInfo',
      components:{
        home:groupInfo
      }
    },*/
    /*{
      path:'',
      redirect:"/home"
    },*/

  ]
})
