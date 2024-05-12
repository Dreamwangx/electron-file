<script setup lang="ts">
const { ipcRenderer } = require('electron')
const maximize = ref(false)
ipcRenderer.on('maximize-status', (event, isMaximized) => {
  console.log('maximize-status', isMaximized)
  maximize.value = !!isMaximized
})
</script>

<template>
  <main class="app" :class="maximize ? 'fullScreen' : ''">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.app {
  height: calc(100% - 6px);
  width: calc(100% - 6px);
  margin: 3px;
  position: relative;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.12);
  &.fullScreen {
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0px;
  }
}
</style>
