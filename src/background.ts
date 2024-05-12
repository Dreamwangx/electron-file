import { type MenuItemConstructorOptions, type MenuItem } from 'electron'
import * as path from 'path'
const { ipcMain, app, BrowserWindow, Menu, screen } = require('electron')
app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'My Electron App',
    frame: false,
    transparent: true, //透明窗口
    backgroundColor: '#00000000', //窗口底色为透明色
    icon: path.join(__dirname, '../public/favicon.ico'), // 设置窗口图标
    webPreferences: {
      nodeIntegration: true, // 可以渲染进程调用node的api,默认禁止
      contextIsolation: false, //关闭渲染进程沙箱
      webSecurity: false //关闭同源策略检测
    }
  })

  //win.webContents.openDevTools()
  if (process.argv[2]) {
    //开发环境
    mainWindow.loadURL(process.argv[2])
  } else {
    mainWindow.loadFile('index.html')
  }
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize()
  })
  // 获取当前屏幕的大小
  const mainScreen = screen.getPrimaryDisplay()
  const dimensions = mainScreen.workAreaSize
  console.log(`当前屏幕的大小为：${dimensions.width}x${dimensions.height}`)
  let windowInfo = {
    maxHeight: dimensions.height,
    maxWidth: dimensions.width,
    memoryWidth: 800,
    memoryHeight: 600,
    memoryX: (dimensions.width - 800) / 2,
    memoryY: (dimensions.height - 600) / 2
  }
  mainWindow.on('move', () => {
    //当最大化时拖动窗口,还原窗口大小
    const { x, y, width, height } = mainWindow.getBounds()

    if ((x != 0 || y != 0) && windowInfo.maxHeight == height && windowInfo.maxWidth == width) {
      mainWindow.webContents.send('maximize-status', false)
      mainWindow.setResizable(true)
      //const cursorScreenPoint = screen.getCursorScreenPoint()
      // const positionX: number = Math.round(
      //   cursorScreenPoint.x - (cursorScreenPoint.x * windowInfo.memoryWidth) / windowInfo.maxWidth
      // )
      // const positionY: number = Math.round(
      //   cursorScreenPoint.y - (cursorScreenPoint.y * windowInfo.maxHeight) / windowInfo.maxHeight
      // )
      // mainWindow.webContents.send(
      //   'maximize-status',
      //   `鼠标在屏幕上的当前位置：${positionY},
      //    ${positionX}`
      // )
      // windowInfo.memoryX = positionX
      // windowInfo.memoryY = positionY
      // mainWindow.setResizable(true)
      // mainWindow.setPosition(positionX, positionY) // 设置窗口位置为 (100, 100)
      // mainWindow.setSize(windowInfo.memoryWidth, windowInfo.memoryHeight) // 设置窗口大小为 1024x768
    }
    // 在这里执行你的逻辑
  })
  // 监听渲染进程发送的最大化/还原窗口消息
  ipcMain.on('toggle-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.setResizable(true)
      mainWindow.setSize(windowInfo.memoryWidth, windowInfo.memoryHeight) // 设置窗口大小为 1024x768
      mainWindow.setPosition(windowInfo.memoryX, windowInfo.memoryY) // 设置窗口位置为 (100, 100)
    } else {
      mainWindow.setResizable(false)
      const { x, y, width, height } = mainWindow.getBounds()
      windowInfo.memoryWidth = width
      windowInfo.memoryHeight = height
      windowInfo.memoryX = x
      windowInfo.memoryY = y
      mainWindow.maximize()
    }
    // 向渲染进程发送当前最大化状态
    mainWindow.webContents.send('maximize-status', mainWindow.isMaximized())
  })
  // 监听渲染进程发送的关闭窗口消息
  ipcMain.on('close-window', () => {
    mainWindow.close()
  })
})
