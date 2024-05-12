<template>
  <Header></Header>
  <div class="content">
    <div class="menus">
      <Menus></Menus>
    </div>
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from './header/Index.vue'
import Menus from './menus/Index.vue'
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
}
.menus {
  height: 100%;
  width: 200px;
}
.main-content {
  height: 100%;
  width: calc(100% - 200px);
}
</style>
