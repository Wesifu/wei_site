<template>
  <div>
    <router-view></router-view>
  </div>

</template>
<script>

  export default {
    name: "app",
    created() {
      this.$nextTick(function () {
       this.$router.push('/login');
      })
    }
  }
</script>
