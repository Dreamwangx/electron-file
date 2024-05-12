<script setup lang="ts">
const maximizeIcon = ref('□')
const { ipcRenderer } = require('electron')
//'❐' : '□'
const minimizeWindow = () => {
  ipcRenderer.send('minimize-window')
}

const toggleMaximize = () => {
  ipcRenderer.send('toggle-maximize')
}

const closeWindow = () => {
  ipcRenderer.send('close-window')
}

ipcRenderer.on('maximize-status', (event, isMaximized) => {
  console.log('maximize-status', isMaximized)
  maximizeIcon.value = isMaximized ? '❐' : '□'
})
</script>

<template>
  <div class="controls">
    <el-button type="text" class="control-button" @click="minimizeWindow">-</el-button>
    <el-button type="text" class="control-button" @click="toggleMaximize">
      {{ maximizeIcon }}
    </el-button>
    <el-button type="text" class="control-button" @click="closeWindow">
      <el-icon><i-ep-CloseBold /></el-icon
    ></el-button>
  </div>
</template>

<style scoped>
.controls {
  display: flex-inline;
}
.control-button {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
