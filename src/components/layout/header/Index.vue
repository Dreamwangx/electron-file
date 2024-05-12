<template>
  <div class="header">
    <div class="custom-title-bar">
      <!-- 自定义标题栏内容 -->
      <div class="left-container">
        <div class="title-bar">
          <div class="title">网易云音乐</div>
        </div>
      </div>
      <div class="right-container">
        <ElectronToolsVue />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ElectronToolsVue from './ElectronTools.vue'
</script>
<style lang="scss" scoped>
.header {
  .custom-title-bar {
    -webkit-app-region: drag;
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ea3e3e;
    /* 样式 */
    .right-container {
      -webkit-app-region: no-drag;
    }
    .left-container {
      -webkit-app-region: no-drag;
    }
  }
}
</style>
