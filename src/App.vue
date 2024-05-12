<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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
  console.log(isMaximized)
  maximizeIcon.value = isMaximized ? '❐' : '□'
})

const startDrag = (event: MouseEvent) => {
  if (event.button === 0) {
    ipcRenderer.send('start-drag')
  }
}

const dragWindow = () => {
  ipcRenderer.send('drag-window')
}

const endDrag = () => {
  ipcRenderer.send('end-drag')
}
</script>

<template>
  <main class="app">
    <div class="custom-title-bar" @mousedown="startDrag" @mouseup="endDrag" @mousemove="dragWindow">
      <!-- 自定义标题栏内容 -->
    </div>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/123.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did22 it!" />
        <nav>
          <RouterLink to="/">Home2</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <div class="controls">
      <el-button type="text" class="control-button" @click="minimizeWindow">-</el-button>
      <el-button type="text" class="control-button" @click="toggleMaximize">{{
        maximizeIcon
      }}</el-button>
      <el-button type="text" class="control-button" @click="closeWindow">
        <el-icon><i-ep-CloseBold /></el-icon
      ></el-button>
    </div>
    <RouterView />
  </main>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.controls {
  position: absolute;
  top: 10px;
  right: 10px;
}
.control-button {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  cursor: pointer;
}

.custom-title-bar {
  -webkit-app-region: drag;
  height: 20px;
  width: 100%;
  background-color: #ccc;
  /* 样式 */
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
